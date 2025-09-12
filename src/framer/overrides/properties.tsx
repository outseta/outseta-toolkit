import React, { forwardRef } from "react";
import { authStore } from "../../auth-store";
import { outsetaLog } from "../../outseta";
import { getNestedProperty } from "../../auth-store/utils";

import { compare } from "./compare";

type PropertyOptions = {
  name: string;
};

type ComparePropertyOptions = {
  name: string;
  value: any;
  compare?: "equal" | "array-includes";
  flags?: "ignore-case"[];
};

const log = outsetaLog("framer.overrides");

/**
 * Maps property names to their source (user or payload)
 * @param propertyName - The property name to check
 * @returns The mapped property name and source
 */
function mapPropertyToSource(propertyName: string): {
  mappedName: string;
  source: "user" | "payload";
} {
  switch (propertyName) {
    case "CurrentPlanUid":
      return { mappedName: "outseta:planUid", source: "payload" };
    case "CurrentAddOnUids":
      return { mappedName: "outseta:addOnUids", source: "payload" };
    default:
      return { mappedName: propertyName, source: "user" };
  }
}

/**
 * Gets a property value from either user or payload based on the property name
 * @param params - Object containing user and payload
 * @param params.user - The user object
 * @param params.payload - The payload object
 * @param propertyName - The property name to get
 * @returns The property value
 */
function getPropertyValue(
  { user, payload }: { user: any; payload: any },
  propertyName: string
): any {
  const { mappedName, source } = mapPropertyToSource(propertyName);

  if (source === "payload") {
    return payload?.[mappedName];
  } else {
    return getNestedProperty(user, mappedName);
  }
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

/**
 * Sets component text to a user property value
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name to display
 */
export function withProperty(
  Component: React.ComponentType<any>,
  { name: propertyName }: PropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withUserProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);
      const payload = authStore((state) => state.payload);

      if (!user) {
        throw new Error("User loaded required");
      }

      let propertyValue = getPropertyValue({ user, payload }, propertyName);

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
export function withImageProperty(
  Component: React.ComponentType<any>,
  { name: propertyName }: PropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withUserImageProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);

      if (!user) {
        throw new Error("User loaded required");
      }

      // No image property in payload, so no need to use getPropertyValue
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
 * Shows component based on property comparison
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name to check
 * @param options.value - Value to compare against (can be "props.propertyName")
 * @param options.compare - Comparison type: "equal" or "array-includes"
 * @param options.flags - Additional flags like ["ignore-case"]
 */
export function showForProperty(
  Component: React.ComponentType<any>,
  {
    name: propertyName,
    value,
    compare: compareType = "equal",
    flags = [],
  }: ComparePropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForUserProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);
      const payload = authStore((state) => state.payload);

      if (!user) {
        throw new Error("User loaded required");
      }
      const propertyValue = getPropertyValue({ user, payload }, propertyName);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, {
        propertyValue,
        resolvedValue,
        compareType,
      });

      if (!compare(propertyValue, resolvedValue, compareType, flags)) {
        throw new Error("Match not found - hiding component");
      }

      log(logPrefix, "Match found - showing component");
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
export function hideForProperty(
  Component: React.ComponentType<any>,
  {
    name: propertyName,
    value,
    compare: compareType = "equal",
    flags = [],
  }: ComparePropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `hideForUserProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);
      const payload = authStore((state) => state.payload);

      if (!user) {
        throw new Error("User loaded required");
      }
      const propertyValue = getPropertyValue({ user, payload }, propertyName);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, {
        propertyValue,
        resolvedValue,
        compareType,
      });

      if (compare(propertyValue, resolvedValue, compareType, flags)) {
        throw new Error("Match found - hiding component");
      }

      log(logPrefix, "Match not found - showing component");
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
 * Sets component variant based on property comparison
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name to check
 * @param options.value - Value to compare against (can be "props.propertyName")
 * @param options.compare - Comparison type: "equal" or "array-includes"
 * @param options.flags - Additional flags like ["ignore-case"]
 */
export function primaryVariantForProperty(
  Component: React.ComponentType<any>,
  {
    name: propertyName,
    value,
    compare: compareType = "equal",
    flags = [],
  }: ComparePropertyOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `variantForProperty ${propertyName} -|`;

    try {
      const user = authStore((state) => state.user);
      const payload = authStore((state) => state.payload);

      const propertyValue = getPropertyValue({ user, payload }, propertyName);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, {
        propertyValue,
        resolvedValue,
        compareType,
        ["props.variant"]: props.variant,
      });

      if (!compare(propertyValue, resolvedValue, compareType, flags)) {
        throw new Error("Match not found");
      }
      log(logPrefix, "Match found - defaulting to primary variant");
      return <Component ref={ref} {...props} variant={undefined} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Keeping current variant", error.message);
      } else {
        log(logPrefix, "Keeping current variant", error);
      }
      return <Component ref={ref} {...props} />;
    }
  });
}

/**
 * Creates a toggle action for any property
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Property name
 * @param options.value - Value to toggle (can be "props.propertyName")
 */
export function toggleProperty(
  Component: React.ComponentType<any>,
  { name: propertyName, value: toggleValue }: { name: string; value: string }
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `toggleUserProperty ${propertyName} -|`;
    try {
      const user = authStore((state) => state.user);
      const updateUserProperty = authStore((state) => state.updateUserProperty);

      if (!user) {
        throw new Error("User loaded required");
      }

      // Resolve toggle value from props if needed
      const resolvedToggleValue = resolveValue(toggleValue, props);

      // No image property in payload, so no need to use getPropertyValue
      const propertyValue = getNestedProperty(user, propertyName) || "";
      const propertyValueAsArray =
        typeof propertyValue === "string"
          ? propertyValue.split(",").map((item) => item.trim())
          : [];

      const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault();

        log(logPrefix, { resolvedToggleValue });

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
