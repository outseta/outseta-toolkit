import { getOutseta } from "../types/outseta";
import { OutsetaLogger } from "../logger";

const log = OutsetaLogger("actions.auth");

export const auth = {
  login(options?: Record<string, any>) {
    const outseta = getOutseta();
    if (!outseta) {
      log("login -| Outseta not available");
      return;
    }
    outseta.auth.open({ widgetMode: "login", ...options });
  },

  signup(options?: Record<string, any>) {
    const outseta = getOutseta();
    if (!outseta) {
      log("signup -| Outseta not available");
      return;
    }
    outseta.auth.open({ widgetMode: "register", ...options });
  },

  logout() {
    const outseta = getOutseta();
    if (!outseta) {
      log("logout -| Outseta not available");
      return;
    }
    outseta.logout();
  },
};
