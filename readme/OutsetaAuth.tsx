// File: OutsetaAuth.tsx
// Authentication controls for Outseta integration
import { type ComponentType } from "react";
import { auth } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// AUTHENTICATION CONTROLS ////

// Component opens login embed as popup (shows for anonymous users only)
export function popupLoginEmbed(Component): ComponentType {
  return auth.popupLoginEmbed(Component);
}

// Component opens registration embed as popup (shows for anonymous users only)
export function popupRegisterEmbed(Component): ComponentType {
  return auth.popupRegisterEmbed(Component);
}

// Component opens profile embed as popup (shows for authenticated users only)
export function popupProfileEmbed(Component): ComponentType {
  return auth.popupProfileEmbed(Component);
}

// Component triggers logout (shows for authenticated users only)
export function logout(Component): ComponentType {
  return auth.logout(Component);
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
export function authStatusVariant(Component): ComponentType {
  return auth.authStatusVariant(Component);
}
