import React from "react";
import {
  showForPropertyValue,
  showForNotPropertyValue,
  toggleProperty,
  variantForProperty,
} from "./properties";

const NAME = "Bookmarks";
const VALUE = "props.slug";
const COMPARE = "array-includes";
const FLAG = "ignore-case";

/**
 * Shows component if item is bookmarked
 * @param Component - The component to wrap
 * @param options - Configuration
 */
export function showForBookmarked(
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
 * Hides component if item is bookmarked
 * @param Component - The component to wrap
 * @param options - Configuration
 */
export function showForNotBookmarked(
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
 * Toggles bookmark status for an item
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.slug - Item slug to toggle (can be "props.slug")
 */
export function toggleBookmark(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, {
    property: NAME,
    value: VALUE,
    matchVariant: "Bookmarked",
    noMatchVariant: "NotBookmarked",
  });
}

/**
 * Sets component variant based on bookmark status
 * @param Component - The component to wrap
 */
export function variantForBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return variantForProperty(Component, {
    property: NAME,
    value: VALUE,
    compare: COMPARE,
    flags: [FLAG],
    matchVariant: "Bookmarked",
    noMatchVariant: "NotBookmarked",
  });
}
