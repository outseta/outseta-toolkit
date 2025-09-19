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

/**
 * Debug logging helper that uses Outseta's debug functionality
 * Provides consistent module identification across all logging
 *
 * @param namespace - Module namespace for identification
 * @returns A logging function with module ID
 */
export function OutsetaLogger(namespace: string) {
  return (...args: any[]): void => {
    console.log(`[outseta.toolkit.${namespace}]`, ...args);
  };
}
