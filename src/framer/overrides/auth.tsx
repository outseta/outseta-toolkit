import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";

import useAuthStore, { isFramerCanvas, type AuthStatus } from "./useAuthStore";
import { resolveValue } from "./utils";

const log = OutsetaLogger("framer.overrides.auth");

type VariantNames = {
  trueVariant: string | null;
  falseVariant: string | null;
};

const VARIANTS: VariantNames = {
  trueVariant: null,
  falseVariant: "props.variant",
};

/// Visibility overrides

function showWhenAuthStatus(
  Component: React.ComponentType<any>,
  validStatus: AuthStatus
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenAuthStatus ${validStatus} -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - showing component");
      return <Component ref={ref} {...props} />;
    }

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

/// Variant overrides

export function selectAuthStatusVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `authStatusVariant -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - selecting configured variant");
      return <Component ref={ref} {...props} variant={props.variant} />;
    }

    try {
      const status = useAuthStore((state) => state.status);

      switch (status) {
        case "anonymous":
          log(logPrefix, "Selecting variant", "Anonymous");
          return <Component ref={ref} {...props} variant="Anonymous" />;
        case "authenticated":
          log(logPrefix, "Selecting variant", "Authenticated");
          return <Component ref={ref} {...props} variant="Authenticated" />;
        default:
          throw new Error("Invalid status (${status})");
      }
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

export function selectPrimaryVariantForAuthenticated(
  Component: React.ComponentType<any>,
  { trueVariant, falseVariant }: VariantNames = VARIANTS
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPrimaryVariantForAuthenticated -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - selecting configured variant");
      return <Component ref={ref} {...props} variant={props.variant} />;
    }

    try {
      const status = useAuthStore((state) => state.status);
      const resolvedTrueVariant = resolveValue(trueVariant, props);
      const resolvedFalseVariant = resolveValue(falseVariant, props);
      const isAuthenticated = status === "authenticated";
      const variant = isAuthenticated
        ? resolvedTrueVariant
        : resolvedFalseVariant;
      log(logPrefix, "Selecting variant", variant);
      return <Component ref={ref} {...props} variant={variant} />;
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

// Actions overrides

export function triggerLogout(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `triggerLogout -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - showing component");
      return <Component ref={ref} {...props} />;
    }

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
