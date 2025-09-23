// File: OutsetaBookmarks.tsx
// Bookmark system for Outseta integration
import { type ComponentType } from "react";
import { bookmarks } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

/*
 ***********************************************************
 ** 🚨 REQUIRES: Create a person custom property with system name: Bookmarks **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "Bookmarks"
 3. and the control type is "text"
 */

//// BOOKMARK SYSTEM ////

// Display bookmarks (comma-separated list) as component text
export function withBookmarks(Component): ComponentType {
  return bookmarks.withBookmarksAsText(Component);
}

/**
 * ℹ️ NOTE: The following overrides require a `slug` property on the component
 */

// Component visible if item is bookmarked
export function showWhenBookmarked(Component): ComponentType {
  return bookmarks.showWhenBookmarked(Component);
}

// Component visible if item is not bookmarked
export function showWhenNotBookmarked(Component): ComponentType {
  return bookmarks.showWhenNotBookmarked(Component);
}

// Toggle bookmark status
// Selects variant `Bookmarked` when item is bookmarked
// Selects variant `NotBookmarked` when the item is not bookmarked
export function toggleBookmarked(Component): ComponentType {
  return bookmarks.toggleBookmarked(Component);
}

// Selects variant `Bookmarked` when the item is bookmarked
// Selects variant `NotBookmarked` when the item is not bookmarked
export function bookmarkedVariant(Component): ComponentType {
  return bookmarks.bookmarkedVariant(Component);
}
