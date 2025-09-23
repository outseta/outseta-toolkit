import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";

import useAuthStore, { isFramerCanvas } from "./useAuthStore";

const log = OutsetaLogger("framer.overrides.embed");

export function popupEmbed(
  Component: React.ComponentType<any>,
  embed: "register" | "login" | "profile"
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `triggerPopup ${embed} -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - showing component");
      return <Component ref={ref} {...props} />;
    }

    try {
      const status = useAuthStore((state) => state.status);

      log(logPrefix, { status });

      // Set appropriate data attributes based on embed type
      const dataAttributes: Record<string, string> = {
        "data-mode": "popup",
      };

      switch (embed) {
        case "register":
          if (status !== "anonymous") {
            throw new Error("Not anonymous");
          }
          dataAttributes["data-o-auth"] = "1";
          dataAttributes["data-widget-mode"] = "register";
          break;
        case "login":
          if (status !== "anonymous") {
            throw new Error("Not anonymous");
          }
          dataAttributes["data-o-auth"] = "1";
          dataAttributes["data-widget-mode"] = "login";
          break;
        case "profile":
          if (status !== "authenticated") {
            throw new Error("Not authenticated");
          }
          dataAttributes["data-o-profile"] = "1";
          break;
        default:
          throw new Error("Invalid embed type");
      }

      log(logPrefix, "Setting Outseta data attributes", { dataAttributes });
      return <Component ref={ref} {...props} {...dataAttributes} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component", error.message);
      } else {
        log(logPrefix, "Hiding component", error);
      }
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
