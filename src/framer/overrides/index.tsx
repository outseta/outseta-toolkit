import React, { forwardRef } from "react";
import { ComponentType, RefAttributes } from "react";
import { authStore, type AuthStatus } from "../../auth-store";
import { outsetaLog } from "../../outseta";
import { getNestedProperty } from "../../auth-store/utils";

import { compare } from "./compare";

// Override Function Types
export type OverrideFunction<P = any> = (
  Component: ComponentType<P>
) => ComponentType<P & RefAttributes<any>>;

export type TogglePropertyButtonOptions = {
  name: string;
  value: string;
};

export type ShowForPropertyOptions = {
  compare: "equal" | "array-includes";
  flags?: "ignore-case"[];
};

export type ShowForUserPropertyOptions = ShowForPropertyOptions & {
  name: string;
  value: any;
};

export type WithPropertyOptions = {
  name: string;
};

export type WithImagePropertyOptions = {
  name: string;
};

export type WithPayloadPropertyOptions = {
  name: string;
};

export type ShowForPayloadPropertyOptions = ShowForPropertyOptions & {
  name: string;
  value: any;
};

export type HideForPayloadPropertyOptions = ShowForPropertyOptions & {
  name: string;
  value: any;
};

export type HideForUserPayloadPropertyOptions = ShowForPropertyOptions & {
  name: string;
  value: any;
};

// Parametric Override Types
export type ParametricOverrideFunction<T, P = any> = (
  Component: ComponentType<P>,
  options: T
) => ComponentType<P & RefAttributes<any>>;

// Specific Override Function Types
export type AsTogglePropertyButtonFunction =
  ParametricOverrideFunction<TogglePropertyButtonOptions>;
export type ShowForPropertyFunction =
  ParametricOverrideFunction<ShowForUserPropertyOptions>;
export type WithPropertyFunction =
  ParametricOverrideFunction<WithPropertyOptions>;
export type WithImagePropertyFunction =
  ParametricOverrideFunction<WithImagePropertyOptions>;
export type WithPayloadPropertyFunction =
  ParametricOverrideFunction<WithPayloadPropertyOptions>;
export type ShowForPayloadPropertyFunction =
  ParametricOverrideFunction<ShowForPayloadPropertyOptions>;
export type HideForPayloadPropertyFunction =
  ParametricOverrideFunction<HideForPayloadPropertyOptions>;
export type HideForUserPayloadPropertyFunction =
  ParametricOverrideFunction<HideForUserPayloadPropertyOptions>;

const log = outsetaLog("framer.overrides");

/**
 * Creates a toggle action for any property
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name
 * @param options.value - Value to toggle (can be "props.propertyName")
 */
export function toggleUserProperty(
  Component: React.ComponentType<any>,
  { name: propertyName, value: toggleValue }: TogglePropertyButtonOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `toggleUserProperty ${propertyName} -|`;
    try {
      const user = authStore((state) => state.user);
      const updateUserProperty = authStore((state) => state.updateUserProperty);

      if (!user) {
        throw new Error("Authentication required");
      }

      // Resolve toggle value from props if needed
      let resolvedToggleValue = resolveValue(toggleValue, props);

      const propertyValue = getNestedProperty(user, propertyName) || "";
      const propertyValueAsArray =
        typeof propertyValue === "string"
          ? propertyValue.split(",").map((item) => item.trim())
          : [];

      const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault();

        log(logPrefix, { propertyName, resolvedToggleValue });

        const newPropertyValueAsArray = [
          // Filter out the toggle value and empty values
          ...propertyValueAsArray.filter(
            (item) => item !== resolvedToggleValue && item.trim() !== ""
          ),
          // Add toggle value at the end if not included in current value
          ...(propertyValueAsArray.includes(resolvedToggleValue)
            ? []
            : [resolvedToggleValue]),
        ].filter((item) => item.trim() !== ""); // Final filter to remove any empty values

        await updateUserProperty(
          propertyName,
          newPropertyValueAsArray.join(", ")
        );

        // Call original onClick if provided
        if (props.onClick) {
          props.onClick(event);
        }
      };

      const active = propertyValueAsArray.includes(resolvedToggleValue);

      return (
        <Component
          ref={ref}
          {...props}
          variant={active ? props.variant : undefined}
          onClick={handleClick}
        />
      );
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
 * Shows component based on property comparison
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name to check
 * @param options.value - Value to compare against (can be "props.propertyName")
 * @param options.compare - Comparison type: "equal" or "array-includes"
 * @param options.flags - Additional flags like ["ignore-case"]
 */
export function showForUserProperty(
  Component: React.ComponentType<any>,
  {
    name: propertyName,
    value,
    compare: compareType = "equal",
    flags = [],
  }: ShowForUserPropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForUserProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);

      if (!user) {
        throw new Error("Authentication required");
      }
      const propertyValue = getNestedProperty(user, propertyName);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, {
        propertyValue,
        resolvedValue,
        compareType,
      });

      if (!compare(propertyValue, resolvedValue, compareType, flags)) {
        throw new Error("Condition not met");
      }

      log(logPrefix, "Match found, showing component");
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

