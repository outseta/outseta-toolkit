import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { getNestedProperty } from "../../auth-store/utils";

import useAuthStore from "./useAuthStore";

import {
  comparePropertyValue,
  resolveValue,
  toggleValueInArray,
  type CompareType,
  type CompareFlag,
} from "./utils";

type PropertyKey = string;

type CompareOptions = {
  value: any;
  compare: CompareType;
  flags?: CompareFlag[];
};

type MatchVariantOptions = {
  activeVariant?: string;
  inactiveVariant?: string;
};

const log = OutsetaLogger(`framer.overrides.properties`);

function getPropertyValue(user: any, propertyName: string): any {
  return getNestedProperty(user, propertyName);
}

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

export function showWhenProperty(
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

export function showWhenNotProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  { value, compare: compareType, flags }: CompareOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenNotProperty ${property} -|`;

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

export function toggleProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  {
    value: valueToToggle,
    flags,
    activeVariant = "Active",
    inactiveVariant = "Inactive",
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
          variant={matches ? activeVariant : inactiveVariant}
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

export function propertyVariant(
  Component: React.ComponentType<any>,
  property: string
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `propertyVariant ${property} -|`;

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

export function variantForProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  {
    value,
    compare: compareType,
    flags,
    activeVariant = "Active",
    inactiveVariant = "Inactive",
  }: CompareOptions & MatchVariantOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `variantForProperty ${property} -|`;

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

      const variant = matches ? activeVariant : inactiveVariant;

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
