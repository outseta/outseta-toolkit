import React from "react";

import {
  showWhenProperty,
  showWhenNotProperty,
  variantWhenProperty,
  toggleProperty,
  withTextProperty,
} from "./properties";

const PROPERTY_LESSONS_COMPLETED = "LessonsCompleted";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";
const VARIANTS = {
  activeVariant: "Completed",
  inactiveVariant: "NotCompleted",
};

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

export function toggleLessonCompletion(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    ...VARIANTS,
  });
}

export function variantFromLessonCompletionStatus(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return variantWhenProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
    ...VARIANTS,
  });
}
