import { create, type StoreApi } from "zustand";
import { getOutseta, outsetaLog } from "../outseta";
import { debounce, computeUser } from "./utils";

// Type for the original Outseta user object (nested structure)
export type OutsetaUser = any;

// Type for property names that can be accessed with dot notation
export type OutsetaUserPropertyName = string;

// Auth State Types
export type AuthStatus = "pending" | "authenticated" | "anonymous";

export interface PendingUpdate {
  updates: Record<string, any>; // The exact object passed to updateUser
  timestamp: number;
  id: string; // For tracking individual updates
}

export interface AuthState {
  status: AuthStatus;
  serverUser: OutsetaUser | null; // Source of truth from API
  pendingUpdates: PendingUpdate[]; // Queue of optimistic updates
  user: OutsetaUser | null; // Computed: serverUser + pendingUpdates
  payload: any;
  persistUser: ((data: any) => Promise<any>) | null; // Function to persist user updates
}

export interface AuthActions {
  reset: (event?: string) => void;
  syncUser: (event?: string) => Promise<void>;
  updateUser: (updates: Record<string, any>) => void;
  updateUserProperty: (propertyName: string, newValue: any) => void;
}

export interface AuthStore extends AuthState, AuthActions {}

// Initial state for the auth store
const initialState: AuthState = {
  status: "pending",
  serverUser: null,
  pendingUpdates: [],
  user: null,
  payload: null,
  persistUser: null,
};

// Log Helper
const log = (...args: any[]) => {
  outsetaLog("auth.store")(...args, { storeData: { ...authStore.getState() } });
};

// Create the Zustand store
export const authStore = create<AuthStore>()((set, get) => {
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
        set(initialState);
        await get().syncUser(event);
        log(logPrefix, "Reset store completed");
      } catch (error) {
        log(logPrefix, "Reset store failed", error);
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
      try {
        const outseta = getOutseta();

        if (!outseta) {
          throw new Error("Outseta not available");
        }

        const payload = outseta.getJwtPayload();

        set({
          status: payload ? "authenticated" : "anonymous",
          payload: payload || null,
          // If current payload sub is not the same as the current serverUser,
          // nullify the serverUser
          serverUser:
            payload?.sub === get().serverUser?.Uid ? get().serverUser : null,
          // and persistUser
          persistUser:
            payload?.sub === get().serverUser?.Uid ? get().persistUser : null,
          // no need to set user as it is computed from serverUser and pendingUpdates
        });

        log(logPrefix, "Applied payload");

        if (payload) {
          // If there is a payload, fetch the user
          const fetchedUser = await outseta.getUser();

          log(logPrefix, "Fetched user data", { fetchedUser });

          if (fetchedUser?.Uid !== payload?.sub) {
            await get().reset("payload/user mismatch");
          } else {
            set({
              status: "authenticated",
              serverUser: fetchedUser,
              persistUser: fetchedUser.update?.bind(fetchedUser),
            });
            log(logPrefix, "Applied user data", { fetchedUser });
          }
        }
      } catch (error) {
        // Don't change status on error, keep current state
        if (error instanceof Error) {
          log(logPrefix, "Error keeping current state", error.message);
        } else {
          log(logPrefix, "Error keeping current state", error);
        }
      }
    },

    /**
     * Updates user properties by adding them to the pending updates queue
     * The middleware will automatically compute the user and persist changes
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

        // Create a new pending update,
        // a store subscriber will automatically compute the user and persist updates
        // and make sure the changes are persisted
        const pendingUpdate: PendingUpdate = {
          updates,
          timestamp: Date.now(),
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        };

        // Add to pending updates queue
        const { pendingUpdates } = get();
        set({
          pendingUpdates: [...pendingUpdates, pendingUpdate],
        });

        log(logPrefix, "Added pending update", { updates, pendingUpdate });
      } catch (error) {
        if (error instanceof Error) {
          log(logPrefix, "Failed", error.message);
        } else {
          log(logPrefix, "Failed", error);
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

// Subscribe to state changes to automatically compute user and persist updates
authStore.subscribe((state, prevState) => {
  // Compute user when serverUser or pendingUpdates change
  if (
    state.serverUser !== prevState.serverUser ||
    state.pendingUpdates !== prevState.pendingUpdates
  ) {
    log("serverUser or pendingUpdates changed, computing user");
    const computedUser = computeUser(state.serverUser, state.pendingUpdates);
    authStore.setState({
      user: computedUser,
    });
  }

  // Trigger persistence when pendingUpdates change (and we have updates to persist)
  if (
    state.pendingUpdates !== prevState.pendingUpdates &&
    state.pendingUpdates.length > 0 &&
    state.persistUser
  ) {
    log("pendingUpdates changed, triggering persistence");
    debouncedPersistUpdates(authStore);
  }
});

// Debounced function for API persistence
const debouncedPersistUpdates = debounce(
  async (authStore: StoreApi<AuthStore>) => {
    const logPrefix = `debouncedPersistUpdates -|`;

    const { pendingUpdates, persistUser } = authStore.getState();
    if (pendingUpdates.length === 0 || !persistUser) {
      log(logPrefix, "No pending updates or persistUser function available");
      return;
    }

    // Capture the current pending updates to process
    const updates = [...pendingUpdates];
    const combinedUpdates = updates.reduce(
      (acc, update) => ({
        ...acc,
        ...update.updates,
      }),
      {}
    );

    try {
      log(logPrefix, "Processing updates", { updates, combinedUpdates });
      const updatedServerUser = await persistUser(combinedUpdates);

      // Success: remove only the processed updates
      const { pendingUpdates: currentPendingUpdates } = authStore.getState();
      const remainingUpdates = currentPendingUpdates.filter(
        (update: PendingUpdate) =>
          !updates.some(
            (processed: PendingUpdate) => processed.id === update.id
          )
      );

      authStore.setState({
        pendingUpdates: remainingUpdates,
        serverUser: updatedServerUser,
      });

      log(logPrefix, "Successfully persisted updates", { updatedServerUser });
    } catch (error) {
      // Failure: remove only the failed processed updates
      const { pendingUpdates: currentPendingUpdates } = authStore.getState();
      const remainingUpdates = currentPendingUpdates.filter(
        (update: PendingUpdate) =>
          !updates.some(
            (processed: PendingUpdate) => processed.id === update.id
          )
      );

      authStore.setState({
        pendingUpdates: remainingUpdates,
      });

      log(logPrefix, "Failed to persist updates", error);
    }
  },
  500
);

// authStore.subscribe((state) => {
//   log("Auth store state changed", state);
// });

/**
 * Sets up event listeners for Outseta events that should trigger user data sync
 * Listens for authentication changes, profile updates, and logout events
 */
const setupEventListeners = () => {
  const outseta = getOutseta();
  if (!outseta) return;

  // Events that should sync user data
  const syncUserEvents = [
    "accessToken.set",
    "profile.update",
    "account.update",
    "subscription.update",
  ];

  syncUserEvents.forEach((event) => {
    outseta.on(event, () => authStore.getState().syncUser(event));
  });

  outseta.on("logout", () => authStore.getState().reset("logout"));

  log("Event listeners setup complete");
};

// Initialize, assumes Outseta is available
if (typeof window !== "undefined") {
  authStore.getState().syncUser("init");
  setupEventListeners();
}
