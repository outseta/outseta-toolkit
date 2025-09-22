import React from "react";
import {
  showWhenProperty,
  showWhenNotProperty,
  variantForProperty,
  toggleProperty,
  withTextProperty,
} from "./properties";

const PROPERTY_BOOKMARKS = "Bookmarks";
const PROPS_SLUG = "props.slug";
const INCLUDES = "includes";
const VARIANTS = {
  activeVariant: "Bookmarked",
  inactiveVariant: "NotBookmarked",
};

export function withBookmarksAsText(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return withTextProperty(Component, PROPERTY_BOOKMARKS);
}

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

export function toggleBookmarked(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return toggleProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    ...VARIANTS,
  });
}

export function bookmarkedVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return variantForProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
    ...VARIANTS,
  });
}