/**
 * Sets component text to a user property value
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name to display
 */
export function withUserProperty(
  Component: React.ComponentType<any>,
  { name: propertyName }: WithPropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withUserProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);

      if (!user) {
        throw new Error("Authentication required");
      }

      let propertyValue = getNestedProperty(user, propertyName);

      if (typeof propertyValue !== "string") {
        throw new Error("Not a string");
      }

      log(logPrefix, { propertyValue });
      return <Component ref={ref} {...props} text={propertyValue} />;
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
 * Sets component background image to a user property value
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name containing image URL
 */
export function withUserImageProperty(
  Component: React.ComponentType<any>,
  { name: propertyName }: WithImagePropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withUserImageProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);

      if (!user) {
        throw new Error("Authentication required");
      }

      const imageSrc = getNestedProperty(user, propertyName) as string;

      log(logPrefix, { imageSrc });

      if (!imageSrc) {
        // If no image from user property, use component's default or hide
        if (props.background?.src) {
          // Component has image set, use as fallback
          log(logPrefix, "No user image, using component fallback");
          return <Component ref={ref} {...props} />;
        } else {
          // Component has no image set, hide
          log(logPrefix, "No user image and no component fallback, hiding");
          return null;
        }
      }

      log(logPrefix, "Setting image from user property");
      return (
        <Component
          ref={ref}
          {...props}
          background={{
            ...props.background,
            src: imageSrc,
            srcSet: undefined,
          }}
        />
      );
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
 * Sets component text to a payload property value
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Payload property name to display
 */
