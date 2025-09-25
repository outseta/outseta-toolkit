import type { OutsetaJwtPayload } from "./payload";
import type { OutsetaUser } from "./user";

export type { OutsetaJwtPayload };
export type {
  OutsetaUser,
  OutsetaAccount,
  OutsetaAddress,
  OutsetaPerson,
  OutsetaPlan,
  OutsetaSubscription,
} from "./user";

// Declare module augmentation for better IDE support
declare global {
  interface Window {
    outseta_onload: () => void;
    Outseta?: {
      getUser: () => Promise<OutsetaUser | null>;
      getJwtPayload: () => OutsetaJwtPayload | null;
      on: (event: string, callback: () => void) => void;
      debug: (...args: any[]) => void;
    };
  }
}

export type Outseta = typeof window.Outseta;

export function getOutseta(): typeof window.Outseta | null {
  if (typeof window === "undefined" || !window.Outseta) {
    return null;
  }

  return window.Outseta;
}

// Cached debug scope value - updated only on reload
let _cachedDebugScope: string | null = null;

const initializeDebugScope = () => {
  if (_cachedDebugScope === null) {
    _cachedDebugScope = window?.localStorage?.getItem("outseta.debug") || "";
  }
  return _cachedDebugScope;
};

/**
 * Checks if logging should be enabled for the given scope
 * @param scope - The logging scope to check
 * @returns True if logging should be enabled for this scope
 */
function shouldLog(scope: string): boolean {
  const debugScope = initializeDebugScope();

  if (debugScope === null || debugScope === "") {
    return false;
  }

  // If debug scope is 'true', enable all logging
  if (debugScope === "true") {
    return true;
  }

  // Split comma-separated scopes and check for matches
  const scopes = debugScope.split(",").map((s) => s.trim());

  // Check for starts with match
  return scopes.some((debugScopeItem) => {
    return scope.startsWith(debugScopeItem);
  });
}

/**
 * Debug logging helper with localStorage scope filtering
 * Provides consistent module identification across all logging
 *
 * Set debug scope in localStorage: window.localStorage['outseta.debug'] = 'scope1,scope2' || 'true'
 * Supports comma-separated list of scopes or 'true' for all scopes
 * Cache is initialized once per session - reload required to pick up new values
 *
 * @param scope - Debugging scope for identification
 * @returns A logging function with module ID that respects debug scope settings
 */
export function OutsetaLogger(scope: string) {
  const fullScope = `toolkit.${scope}`;
  return (...args: any[]): void => {
    if (shouldLog(fullScope)) {
      console.log(
        `[${window?.location?.origin} | outseta.${fullScope}]`,
        ...args
      );
    }
  };
}
