import { create } from "zustand";
import { createAuthStore, AuthStore, AuthStatus } from "../../auth-store";

export function isFramerCanvas(): boolean {
  try {
    return window.location.host.includes("framercanvas.com");
  } catch (error) {
    // If it fails, assume we're not in Framer
    return false;
  }
}

/**
 * React store that shares the same state as the vanilla auth store
 * Provides React integration for Zustand store usage in components
 */
export default create<AuthStore>((set) => {
  const store = createAuthStore(isFramerCanvas());

  // Subscribe to vanilla store changes and sync React store
  store.subscribe((state) => {
    set(state);
  });

  // Initialize React store with current vanilla store state
  set(store.getState());

  // Return the same actions as vanilla store
  return store.getState();
});

// Re-export types for convenience
export type { AuthStatus };
