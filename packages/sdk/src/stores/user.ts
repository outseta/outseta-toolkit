import { atom, computed } from "nanostores";
import type { OutsetaUser, OutsetaAccount, OutsetaJwtPayload } from "../types";
import { computeUser } from "../utils";

export interface PendingUpdate {
  updates: Record<string, any>;
  timestamp: number;
  id: string;
  requestId?: number;
}

export const createUserStores = () => {
  const $serverUser = atom<OutsetaUser | null>(null);
  const $pendingUpdates = atom<PendingUpdate[]>([]);
  const $payload = atom<OutsetaJwtPayload | null>(null);

  const $user = computed(
    [$serverUser, $pendingUpdates],
    (serverUser, pendingUpdates) => computeUser(serverUser, pendingUpdates)
  );

  const $account = computed($user, (user) => {
    return (user?.Account as OutsetaAccount) ?? null;
  });

  return { $serverUser, $pendingUpdates, $payload, $user, $account };
};
