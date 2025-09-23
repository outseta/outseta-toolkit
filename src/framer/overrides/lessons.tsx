import React from "react";

import {
  showWhenProperty,
  showWhenNotProperty,
  selectVariantForProperty,
  toggleProperty,
  withTextProperty,
} from "./properties";

const PROPERTY_LESSONS_COMPLETED = "LessonsCompleted";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";

// Display overrides

export function withLessonsCompletedAsText(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, PROPERTY_LESSONS_COMPLETED);
}

export function showWhenLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showWhenProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

export function showWhenLessonNotCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showWhenNotProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

const VARIANTS = {
  trueVariant: null,
  falseVariant: "props.variant",
};

// Actions overrides

export function toggleLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    ...VARIANTS,
  });
}

// Variant overrides

export function selectPrimaryVariantWhenLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return selectVariantForProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
    ...VARIANTS,
  });
}
