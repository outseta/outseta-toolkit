import React, { forwardRef } from "react";
import { authStore, getNestedProperty } from "../../auth-store";
import {
  log,
  resolveValue,
  compare,
  type PropertyOptions,
  type ComparePropertyOptions,
} from "./utils";

/**
 * Sets component text to a payload property value
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.name - Payload property name to display
 */
export function withPayloadProperty(
  Component: React.ComponentType<any>,
  { name: propertyName }: PropertyOptions
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
  }: ComparePropertyOptions
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
  }: ComparePropertyOptions
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
