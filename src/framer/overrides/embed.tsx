import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";

import useAuthStore, { isFramerCanvas } from "./useAuthStore";

const log = OutsetaLogger("framer.overrides.embed");

export function popupEmbed(
  Component: React.ComponentType<any>,
  embed: "register" | "login" | "profile"
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `popupEmbed ${embed} -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const currentStatus = useAuthStore((state) => state.status);
      const anonymousEmbeds = ["register", "login"];
      const authenticatedEmbeds = ["profile"];

      if (anonymousEmbeds.includes(embed)) {
        if (currentStatus === "pending") {
          log(logPrefix, `Pending - show anonymous component`);
          return <Component ref={ref} {...props} />;
        }
      }

      if (anonymousEmbeds.includes(embed) && currentStatus !== "anonymous") {
        log(logPrefix, `Not anonymous - remove component`);
        return null;
      }

      if (
        authenticatedEmbeds.includes(embed) &&
        currentStatus !== "authenticated"
      ) {
        log(logPrefix, `Not authenticated - remove component`);
        return null;
      }

      // Set appropriate data attributes based on embed type
      const dataAttributes: Record<string, string> = {
        "data-mode": "popup",
      };

      switch (embed) {
        case "register":
          dataAttributes["data-o-auth"] = "1";
          dataAttributes["data-widget-mode"] = "register";
          break;
        case "login":
          dataAttributes["data-o-auth"] = "1";
          dataAttributes["data-widget-mode"] = "login";
          break;
        case "profile":
          dataAttributes["data-o-profile"] = "1";
          break;
        default:
          log(logPrefix, `Invalid (${embed}) - remove component`);
          return null;
      }

      log(logPrefix, `Data attributes - show component`, { dataAttributes });
      return <Component ref={ref} {...props} {...dataAttributes} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

export function popupRegisterEmbed(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return popupEmbed(Component, "register");
}

export function popupLoginEmbed(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return popupEmbed(Component, "login");
}

export function popupProfileEmbed(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return popupEmbed(Component, "profile");
}
