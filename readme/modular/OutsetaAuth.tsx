// File: OutsetaAuth.tsx
// Authentication controls for Outseta integration
import { type ComponentType } from "react";
import { auth } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// AUTHENTICATION CONTROLS ////

// Component triggers logout (shows for authenticated users only)
export function triggerLogout(Component): ComponentType {
  return auth.triggerLogout(Component);
}

// Component visible only for anonymous users
export function showWhenAnonymous(Component): ComponentType {
  return auth.showWhenAnonymous(Component);
}

// Component visible only for authenticated users
export function showWhenAuthenticated(Component): ComponentType {
  return auth.showWhenAuthenticated(Component);
}

// Selects `Anonymous` variant for anonymous users
// Selects `Authenticated` variant for authenticated users
// Selects `Pending` variant for pending users (can be omitted and the primary variant will be used)
export function selectAuthStatusVariant(Component): ComponentType {
  return auth.selectAuthStatusVariant(Component);
}

// Selects primary variant for authenticated users
// Selects configured variant for non-authenticated users
export function selectPrimaryVariantForAuthenticated(Component): ComponentType {
  return auth.selectPrimaryVariantForAuthenticated(Component);
}
