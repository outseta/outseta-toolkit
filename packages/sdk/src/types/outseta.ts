import type { OutsetaJwtPayload } from "./payload";
import type { OutsetaUser } from "./user";
import type { OutsetaStores } from "../stores";

export type Outseta = typeof window.Outseta;

declare global {
  interface Window {
    outseta_onload: () => void;
    Outseta?: {
      getUser: () => Promise<OutsetaUser | null>;
      getJwtPayload: () => OutsetaJwtPayload | null;
      on: (event: string, callback: () => void) => void;
      auth: {
        open: (options?: Record<string, any>) => void;
      };
      profile: {
        open: (options?: Record<string, any>) => void;
      };
      logout: () => void;
      debug: (...args: any[]) => void;
    };
    [key: `__outseta_v${number}__`]: {
      stores: OutsetaStores;
      initialized: boolean;
    };
  }
}

export function getOutseta(): typeof window.Outseta | null {
  if (typeof window === "undefined" || !window.Outseta) {
    return null;
  }
  return window.Outseta;
}
