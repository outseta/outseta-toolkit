import { createStore } from "zustand/vanilla";
import { Outseta } from "../outseta";
import { debounce, computeUser } from "./utils";

// Type for the original Outseta user object (nested structure)
export type OutsetaUser = any;

// Type for property names that can be accessed with dot notation
export type OutsetaUserPropertyName = string;

// Auth State Types
export type AuthStatus = "pending" | "authenticated" | "anonymous";

export interface AuthState {
  status: AuthStatus;
  user: OutsetaUser | null; // Computed: serverUser + pendingUpdates
  payload: any;
}

export interface AuthActions {
  reset: (event?: string) => void;
  syncUser: (event?: string) => Promise<void>;
  updateUser: (updates: Record<string, any>) => void;
  updateUserProperty: (propertyName: string, newValue: any) => void;
}

export interface AuthStore extends AuthState, AuthActions {}

const initialState: AuthState = {
  status: "pending",
  user: null,
  payload: null,
};

export const createStoreInstance = ({
  outseta,
  log,
}: {
  outseta: Outseta | null;
  log: (...args: any[]) => void;
}) =>
  createStore<AuthStore>()((set, get) => {
    let serverUser: OutsetaUser = undefined;
    let requestCounter = 1;
    let pendingUpdates: Array<{
      updates: Record<string, any>;
      timestamp: number;
      id: string;
      requestId?: number;
    }> = [];
    let persistUser:
      | ((data: OutsetaUser) => Promise<OutsetaUser | null>)
      | null = null;

    // Log Helper - fire-and-forget with store context
    const storeLog = (...args: any[]) => {
      log(...args, {
        storeData: { ...get() },
        externalData: {
          serverUser,
          pendingUpdates,
        },
      });
    };

    // Create debounced persistence function
    const debouncedPersistUpdates = debounce(async () => {
      const logPrefix = `debouncedPersistUpdates -|`;

      // Only process updates that aren't currently being processed
      const updatesToProcess = pendingUpdates.filter(
        (update) => !update.requestId
      );

      if (updatesToProcess.length === 0 || !persistUser) {
        storeLog(
          logPrefix,
          "No unprocessed updates available or persistUser function available"
        );
        return;
      }

      // Generate unique request ID to track order and prevent race conditions
      const requestId = ++requestCounter;

      updatesToProcess.forEach((update) => {
        update.requestId = requestId;
      });

      const combinedUpdates = updatesToProcess.reduce(
        (acc, update) => ({
          ...acc,
          ...update.updates,
        }),
        {}
      );

      let updatedServerUser: OutsetaUser = undefined;

      try {
        storeLog(logPrefix, "Processing updates", {
          updatesToProcess,
          combinedUpdates,
          requestId,
        });
        updatedServerUser = await persistUser(combinedUpdates);
      } catch (error) {
        storeLog(logPrefix, "Failed to persist updates", error);
      } finally {
        // Remove the processed updates completely
        pendingUpdates = pendingUpdates.filter(
          (update) => update.requestId !== requestId
        );

        // Only update serverUser if we have a result and this is the most recent request
        if (requestId === requestCounter) {
          // If successful the updatedServerUser has a value,
          // otherwise use the existing serverUser
          serverUser = updatedServerUser || serverUser;
          // Update the store with the new computed user
          const computedUser = computeUser(serverUser, pendingUpdates);
          set({ user: computedUser });

          storeLog(logPrefix, "Latest request - updated user", {
            updatedServerUser,
            requestId,
          });
        } else if (updatedServerUser) {
          storeLog(
            logPrefix,
            "Discarded stale response - newer request exists",
            {
              requestId,
              currentRequest: requestCounter,
            }
          );
        }

        if (!pendingUpdates.length) {
          // Reset request counter when no remaining updates
          requestCounter = 0;
          storeLog("No remaining updates, reset request counter");
        }
      }
    }, 500);

    return {
      // State
      ...initialState,

      /**
       * Clears the user data from the store
       * @param event - The event that triggered the clear (for logging purposes)
       */
      reset: async (event: string = "manual") => {
        const logPrefix = `resetStore ${event} -|`;
        try {
          // Clear non reactive state
          serverUser = null;
          pendingUpdates.length = 0;
          requestCounter = 0;
          persistUser = null;

          // Reset store state
          set(initialState);
          storeLog(logPrefix, "Reset store completed");
        } catch (error) {
          storeLog(logPrefix, "Reset store failed", error);
        }
      },

      /**
       * Synchronizes user data from Outseta API with the local store
       * This function handles authentication state management and user data fetching
       *
       * @param event - The event that triggered the sync (for logging purposes)
       */
      syncUser: async (event: string = "manual") => {
        const logPrefix = `syncUser ${event} -|`;

        if (!outseta) {
          set({ status: "anonymous" });
          return;
        }

        try {
          const payload = outseta.getJwtPayload() || null;

          set({
            status: payload ? "authenticated" : "anonymous",
            payload: payload || null,
          });

          storeLog(logPrefix, get().status);

          if (!outseta) {
            return;
          }

          // getUser resolves as soon as there is a user fetched
          const fetchedUser = await outseta.getUser();
          const currentPayload = get().payload;

          storeLog(logPrefix, "Fetched user data", { fetchedUser });

          if (fetchedUser?.Uid !== currentPayload?.sub) {
            await get().reset("payload/user mismatch");
          } else {
            serverUser = fetchedUser;
            persistUser = fetchedUser?.update?.bind(fetchedUser) || null;
            const computedUser = computeUser(serverUser, pendingUpdates);

            set({
              status: "authenticated",
              user: computedUser,
            });

            storeLog(logPrefix, "Applied user data", { fetchedUser });
          }
        } catch (error) {
          // Don't change status on error, keep current state
          if (error instanceof Error) {
            storeLog(logPrefix, "Error - keeping current state", error.message);
          } else {
            storeLog(logPrefix, "Error - keeping current state", error);
          }
        }
      },

      /**
       * Updates user properties with optimistic updates and persistence
       *
       * @param updates - Object containing property updates (supports dot notation)
       */
      updateUser: (updates: Record<string, any>) => {
        const logPrefix = `updateUser -|`;

        try {
          const currentUser = get().user;
          if (!currentUser) {
            throw new Error("Authentication required");
          }

          // Create a new pending update
          const pendingUpdate = {
            updates,
            timestamp: Date.now(),
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          };

          // Add to pending updates queue
          pendingUpdates.push(pendingUpdate);

          // Compute optimistic user immediately
          const optimisticUser = computeUser(serverUser, pendingUpdates);

          // Update store with computed user
          set({ user: optimisticUser });

          // Trigger debounced persistence
          debouncedPersistUpdates();

          storeLog(
            logPrefix,
            "Added pending update and computed optimistic user",
            {
              updates,
              pendingUpdate,
              optimisticUser,
            }
          );
        } catch (error) {
          if (error instanceof Error) {
            storeLog(logPrefix, "Failed", error.message);
          } else {
            storeLog(logPrefix, "Failed", error);
          }
        }
      },

      /**
       * Updates a specific user property (convenience wrapper for updateUser)
       * Supports dot notation for nested properties (e.g., "Account.FullName")
       *
       * @param propertyName - The name of the property to update (supports dot notation)
       * @param newValue - The new value for the property
       */
      updateUserProperty: (
        propertyName: OutsetaUserPropertyName,
        newValue: any
      ) => {
        return get().updateUser({ [propertyName]: newValue });
      },
    };
  });