export function withPayloadProperty(
  Component: React.ComponentType<any>,
  { name: propertyName }: WithPayloadPropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withPayloadProperty ${propertyName} -|`;

    try {
      const payload = authStore((state) => state.payload);

      if (!payload) {
        throw new Error("Authentication required");
      }

      const propertyValue = getNestedProperty(payload, propertyName);

      if (typeof propertyValue !== "string") {
        throw new Error("Not a string");
      }

      log(logPrefix, { propertyValue });
      return <Component ref={ref} {...props} text={propertyValue} />;
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
 * Shows component based on payload property comparison
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Payload property name to check
 * @param options.value - Value to compare against (can be "props.propertyName")
 * @param options.compare - Comparison type: "equal" or "array-includes"
 * @param options.flags - Additional flags like ["ignore-case"]
 */
export function showForPayloadProperty(
  Component: React.ComponentType<any>,
  {
    name: propertyName,
    value,
    compare: compareType = "equal",
    flags = [],
  }: ShowForPayloadPropertyOptions
): React.ComponentType<any> {
  // Create comparison function based on compare type
  return forwardRef((props, ref) => {
    const logPrefix = `showForPayloadProperty ${propertyName} -|`;

    try {
      const payload = authStore((state) => state.payload);

      if (!payload) {
        throw new Error("Authentication required");
      }

      const propertyValue = getNestedProperty(payload, propertyName);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, { propertyValue, resolvedValue, compareType });

      if (!compare(propertyValue, resolvedValue, compareType, flags)) {
        throw new Error("Condition not met");
      }

      log(logPrefix, "Match found, showing component");
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

/**
 * Hides component based on payload property comparison
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Payload property name to check
 * @param options.value - Value to compare against (can be "props.propertyName")
 * @param options.compare - Comparison type: "equal" or "array-includes"
 * @param options.flags - Additional flags like ["ignore-case"]
 */
export function hideForPayloadProperty(
  Component: React.ComponentType<any>,
  {
    name: propertyName,
    value,
    compare: compareType = "equal",
    flags = [],
  }: HideForPayloadPropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `hideForPayloadProperty ${propertyName} -|`;

    try {
      const payload = authStore((state) => state.payload);

      if (!payload) {
        throw new Error("Authentication required");
      }

      const propertyValue = getNestedProperty(payload, propertyName);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, { propertyValue, resolvedValue, compareType });

      if (compare(propertyValue, resolvedValue, compareType, flags)) {
        throw new Error("Condition met - hiding component");
      }

      log(logPrefix, "Condition not met, showing component");
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

/**
 * Hides component based on user property comparison
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name to check
 * @param options.value - Value to compare against (can be "props.propertyName")
 * @param options.compare - Comparison type: "equal" or "array-includes"
 * @param options.flags - Additional flags like ["ignore-case"]
 */
export function hideForUserPayloadProperty(
  Component: React.ComponentType<any>,
  {
    name: propertyName,
    value,
    compare: compareType = "equal",
    flags = [],
  }: HideForUserPayloadPropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `hideForUserPayloadProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);

      if (!user) {
        throw new Error("Authentication required");
      }
      const propertyValue = getNestedProperty(user, propertyName);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, {
        propertyValue,
        resolvedValue,
        compareType,
      });

      if (compare(propertyValue, resolvedValue, compareType, flags)) {
        throw new Error("Condition met - hiding component");
      }

      log(logPrefix, "Condition not met, showing component");
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

/**
 * Shows a component only when the authentication state matches the specified state
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
      const status = authStore((state) => state.status);
      const user = authStore((state) => state.user);

      log(logPrefix, { status, validStatus });

      let showComponent = status === validStatus;
      if (validStatus === "user-loaded") {
        showComponent = Boolean(user);
      }

      if (!showComponent) {
        throw new Error("Condition not met");
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
      const status = authStore((state) => state.status);

      log(logPrefix, { status });

      // Handle visibility based on embed type
      if (embed === "register" || embed === "login") {
        if (status !== "anonymous") {
          throw new Error("Authentication required");
        }
      } else if (embed === "profile") {
        if (status !== "authenticated") {
          throw new Error("Authentication required");
        }
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
          throw new Error("Invalid configuration");
      }

      log(logPrefix, "Setting Outseta data attributes", {
        dataAttributes,
      });
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
      const status = authStore((state) => state.status);

      log(logPrefix, { status });

      // Handle visibility based on action type
      if (action === "logout") {
        if (status !== "authenticated") {
          throw new Error("Authentication required");
        }
      }

      // Set appropriate data attributes based on action type
      const dataAttributes: Record<string, string> = {};

      switch (action) {
        case "logout":
          dataAttributes["data-o-logout-link"] = "1";
          break;

        default:
          throw new Error("Invalid configuration");
      }

      log(logPrefix, "Setting Outseta data attributes", {
        dataAttributes,
      });
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
 * Resolves a value from props if it starts with "props."
 * @param value - The value to resolve
 * @param props - The component props
 * @returns The resolved value
 */
function resolveValue(value: any, props: any) {
  if (typeof value === "string" && value.startsWith("props.")) {
    return props[value.replace("props.", "")];
  }
  return value;
}
