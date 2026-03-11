import { debounce } from "lodash-es";
import type { OutsetaUser } from "../types";
import { $serverUser, $pendingUpdates, $user, type PendingUpdate } from "../stores";

import { OutsetaLogger } from "../logger";

const log = OutsetaLogger("actions.user");

let requestCounter = 0;
let persistUser:
  | ((data: Partial<OutsetaUser>) => Promise<OutsetaUser | null>)
  | null = null;

export function setPersistUser(
  fn: ((data: Partial<OutsetaUser>) => Promise<OutsetaUser | null>) | null
) {
  persistUser = fn;
}

export function resetUserState() {
  requestCounter = 0;
  persistUser = null;
  $serverUser.set(null);
  $pendingUpdates.set([]);
}

const debouncedPersistUpdates = debounce(async () => {
  const logPrefix = "debouncedPersistUpdates -|";
  const pending = $pendingUpdates.get();

  const updatesToProcess = pending.filter((update) => !update.requestId);

  if (updatesToProcess.length === 0 || !persistUser) {
    log(logPrefix, "No unprocessed updates or no persistUser function");
    return;
  }

  const requestId = ++requestCounter;

  const updatedPending = pending.map((update) => {
    if (updatesToProcess.includes(update)) {
      return { ...update, requestId };
    }
    return update;
  });
  $pendingUpdates.set(updatedPending);

  const combinedUpdates: Partial<OutsetaUser> = updatesToProcess.reduce(
    (acc, update) => ({ ...acc, ...update.updates }),
    {}
  );

  let updatedServerUser: OutsetaUser | null = null;

  try {
    log(logPrefix, "Processing updates", { updatesToProcess, combinedUpdates, requestId });
    updatedServerUser = await persistUser(combinedUpdates);
  } catch (error) {
    log(logPrefix, "Failed to persist updates", error);
  } finally {
    // Remove processed updates
    const currentPending = $pendingUpdates.get();
    const remaining = currentPending.filter(
      (update) => update.requestId !== requestId
    );
    $pendingUpdates.set(remaining);

    if (requestId === requestCounter) {
      $serverUser.set(updatedServerUser || $serverUser.get());
      log(logPrefix, "Latest request - updated user", { updatedServerUser, requestId });
    } else if (updatedServerUser) {
      log(logPrefix, "Discarded stale response", { requestId, currentRequest: requestCounter });
    }

    if (remaining.length === 0) {
      requestCounter = 0;
    }
  }
}, 500);

export const user = {
  update<T extends OutsetaUser = OutsetaUser>(updates: Partial<T>) {
    const logPrefix = "user.update -|";

    try {
      const currentUser = $user.get();
      if (!currentUser) {
        throw new Error("Authentication required");
      }

      const pendingUpdate: PendingUpdate = {
        updates: updates as Record<string, any>,
        timestamp: Date.now(),
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      };

      const currentPending = $pendingUpdates.get();
      $pendingUpdates.set([...currentPending, pendingUpdate]);

      debouncedPersistUpdates();

      log(logPrefix, "Added pending update", { updates, pendingUpdate });
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Failed", error.message);
      } else {
        log(logPrefix, "Failed", error);
      }
    }
  },

  updateProperty(propertyName: string, newValue: any) {
    return user.update({ [propertyName]: newValue } as Partial<OutsetaUser>);
  },
};

// Internal: set server user directly (used by init/sync)
export function setServerUser(u: OutsetaUser | null) {
  $serverUser.set(u);
}

