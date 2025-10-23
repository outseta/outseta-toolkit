// File: OutsetaAuth.tsx
// Authentication controls for Outseta integration
import { auth } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.6/dist/framer/overrides.js";

//// AUTHENTICATION CONTROLS ////

// Component triggers logout (shows for authenticated users only)
export function triggerLogout(Component): React.ComponentType {
  return auth.triggerLogout(Component);
}

// Component visible for anonymous users
export function showForAnonymous(Component): React.ComponentType {
  return auth.showForAnonymous(Component);
}

// Component visible for authenticated users
export function showForAuthenticated(Component): React.ComponentType {
  return auth.showForAuthenticated(Component);
}

// Selects `Anonymous` variant for anonymous users
// Selects `Authenticated` variant for authenticated users
export function selectAuthStatusVariant(Component): React.ComponentType {
  return auth.selectAuthStatusVariant(Component);
}

// Selects primary variant for authenticated users
// Selects configured variant for non-authenticated users
export function selectPrimaryVariantForAuthenticated(
  Component
): React.ComponentType {
  return auth.selectPrimaryVariantForAuthenticated(Component);
}
