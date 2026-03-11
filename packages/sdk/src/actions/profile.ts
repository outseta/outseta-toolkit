import { getOutseta } from "../types/outseta";
import { OutsetaLogger } from "../logger";

const log = OutsetaLogger("actions.profile");

export const profile = {
  open(options?: Record<string, any>) {
    const outseta = getOutseta();
    if (!outseta) {
      log("open -| Outseta not available");
      return;
    }
    outseta.profile.open(options);
  },
};
