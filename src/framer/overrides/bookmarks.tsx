import React from "react";
import {
  showWhenProperty,
  selectVariantForProperty,
  toggleProperty,
} from "./properties";

const PROPERTY_BOOKMARKS = "Bookmarks";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";

// Visibility overrides

export function showWhenBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showWhenProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

// Actions overrides

export function toggleBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    trueVariant: "props.variant",
    falseVariant: null, // Use primary variant
  });
}

// Variant overrides

export function selectBookmarkCollectionVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return selectVariantForProperty(Component, PROPERTY_BOOKMARKS, {
    value: "", // empty string means there are no bookmarks
    compare: "equal",
    trueVariant: "Empty State", // Use `Empty State` variant
    falseVariant: null, // Use primary variant
  });
}
