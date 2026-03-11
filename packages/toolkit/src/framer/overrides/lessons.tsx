import React from "react";

import {
  showForProperty,
  showForNotProperty,
  toggleProperty,
} from "./properties";

const PROPERTY_LESSONS_COMPLETED = "LessonsCompleted";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";

// Visisbility Overrides

export function showForLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showForProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

export function showForLessonNotCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showForNotProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

// Actions & Variant Overrides

export function toggleLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    trueVariant: "props.variant",
    falseVariant: null, // Use primary variant
  });
}

// Backwards compatibility aliases
export const showWhenLessonCompleted = showForLessonCompleted;
export const showWhenLessonNotCompleted = showForLessonNotCompleted;
