import type { OutsetaAccount } from "../types";
import { user } from "./user";
import { OutsetaLogger } from "../logger";

const log = OutsetaLogger("actions.account");

export const account = {
  update<T extends OutsetaAccount = OutsetaAccount>(updates: Partial<T>) {
    const logPrefix = "account.update -|";

    // Translate account fields to Account.* dot notation for the Outseta API
    const translatedUpdates: Record<string, any> = {};
    for (const [key, value] of Object.entries(updates)) {
      translatedUpdates[`Account.${key}`] = value;
    }

    log(logPrefix, "Translating to Account.* prefix", { updates, translatedUpdates });

    user.update(translatedUpdates);
  },
};
