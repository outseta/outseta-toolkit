import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";

import useAuthStore, { type AuthStatus } from "./useAuthStore";

const log = OutsetaLogger("framer.overrides.auth");

/**
 * Shows a component only when the authentication state matches the specified state
 * When in Framer canvas or preview mode, treats "anonymous" status as true
 *
 * @param Component - The React component to conditionally render
 * @param validState - The authentication state that allows the component to show
 * @returns A forwarded ref component that conditionally renders based on auth state
 */
export function showForAuthStatus(
  Component: React.ComponentType<any>,
  validStatus: AuthStatus | "user-loaded"
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForAuthStatus ${validStatus} -|`;

    try {
      const status = useAuthStore((state) => state.status);

      log(logPrefix, { status, validStatus });

      switch (validStatus) {
        case "anonymous":
          if (status !== "anonymous") {
            throw new Error("Not in anonymous state");
          }
          break;

        case "authenticated":
          if (status !== "authenticated") {
            throw new Error("Not in authenticated state");
          }
          break;

        case "pending":
          if (status !== "pending") {
            throw new Error("Not in pending state");
          }
          break;

        default:
          throw new Error("Invalid status");
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

export function selectAuthVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectAuthStatusVariant -|`;
    try {
      const status = useAuthStore((state) => state.status);
      log(logPrefix, { status });
      return <Component ref={ref} {...props} variant={status} />;
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

/**
 * Converts a component to trigger Outseta popup embeds
 * Handles registration, login, and profile popup embeds with proper visibility rules
 *
 * @param Component - The React component to wrap
 * @param embed - The type of Outseta popup embed: "register", "login", or "profile"
 * @returns A forwarded ref component that triggers the specified Outseta popup
 */
export function triggerPopup(
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

/**
 * Converts a component to trigger Outseta action embeds
 * Handles logout actions with proper visibility rules
 *
 * @param Component - The React component to wrap
 * @param action - The type of action: "logout"
 * @returns A forwarded ref component that triggers the specified Outseta action
 */
export function triggerAction(
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
