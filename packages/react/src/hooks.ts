import { useStore } from "@nanostores/react";
import {
  $auth,
  $user,
  $account,
  $payload,
  type AuthState,
  type OutsetaUser,
  type OutsetaAccount,
  type OutsetaJwtPayload,
} from "@outseta/sdk";

export function useAuth(): AuthState {
  return useStore($auth);
}

export function useUser<T extends OutsetaUser = OutsetaUser>(): T | null {
  return useStore($user) as T | null;
}

export function useAccount<
  T extends OutsetaAccount = OutsetaAccount,
>(): T | null {
  return useStore($account) as T | null;
}

export function usePayload(): OutsetaJwtPayload | null {
  return useStore($payload);
}
