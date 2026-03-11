// Hooks
export { useAuth, useUser, useAccount, usePayload } from "./hooks";

// Provider
export { OutsetaProvider } from "./provider";

// Re-export actions from SDK for convenience
export { auth, user, account, profile, init } from "@outseta/sdk";

// Re-export types
export type {
  AuthStatus,
  AuthState,
  OutsetaUser,
  OutsetaAccount,
  OutsetaAddress,
  OutsetaPerson,
  OutsetaPlan,
  OutsetaSubscription,
  OutsetaJwtPayload,
} from "@outseta/sdk";
