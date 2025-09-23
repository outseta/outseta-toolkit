import React from "react";
import {
  showWhenProperty,
  showWhenNotProperty,
  selectVariantForProperty,
  toggleProperty,
  withTextProperty,
} from "./properties";

const PROPERTY_BOOKMARKS = "Bookmarks";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";

// Display overrides

export function withBookmarksAsText(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, PROPERTY_BOOKMARKS);
}

// Visibility overrides

export function showWhenBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showWhenProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

export function showWhenNotBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return showWhenNotProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
  });
}

const VARIANTS = {
  trueVariant: null,
  falseVariant: "props.variant",
};

// Actions overrides

export function toggleBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    ...VARIANTS,
  });
}

// Variant overrides

export function selectPrimaryVariantForBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return selectVariantForProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
    ...VARIANTS,
  });
}

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
