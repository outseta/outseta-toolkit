import React from "react";
import {
  showForPropertyValue,
  showForNotPropertyValue,
  toggleProperty,
  variantForProperty,
} from "./properties";

const NAME = "LessonsCompleted";
const VALUE = "props.slug";
const COMPARE = "array-includes";
const FLAG = "ignore-case";

/**
 * Shows component if lesson is completed
 * @param Component - The component to wrap
 * @param options - Configuration
 */
export function showForLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showForPropertyValue(Component, {
    property: NAME,
    value: VALUE,
    compare: COMPARE,
    flags: [FLAG],
  });
}

/**
 * Hides component if lesson is completed
 * @param Component - The component to wrap
 * @param options - Configuration
 */
export function showForLessonNotCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showForNotPropertyValue(Component, {
    property: NAME,
    value: VALUE,
    compare: COMPARE,
    flags: [FLAG],
  });
}

/**
 * Toggles lesson completion status for an item
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.slug - Item slug to toggle (can be "props.slug")
 */
export function toggleLessonCompletion(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, {
    property: NAME,
    value: VALUE,
    matchVariant: "Completed",
    noMatchVariant: "NotCompleted",
  });
}

/**
 * Sets component variant based on lesson completion status
 * @param Component - The component to wrap
 */
export function variantForLessonCompletion(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return variantForProperty(Component, {
    property: NAME,
    value: VALUE,
    compare: COMPARE,
    flags: [FLAG],
    matchVariant: "Completed",
    noMatchVariant: "NotCompleted",
  });
}
