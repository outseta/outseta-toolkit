import React from "react";
import {
  showWhenProperty,
  showWhenNotProperty,
  variantWhenProperty,
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

export function variantFromBookmarkStatus(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return variantWhenProperty(Component, PROPERTY_BOOKMARKS, {
    value: PROPS_SLUG,
    compare: INCLUDES,
    ...VARIANTS,
  });
}
