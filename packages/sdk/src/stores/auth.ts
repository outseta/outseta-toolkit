import { atom } from "nanostores";

export type AuthStatus = "pending" | "authenticated" | "anonymous";

export interface AuthState {
  status: AuthStatus;
}

export const createAuthAtom = () => atom<AuthState>({ status: "pending" });
