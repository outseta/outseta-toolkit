import { createAuthAtom } from "./auth";
import { createUserStores } from "./user";

export type { AuthStatus, AuthState } from "./auth";
export type { PendingUpdate } from "./user";

export interface OutsetaStores {
  $auth: ReturnType<typeof createAuthAtom>;
  $serverUser: ReturnType<typeof createUserStores>["$serverUser"];
  $pendingUpdates: ReturnType<typeof createUserStores>["$pendingUpdates"];
  $payload: ReturnType<typeof createUserStores>["$payload"];
  $user: ReturnType<typeof createUserStores>["$user"];
  $account: ReturnType<typeof createUserStores>["$account"];
}

function createStores(): OutsetaStores {
  const $auth = createAuthAtom();
  const { $serverUser, $pendingUpdates, $payload, $user, $account } =
    createUserStores();
  return { $auth, $serverUser, $pendingUpdates, $payload, $user, $account };
}

declare const __OUTSETA_SDK_MAJOR__: number;

const MAJOR =
  typeof __OUTSETA_SDK_MAJOR__ !== "undefined" ? __OUTSETA_SDK_MAJOR__ : 0;

export function getOrCreateStores(): OutsetaStores {
  if (typeof window === "undefined") return createStores();

  const key = `__outseta_v${MAJOR}__` as `__outseta_v${number}__`;

  if (window[key]?.stores) return window[key].stores;

  const stores = createStores();
  window[key] = { stores, initialized: false };
  return stores;
}

// Singleton stores instance
const stores = getOrCreateStores();

export const { $auth, $serverUser, $pendingUpdates, $payload, $user, $account } =
  stores;
