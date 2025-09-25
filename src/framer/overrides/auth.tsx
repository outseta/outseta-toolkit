import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";

import useAuthStore, { isFramerCanvas } from "./useAuthStore";

const log = OutsetaLogger("framer.overrides.auth");

/// Visibility overrides

export function showWhenAnonymous(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenAnonymous -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const currentStatus = useAuthStore((state) => state.status);

      switch (currentStatus) {
        case "pending":
          log(logPrefix, `Pending - show anonymous component`);
          return <Component ref={ref} {...props} />;
        case "anonymous":
          log(logPrefix, `Anonymous - show anonymous component`);
          return <Component ref={ref} {...props} />;
        case "authenticated":
          log(logPrefix, `Authenticated - remove anonymous component`);
          return null;
        default:
          log(logPrefix, `Invalid - remove component`);
          return null;
      }
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

export function showWhenAuthenticated(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenAuthenticated -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const currentStatus = useAuthStore((state) => state.status);

      switch (currentStatus) {
        case "pending":
          log(logPrefix, `Pending - remove authenticated component`);
          return null;
        case "anonymous":
          log(logPrefix, `Anonymous - remove authenticated component`);
          return null;
        case "authenticated":
          log(logPrefix, `Authenticated - show authenticated component`);
          return <Component ref={ref} {...props} />;
        default:
          log(logPrefix, `Invalid - remove authenticated component`);
          return null;
      }
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

/// Variant overrides

export function selectAuthStatusVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectAuthStatusVariant -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show configured variant`);
        return <Component ref={ref} {...props} />;
      }

      const status = useAuthStore((state) => state.status);
      
      switch (status) {
        case "pending":
          log(logPrefix, `Pending - show 'Anonymous' variant`);
          return <Component ref={ref} {...props} variant="Anonymous" />;
        case "anonymous":
          log(logPrefix, `Anonymous - show 'Anonymous' variant`);
          return <Component ref={ref} {...props} variant="Anonymous" />;
        case "authenticated":
          log(logPrefix, `Authenticated - show 'Authenticated' variant`);
          return <Component ref={ref} {...props} variant="Authenticated" />;
        default:
          log(logPrefix, `Invalid - remove component`);
          return null;
      }
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

export function selectPrimaryVariantForAuthenticated(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPrimaryVariantForAuthenticated -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show configured variant`);
        return <Component ref={ref} {...props} />;
      }

      const status = useAuthStore((state) => state.status);

      switch (status) {
        case "pending":
          log(logPrefix, `Pending - show configured variant`);
          return <Component ref={ref} {...props} style={{ ...props.style }} />;
        case "anonymous":
          log(logPrefix, `Anonymous - show configured variant`);
          return <Component ref={ref} {...props} />;
        case "authenticated":
          log(logPrefix, `Authenticated - show primary variant`);
          return <Component ref={ref} {...props} variant={null} />;
        default:
          log(logPrefix, `Invalid - remove component`);
          return null;
      }
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
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
    try {
      const dataAttributes = {
        "data-o-logout-link": "1",
      };

      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const currentStatus = useAuthStore((state) => state.status);

      switch (currentStatus) {
        case "pending":
          log(logPrefix, `Pending - remove authenticated component`);
          return null;
        case "anonymous":
          log(logPrefix, `Anonymous - remove authenticated component`);
          return null;
        case "authenticated":
          log(logPrefix, `Authenticated - show authenticated component`);
          return <Component ref={ref} {...props} {...dataAttributes} />;
        default:
          log(logPrefix, `Invalid - remove component`);
          return null;
      }
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}
