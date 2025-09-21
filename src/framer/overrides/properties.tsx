import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { getNestedProperty } from "../../auth-store/utils";

import useAuthStore from "./useAuthStore";

import {
  comparePropertyValue,
  resolveValue,
  toggleValueInArray,
} from "./utils";

type PropertyKey = string;

type CompareOptions = {
  value: any;
  compare: "equal" | "includes";
  flags?: "ignore-case"[];
};

type MatchVariantOptions = {
  matchVariant: string;
  noMatchVariant: string;
};

const log = OutsetaLogger(`framer.overrides.properties`);

/**
 * Gets a property value from user data
 * @param user - The user object
 * @param propertyName - The property name to get
 * @returns The property value
 */
function getPropertyValue(user: any, propertyName: string): any {
  return getNestedProperty(user, propertyName);
}

/**
 * Sets component text to a user property value
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.property - Property name to display
 */
export function withTextProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withTextProperty ${property} -|`;

    try {
      const user = useAuthStore((state) => state.user);

      if (!user) {
        throw new Error("User data required");
      }

      let propertyValue = getPropertyValue(user, property);

      if (typeof propertyValue !== "string") {
        throw new Error("Not a string");
      }

      log(logPrefix, { propertyValue });
      return <Component ref={ref} {...props} text={propertyValue} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Sets component background image to a user property value
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.property - Property name containing image URL
 */
export function withImageProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withImageProperty ${property} -|`;

    try {
      const user = useAuthStore((state) => state.user);

      if (!user) {
        throw new Error("User data required");
      }

      const imageSrc = getNestedProperty(user, property) as string;

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
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Shows component based on property comparison
 * @param Component - The component to wrap
 * @param property - Property name to check
 * @param options - Configuration
 * @param options.value - Value to compare against (can be "props.propertyName")
 * @param options.compare - Comparison type: "equal" or "includes"
 * @param options.flags - Array of flags: ["ignore-case"]
 */
export function showForPropertyMatch(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  { value, compare: compareType, flags }: CompareOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForProperty ${property} -|`;

    try {
      const user = useAuthStore((state) => state.user);

      if (!user) {
        throw new Error("User data required");
      }
      const propertyValue = getPropertyValue(user, property);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, {
        propertyValue,
        resolvedValue,
        compareType,
      });

      const matches = comparePropertyValue(
        propertyValue,
        resolvedValue,
        compareType,
        flags
      );

      if (!matches) {
        throw new Error("Match not found");
      }

      log(logPrefix, "Match found - showing component");
      return <Component ref={ref} {...props} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Shows component based on user property comparison
 * @param Component - The component to wrap
 * @param property - Property name to check
 * @param options - Configuration
 * @param options.value - Value to compare against (can be "props.propertyName")
 * @param options.compare - Comparison type: "equal" or "includes"
 * @param options.flags - Additional flags like ["ignore-case"]
 */
export function showForNotPropertyMatch(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  { value, compare: compareType, flags }: CompareOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForNotProperty ${property} -|`;

    try {
      const user = useAuthStore((state) => state.user);

      if (!user) {
        throw new Error("User data required");
      }
      const propertyValue = getPropertyValue(user, property);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, {
        propertyValue,
        resolvedValue,
        compareType,
      });

      const matches = comparePropertyValue(
        propertyValue,
        resolvedValue,
        compareType,
        flags
      );

      if (matches) {
        throw new Error("Match found");
      }

      log(logPrefix, "Match not found - showing component");
      return <Component ref={ref} {...props} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Creates a toggle action for any property
 * @param Component - The component to wrap
 * @param property - Property name to toggle
 * @param options - Configuration
 * @param options.value - Value to toggle (can be "props.propertyName")
 * @param options.matchVariant - Variant name result of the toggle match (default: "Match")
 * @param options.noMatchVariant - Variant name result of the toggle does not match (default: "NoMatch")
 */
export function toggleProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  {
    value: valueToToggle,
    flags,
    matchVariant,
    noMatchVariant,
  }: Pick<CompareOptions, "value" | "flags"> & MatchVariantOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `toggleProperty ${property} -|`;

    try {
      const user = useAuthStore((state) => state.user);
      const updateUserProperty = useAuthStore(
        (state) => state.updateUserProperty
      );

      if (!user) {
        throw new Error("User data required");
      }

      // Resolve toggle value from props if needed
      const resolvedValueToToggle = resolveValue(valueToToggle, props);

      const propertyValue = getNestedProperty(user, property) || "";

      log(logPrefix, { user, valueToToggle: resolvedValueToToggle });

      const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault();

        const ignoreCase = flags?.includes("ignore-case") || false;
        const newPropertyValue = toggleValueInArray(
          propertyValue,
          resolvedValueToToggle,
          ignoreCase
        );

        await updateUserProperty(property, newPropertyValue);

        // Call original onClick if provided
        if (props.onClick) {
          props.onClick(event);
        }
      };

      const matches = comparePropertyValue(
        propertyValue,
        resolvedValueToToggle,
        "includes",
        flags
      );

      return (
        <Component
          ref={ref}
          {...props}
          variant={matches ? matchVariant : noMatchVariant}
          onClick={handleClick}
        />
      );
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

export function variantForProperty(
  Component: React.ComponentType<any>,
  property: string
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `variantForProperty ${property} -|`;

    try {
      const user = useAuthStore((state) => state.user);

      if (!user) {
        throw new Error("User data required");
      }

      const propertyValue = getPropertyValue(user, property);
      log(logPrefix, { variant: propertyValue, props });
      return <Component ref={ref} {...props} variant={propertyValue} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Sets component variant based on property comparison
 * @param Component - The component to wrap
 * @param property - Property name to check
 * @param value - Value to compare against (can be "props.propertyName")
 * @param options - Configuration
 * @param options.compare - Comparison type: "equal" or "includes"
 * @param options.flags - Additional flags like ["ignore-case"]
 * @param options.matchVariant - Variant name when match is found (default: "Match")
 * @param options.noMatchVariant - Variant name when match is not found (default: "NoMatch")
 */
export function variantForPropertyMatch(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  {
    value,
    compare: compareType,
    flags,
    matchVariant,
    noMatchVariant,
  }: CompareOptions & MatchVariantOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPropertyMatchVariant ${property} -|`;

    try {
      const user = useAuthStore((state) => state.user);

      if (!user) {
        throw new Error("User data required");
      }

      const propertyValue = getPropertyValue(user, property);
      const resolvedValue = resolveValue(value, props);

      log(logPrefix, {
        propertyValue,
        resolvedValue,
        compareType,
        ["props.variant"]: props.variant,
      });

      const matches = comparePropertyValue(
        propertyValue,
        resolvedValue,
        compareType,
        flags
      );

      const variant = matches ? matchVariant : noMatchVariant;

      log(logPrefix, { variant });
      return <Component ref={ref} {...props} variant={variant} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}
