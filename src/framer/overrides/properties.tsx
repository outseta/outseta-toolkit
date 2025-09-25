import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { getNestedProperty } from "../../auth-store/utils";

import useAuthStore, { isFramerCanvas } from "./useAuthStore";

import {
  comparePropertyValue,
  resolveValue,
  toggleValueInArray,
  type CompareType,
  type CompareFlag,
} from "./property-utils";

type PropertyKey = string;

type CompareOptions = {
  value: any;
  compare: CompareType;
  flags?: CompareFlag[];
};

type MatchVariantOptions = {
  trueVariant: string | null;
  falseVariant: string | null;
};

const log = OutsetaLogger(`framer.overrides.properties`);

function getPropertyValue(user: any, propertyName: string): any {
  return getNestedProperty(user, propertyName) || "";
}

// Display overrides

export function withTextProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withTextProperty ${property} -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component with placeholder`);
        return <Component ref={ref} {...props} text={`{${property}}`} />;
      }

      const user = useAuthStore((state) => state.user);

      if (!user) {
        log(logPrefix, `No user data - remove component`);
        return null;
      }

      const propertyValue = getPropertyValue(user, property);

      if (!propertyValue) {
        log(logPrefix, `Empty property value - remove component`);
        return null;
      }

      return <Component ref={ref} {...props} text={String(propertyValue)} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
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
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const user = useAuthStore((state) => state.user);

      if (!user) {
        log(logPrefix, `No user data - remove component`);
        return null;
      }

      let imageSrc = getNestedProperty(user, property) || "";

      if (typeof imageSrc !== "string") {
        log(logPrefix, `User data - ${property} is not a string`, imageSrc);
        imageSrc = "";
      }

      log(logPrefix, `User data - show component with image`, imageSrc);
      return (
        <Component
          ref={ref}
          {...props}
          background={{
            ...props.background,
            src: imageSrc || props.background.src,
            srcSet: imageSrc ? undefined : props.background.srcSet,
          }}
        />
      );
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

// Visibility overrides

export function showWhenProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  { value, compare: compareType, flags }: CompareOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForProperty ${property} ${window?.location?.href}-|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - showing component`);
        return <Component ref={ref} {...props} />;
      }

      const user = useAuthStore((state) => state.user);

      if (!user) {
        log(logPrefix, `No user data - remove component`);
        return null;
      }

      const propertyValue = getPropertyValue(user, property);
      const resolvedValue = resolveValue(value, props);
      log(
        logPrefix,
        `Compare ${resolvedValue} to ${propertyValue} using ${compareType}`
      );
      const matches = comparePropertyValue(
        propertyValue,
        resolvedValue,
        compareType,
        flags
      );

      if (!matches) {
        log(logPrefix, `No match - remove component`);
        return null;
      }

      log(logPrefix, `Match - show component`);
      return <Component ref={ref} {...props} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
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
    const logPrefix = `showForNotProperty ${property} -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const user = useAuthStore((state) => state.user);

      if (!user) {
        log(logPrefix, `No user data - remove component`);
        return null;
      }

      const propertyValue = getPropertyValue(user, property);
      const resolvedValue = resolveValue(value, props);
      log(
        logPrefix,
        `Compare ${resolvedValue} to ${propertyValue} using ${compareType}`
      );
      const matches = comparePropertyValue(
        propertyValue,
        resolvedValue,
        compareType,
        flags
      );

      if (matches) {
        log(logPrefix, `Match - remove component`);
        return null;
      }

      log(logPrefix, `No match - show component`);
      return <Component ref={ref} {...props} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

// Actions overrides

export function toggleProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  {
    value: valueToToggle,
    flags,
    trueVariant,
    falseVariant,
  }: Pick<CompareOptions, "value" | "flags"> & MatchVariantOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `toggleProperty ${property} -|`;
    const resolvedTrueVariant = resolveValue(trueVariant, props);
    const resolvedFalseVariant = resolveValue(falseVariant, props);

    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const user = useAuthStore((state) => state.user);
      const updateUserProperty = useAuthStore(
        (state) => state.updateUserProperty
      );

      if (!user) {
        log(logPrefix, `No user data - remove component`);
        return null;
      }

      const propertyValue = getNestedProperty(user, property) || "";
      const resolvedValueToToggle = resolveValue(valueToToggle, props);

      const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault();

        const ignoreCase = flags?.includes("ignore-case") || false;

        const newPropertyValue = toggleValueInArray(
          propertyValue,
          resolvedValueToToggle,
          ignoreCase
        );

        log(logPrefix, `Update user property: ${newPropertyValue}`);
        await updateUserProperty(property, newPropertyValue);

        // Call original onClick if provided
        if (props.onClick) {
          log(logPrefix, `Call original onClick`);
          props.onClick(event);
        }
      };

      log(
        logPrefix,
        `Compare ${resolvedValueToToggle} to ${propertyValue} using includes`
      );
      const matches = comparePropertyValue(
        propertyValue,
        resolvedValueToToggle,
        "includes",
        flags
      );

      if (matches) {
        log(logPrefix, `Match - show '${resolvedTrueVariant}' variant`);
        return (
          <Component
            ref={ref}
            {...props}
            variant={resolvedTrueVariant}
            onClick={handleClick}
          />
        );
      }

      log(logPrefix, `Mismatch - show '${resolvedFalseVariant}' variant`);
      return (
        <Component
          ref={ref}
          {...props}
          variant={resolvedFalseVariant}
          onClick={handleClick}
        />
      );
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

// Variant overrides

export function selectPropertyVariant(
  Component: React.ComponentType<any>,
  property: string
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPropertyVariant ${property} -|`;

    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show configured variant`);
        return <Component ref={ref} {...props} />;
      }

      const user = useAuthStore((state) => state.user);

      if (!user) {
        log(logPrefix, `No user data - remove component`);
        return null;
      }

      const variantName = getPropertyValue(user, property) || "";
      log(logPrefix, `User data - show '${variantName}' variant`);
      return <Component ref={ref} {...props} variant={variantName} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

export function selectVariantForProperty(
  Component: React.ComponentType<any>,
  property: PropertyKey,
  {
    value,
    compare: compareType,
    flags,
    trueVariant,
    falseVariant,
  }: CompareOptions & MatchVariantOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectVariantForProperty ${property} -|`;
    const resolvedTrueVariant = resolveValue(trueVariant, props);
    const resolvedFalseVariant = resolveValue(falseVariant, props);

    if (isFramerCanvas()) {
      log(logPrefix, `Framer Canvas - show configured variant`);
      return <Component ref={ref} {...props} />;
    }

    const user = useAuthStore((state) => state.user);

    if (!user) {
      log(logPrefix, `No user data - remove component`);
      return null;
    }

    const propertyValue = getPropertyValue(user, property);
    const resolvedValue = resolveValue(value, props);
    log(
      logPrefix,
      `Compare ${resolvedValue} to ${propertyValue} using ${compareType}`
    );
    const matches = comparePropertyValue(
      propertyValue,
      resolvedValue,
      compareType,
      flags
    );

    if (matches) {
      log(logPrefix, `Match - show '${resolvedTrueVariant}' variant`);
      return <Component ref={ref} {...props} variant={resolvedTrueVariant} />;
    }

    log(logPrefix, `Mismatch - show '${resolvedFalseVariant}' variant`);
    return <Component ref={ref} {...props} variant={resolvedFalseVariant} />;
  });
}
