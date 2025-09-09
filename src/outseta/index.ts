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
    Outseta?: {
      getUser: () => Promise<OutsetaUser>;
      getJwtPayload: () => OutsetaJwtPayload;
      on: (event: string, callback: () => void) => void;
      debug: (namespace: string, ...args: any[]) => void;
    };
  }
}

/**
 * Gets the Outseta instance from the global window object
 * Provides helpful logging if Outseta is not available
 *
 * @returns The Outseta instance if available, null otherwise
 */
export function getOutseta(): typeof window.Outseta | null {
  if (typeof window !== "undefined" && window.Outseta) {
    return window.Outseta;
  } else if (typeof window !== "undefined") {
    console.error(
      "Outseta is missing, have you added the Outseta Script and Options to the head of the site?"
    );
    return null;
  }
}

/**
 * Debug logging helper that uses Outseta's debug functionality
 * Only logs when Outseta debug is available and enabled
 *
 * @param args - Arguments to log
 */
export function outsetaLog(namespace: string) {
  return (...args: any[]): void => {
    const outseta = getOutseta();
    if (outseta?.debug) {
      outseta.debug(`outseta.toolkit.${namespace}`, ...args);
    }
  };
}
