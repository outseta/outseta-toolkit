import React, { forwardRef } from "react";
import { camelCase } from "lodash";
import { OutsetaLogger } from "../../outseta";

import useAuthStore, { type AuthStatus } from "./useAuthStore";

const log = OutsetaLogger("framer.overrides.auth");

function showWhenAuthStatus(
  Component: React.ComponentType<any>,
  validStatus: AuthStatus
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenAuthStatus ${validStatus} -|`;

    try {
      const currentStatus = useAuthStore((state) => state.status);

      log(logPrefix, { status: currentStatus, validStatus });

      if (currentStatus !== validStatus) {
        throw new Error(`Current auth status is not ${validStatus}`);
      }

      log(logPrefix, "Status match, showing component");
      return <Component ref={ref} {...props} />;
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

export function showWhenAnonymous(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showWhenAuthStatus(Component, "anonymous");
}

export function showWhenAuthenticated(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showWhenAuthStatus(Component, "authenticated");
}

export function showWhenPending(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showWhenAuthStatus(Component, "pending");
}

export function authStatusVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `authStatusVariant -|`;
    try {
      const status = useAuthStore((state) => state.status);
      const camelCaseStatus = camelCase(status);
      log(logPrefix, "Selecting variant", camelCaseStatus);
      return <Component ref={ref} {...props} variant={camelCaseStatus} />;
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

export function popupEmbed(
  Component: React.ComponentType<any>,
  embed: "register" | "login" | "profile"
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `triggerPopup ${embed} -|`;

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

function action(
  Component: React.ComponentType<any>,
  action: "logout"
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `triggerAction ${action} -|`;

    try {
      const status = useAuthStore((state) => state.status);

      log(logPrefix, { status });

      // Set appropriate data attributes based on action type
      const dataAttributes: Record<string, string> = {};

      switch (action) {
        case "logout":
          if (status !== "authenticated") {
            throw new Error("Not authenticated");
          }
          dataAttributes["data-o-logout-link"] = "1";
          break;

        default:
          throw new Error("Invalid action type");
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

export function logout(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return action(Component, "logout");
}
