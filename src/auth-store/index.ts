import { StoreApi } from "zustand/vanilla";
import { getOutseta, OutsetaLogger, Outseta } from "../outseta";
import { createStoreInstance, type AuthStore } from "./store";

// Re-export types for convenience
export type * from "./store";

const log = OutsetaLogger("auth.store");

// Create the Zustand store
export const initializeAuthStore = (outseta: Outseta | null) => {
  log("initializeAuthStore -|", window?.location?.hostname, { outseta });

  const store = createStoreInstance({ outseta, log });
  queueMicrotask(() => {
    store.getState().syncUser("init");
    if (outseta) {
      setupEventListeners({ outseta, store });
    }
  });
  return store;
};

// Lazy initialization - store is only created when first accessed
let _authStore: StoreApi<AuthStore> | null = null;

export const createAuthStore = (supressMissingOutsetaWarning: boolean) => {
  if (!_authStore) {
    const outseta = getOutseta();

    if (!supressMissingOutsetaWarning && !outseta) {
      console.error(
        "Outseta is not available, have you added the Outseta Script and Options to the head of the site?"
      );
    }

    _authStore = initializeAuthStore(outseta);
  }
  return _authStore;
};

// Initialize auth store event listeners
function setupEventListeners({
  outseta,
  store,
}: {
  outseta: NonNullable<Outseta>;
  store: StoreApi<AuthStore>;
}) {
  const logPrefix = "setupEventListeners -|";

  const { syncUser, reset }: AuthStore = store.getState();

  // Events that should sync user data
  const syncUserEvents = [
    "accessToken.set",
    "profile.update",
    "account.update",
    "subscription.update",
  ];

  syncUserEvents.forEach((event) => {
    log(logPrefix, event);
    outseta.on(event, () => {
      syncUser(event);
    });
  });

  const resetEvents = ["logout"];

  resetEvents.forEach((event) => {
    log(logPrefix, event);
    outseta.on(event, () => {
      reset(event);
    });
  });
}
