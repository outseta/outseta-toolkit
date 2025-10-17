// File: OutsetaBookmarks.tsx
// Bookmark system for Outseta integration
import { type ComponentType } from "react";
import { bookmarks } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.4/dist/framer/overrides.js";

/*
 ***********************************************************
 ** 🚨 **REQUIRES** a person custom property with system name: Bookmarks **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "Bookmarks"
 3. and the control type is "text"
 */

/**
 * ℹ️ **NOTE:** The following overrides require a `slug` property on the component
 */

// Component visible for authenticated users when item is bookmarked
export function showWhenBookmarked(Component): ComponentType {
  return bookmarks.showWhenBookmarked(Component);
}

// Toggle bookmark status
// Selects primary variant for authenticated users when item is bookmarked
// Selects configured variant for authenticated users when item is not bookmarked
export function toggleBookmarked(Component): ComponentType {
  return bookmarks.toggleBookmarked(Component);
}

// Selects variant `Empty State` when there are no bookmarks
// Selects primary variant when there are bookmarks
export function selectCollectionVariant(Component): ComponentType {
  return bookmarks.selectBookmarkCollectionVariant(Component);
}
