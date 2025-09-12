import { create } from "zustand";
import { getOutseta, outsetaLog } from "../outseta";
import { setNestedProperty, getNestedProperty, debounce } from "./utils";

export { getNestedProperty };

// Type for the original Outseta user object (nested structure)
export type OutsetaUser = any;

// Type for property names that can be accessed with dot notation
export type OutsetaUserPropertyName = string;

// Auth State Types
export type AuthStatus = "pending" | "authenticated" | "anonymous";

export interface AuthState {
  status: AuthStatus;
  user: OutsetaUser | null;
  payload: any;
}

export interface AuthActions {
  syncUser: (event?: string) => Promise<void>;
  resetUser: (event?: string) => void;
  updateUser: ((data: any) => Promise<any>) | null;
  updateUserProperty: (propertyName: string, newValue: any) => Promise<void>;
}

export interface AuthStore extends AuthState, AuthActions {}

const log = (...args: any[]) => {
  outsetaLog("auth.store")(...args, { storeData: { ...authStore.getState() } });
};

// Create the Zustand store
export const authStore = create<AuthStore>((set, get) => {
  // Internal tracking for user update sequence (not part of store state)
  let userUpdateSequence = 0;

  // Create debounced version of the API update function
  const debouncedPersistUser = debounce(async () => {
    const logPrefix = `debouncedPersistUser -|`;

    try {
      const { updateUser, user } = get();

      if (!user) {
        throw new Error("No current user data available");
      }

      if (!updateUser) {
        throw new Error("No updateUser function available");
      }

      // Capture the current sequence (set by optimistic update)
      const currentUserUpdateSequence = userUpdateSequence;

      // Update the user using the update method with the current user data
      const updatedUser = await updateUser(user);
      const currentPayload = get().payload;

      log(logPrefix, { updatedUser });
      // Only update store with server data if this is still the latest API call
      // This prevents stale data from overwriting newer optimistic updates
      if (updatedUser?.Uid !== currentPayload?.sub) {
        await get().resetUser("payload/user mismatch");
      } else if (currentUserUpdateSequence !== userUpdateSequence) {
        log(logPrefix, "Stale user data, skipping apply");
      } else {
        set({ user: updatedUser });
        log(logPrefix, "Applied user data");
      }
    } catch (error) {
      log(logPrefix, "Failed", error);
      // Rollback optimistic update by re-syncing
      await get().syncUser("rollback");
    }
  }, 500);

  return {
    // State
    status: "pending",
    payload: null,
    user: null,
    updateUser: null,

    /**
     * Clears the user data from the store
     * @param event - The event that triggered the clear (for logging purposes)
     */
    resetUser: async (event: string = "manual") => {
      const logPrefix = `resetUser ${event} -|`;
      try {
        userUpdateSequence = 0; // Reset sequence
        set({
          status: "pending",
          payload: null,
          user: null,
          updateUser: null,
        });
        await get().syncUser(event);
        log(logPrefix, "Reset user completed");
      } catch (error) {
        log(logPrefix, "Reset user failed", error);
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
          // If current payload sub is the same as the user, keep the user
          user: payload?.sub === get().user?.Uid ? get().user : null,
          updateUser:
            payload?.sub === get().user?.Uid ? get().updateUser : null,
        });

        log(logPrefix, "Applied payload");

        userUpdateSequence++;
        const currentUserUpdateSequence = userUpdateSequence;
        const fetchedUser = await outseta.getUser();
        const currentUser = get().user;
        const currentPayload = get().payload;

        log(logPrefix, "Fetched user data", { fetchedUser });

        if (fetchedUser?.Uid !== currentPayload?.sub) {
          await get().resetUser("payload/user mismatch");
        } else if (
          // If no current user, or the sequence is different, apply the fetched user
          !currentUser ||
          currentUserUpdateSequence !== userUpdateSequence
        ) {
          set({
            status: "authenticated",
            user: fetchedUser,
            updateUser: fetchedUser.update?.bind(fetchedUser),
          });
          log(logPrefix, "Applied user data", { fetchedUser });
        } else {
          log(logPrefix, "Stale user data, skipping apply");
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
     * Updates a specific user property both in the store and via Outseta API
     * Performs optimistic updates for better UX and rolls back on errors
     * Uses debouncing to prevent rapid API calls - only the last update will be processed
     * Supports dot notation for nested properties (e.g., "Account.FullName")
     *
     * @param propertyName - The name of the property to update (supports dot notation)
     * @param newValue - The new value for the property
     */
    updateUserProperty: async (
      propertyName: OutsetaUserPropertyName,
      newValue: any
    ) => {
      const logPrefix = `updateUserProperty ${propertyName} -|`;

      try {
        // Set optimistic update immediately for better UX
        const currentUser = get().user;
        if (!currentUser) {
          throw new Error("Authentication required");
        }

        // Increment sequence for this optimistic update
        userUpdateSequence++;

        const optimisticallyUpdatedUser = setNestedProperty(
          currentUser,
          propertyName,
          newValue
        );
        set({ user: optimisticallyUpdatedUser });
        log(logPrefix, "Applied optimistic update", {
          propertyName,
          newValue,
        });

        // Trigger the debounced API update
        debouncedPersistUser();
      } catch (error) {
        // Don't change status on error, keep current state
        if (error instanceof Error) {
          log(logPrefix, "Failed", error.message);
        } else {
          log(logPrefix, "Failed", error);
        }
      }
    },
  };
});

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
  const fetchUserEvents = [
    "accessToken.set",
    "profile.update",
    "account.update",
  ];

  fetchUserEvents.forEach((event) => {
    outseta.on(event, () => authStore.getState().syncUser(event));
  });

  outseta.on("logout", () => authStore.getState().resetUser("logout"));

  log("Event listeners setup complete");
};

// Initialize, assumes Outseta is available
if (typeof window !== "undefined") {
  authStore.getState().syncUser("init");
  setupEventListeners();
}
