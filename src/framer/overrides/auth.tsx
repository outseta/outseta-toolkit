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

export function selectAuthStatusVariant(
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

export function triggerLogout(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `triggerLogout -|`;

    try {
      const status = useAuthStore((state) => state.status);

      log(logPrefix, { status });

      if (status !== "authenticated") {
        throw new Error("Not authenticated");
      }

      const dataAttributes = {
        "data-o-logout-link": "1",
      };

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
