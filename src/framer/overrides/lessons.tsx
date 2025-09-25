import React from "react";

import {
  showWhenProperty,
  showWhenNotProperty,
  selectVariantForProperty,
  toggleProperty,
} from "./properties";

const PROPERTY_LESSONS_COMPLETED = "LessonsCompleted";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";

// Visisbility Overrides

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

// Actions & Variant Overrides

const VARIANTS = {
  trueVariant: null,
  falseVariant: "props.variant",
  anonVariant: "props.variant",
};

export function toggleLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    ...VARIANTS,
  });
}

export function selectPrimaryVariantWhenLessonCompleted(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return selectVariantForProperty(Component, PROPERTY_LESSONS_COMPLETED, {
    value: PROPS_SLUG,
    compare: INCLUDES,
    ...VARIANTS,
  });
}
