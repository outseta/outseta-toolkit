import React from "react";

import {
  showForPropertyMatch,
  showForNotPropertyMatch,
  variantForPropertyMatch,
  toggleProperty,
  withTextProperty,
} from "./properties";

const PROPERTY_LESSONS_COMPLETED = "LessonsCompleted";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";

/**
 * Sets component text to bookmarks
 * @param Component - The component to wrap
 */
export function withLessonsCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, PROPERTY_LESSONS_COMPLETED);
}

/**
 * Shows component if lesson is completed
 * @param Component - The component to wrap
 * @param options - Configuration
 */
export function showForLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showForPropertyMatch(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
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
  return showForNotPropertyMatch(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
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
  return toggleProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
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
  return variantForPropertyMatch(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
    matchVariant: "Completed",
    noMatchVariant: "NotCompleted",
  });
}
