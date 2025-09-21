import React from "react";
import {
  showForPropertyMatch,
  showForNotPropertyMatch,
  variantForPropertyMatch,
  toggleProperty,
  withTextProperty,
} from "./properties";

const PROPERTY_BOOKMARKS = "Bookmarks";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";

/**
 * Sets component text to bookmarks
 * @param Component - The component to wrap
 */
export function withBookmarks(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, PROPERTY_BOOKMARKS);
}

/**
 * Shows component if item is bookmarked
 * finds the value on the component's `slug` property
 * @param Component - The component to wrap
 */
export function showForBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showForPropertyMatch(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

/**
 * Hides component if item is bookmarked
 * @param Component - The component to wrap
 * @param options.slug - Item slug to toggle (can be "props.slug")
 * @param options.matchVariant - Variant name result of the toggle match (default: "Match")
 * @param options.noMatchVariant - Variant name result of the toggle does not match (default: "NoMatch")
 */
export function showForNotBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showForNotPropertyMatch(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

/**
 * Toggles bookmark status for an item
 * @param Component - The component to wrap
 * @param options.slug - Item slug to toggle (can be "props.slug")
 * @param options.matchVariant - Variant name result of the toggle match (default: "Match")
 * @param options.noMatchVariant - Variant name result of the toggle does not match (default: "NoMatch")
 */
export function toggleBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    matchVariant: "Bookmarked",
    noMatchVariant: "NotBookmarked",
  });
}

/**
 * Sets component variant based on bookmark status
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.slug - Item slug to toggle (can be "props.slug")
 */
export function variantForBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return variantForPropertyMatch(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
    matchVariant: "Bookmarked",
    noMatchVariant: "NotBookmarked",
  });
}
