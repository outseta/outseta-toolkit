import { getOutseta } from "./types/outseta";
import { $auth, $payload } from "./stores";
import {
  setServerUser,
  setPersistUser,
  resetUserState,
} from "./actions/user";
import { OutsetaLogger } from "./logger";

const log = OutsetaLogger("init");

declare const __OUTSETA_SDK_MAJOR__: number;

const MAJOR =
  typeof __OUTSETA_SDK_MAJOR__ !== "undefined" ? __OUTSETA_SDK_MAJOR__ : 0;

function getWindowKey(): `__outseta_v${number}__` {
  return `__outseta_v${MAJOR}__`;
}

function isInitialized(): boolean {
  if (typeof window === "undefined") return false;
  const key = getWindowKey();
  return window[key]?.initialized === true;
}

function markInitialized() {
  if (typeof window === "undefined") return;
  const key = getWindowKey();
  if (window[key]) {
    window[key].initialized = true;
  }
}

async function syncUser(event: string = "manual") {
  const logPrefix = `syncUser ${event} -|`;
  const outseta = getOutseta();

  if (!outseta) {
    $auth.set({ status: "anonymous" });
    return;
  }

  try {
    const payload = outseta.getJwtPayload() || null;

    $auth.set({ status: payload ? "authenticated" : "anonymous" });
    $payload.set(payload);

    log(logPrefix, $auth.get().status);

    if (!payload) return;

    const fetchedUser = await outseta.getUser();
    const currentPayload = $payload.get();

    log(logPrefix, "Fetched user data", { fetchedUser });

    if (fetchedUser?.Uid !== currentPayload?.sub) {
      reset("payload/user mismatch");
    } else {
      setServerUser(fetchedUser);
      setPersistUser(fetchedUser?.update?.bind(fetchedUser) || null);

      $auth.set({ status: "authenticated" });

      log(logPrefix, "Applied user data", { fetchedUser });
    }
  } catch (error) {
    if (error instanceof Error) {
      log(logPrefix, "Error - keeping current state", error.message);
    } else {
      log(logPrefix, "Error - keeping current state", error);
    }
  }
}

function reset(event: string = "manual") {
  const logPrefix = `reset ${event} -|`;
  try {
    resetUserState();
    $auth.set({ status: "pending" });
    $payload.set(null);
    log(logPrefix, "Reset completed");
  } catch (error) {
    log(logPrefix, "Reset failed", error);
  }
}

function setupEventListeners(outseta: NonNullable<ReturnType<typeof getOutseta>>) {
  const logPrefix = "setupEventListeners -|";

  const syncUserEvents = [
    "accessToken.set",
    "profile.update",
    "account.update",
    "subscription.update",
  ];

  syncUserEvents.forEach((event) => {
    log(logPrefix, event);
    outseta.on(event, () => {
      syncUser(event);
    });
  });

  const resetEvents = ["logout"];

  resetEvents.forEach((event) => {
    log(logPrefix, event);
    outseta.on(event, () => {
      reset(event);
    });
  });
}

const POLL_INTERVAL = 100;
const POLL_TIMEOUT = 10000;

function pollForOutseta(): Promise<NonNullable<ReturnType<typeof getOutseta>>> {
  return new Promise((resolve, reject) => {
    const outseta = getOutseta();
    if (outseta) {
      resolve(outseta);
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      const outseta = getOutseta();
      if (outseta) {
        clearInterval(interval);
        resolve(outseta);
      } else if (Date.now() - start > POLL_TIMEOUT) {
        clearInterval(interval);
        reject(new Error("Outseta script did not load within timeout"));
      }
    }, POLL_INTERVAL);
  });
}

export async function init(): Promise<void> {
  if (isInitialized()) {
    log("init -| Already initialized, skipping");
    return;
  }

  log("init -| Initializing...");

  const outseta = getOutseta();

  if (outseta) {
    markInitialized();
    await syncUser("init");
    setupEventListeners(outseta);
    return;
  }

  // Outseta script loads async — poll for it
  log("init -| Outseta not yet available, polling...");

  try {
    const outseta = await pollForOutseta();
    markInitialized();
    await syncUser("init");
    setupEventListeners(outseta);
  } catch (error) {
    log("init -| Failed to detect Outseta", error);
    $auth.set({ status: "anonymous" });
    markInitialized();
  }
}
