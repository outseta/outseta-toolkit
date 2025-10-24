// File: OutsetaUser.tsx
// User data display functions for Outseta integration
import { user } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.7/dist/framer/overrides.js";

//// USER DATA DISPLAY ////

// Display user's first name as component text
export function withFirstName(Component): React.ComponentType {
  return user.withFirstName(Component);
}

// Display user's last name as component text
export function withLastName(Component): React.ComponentType {
  return user.withLastName(Component);
}

// Display user's full name as component text
export function withFullName(Component): React.ComponentType {
  return user.withFullName(Component);
}

// Display user's email address as component text
export function withEmail(Component): React.ComponentType {
  return user.withEmail(Component);
}

// Display user's avatar/profile image as component image
// ℹ️ **NOTE:** Requires an image component
export function withAvatar(Component): React.ComponentType {
  return user.withAvatar(Component);
}

// Display account name as component text
export function withAccountName(Component): React.ComponentType {
  return user.withAccountName(Component);
}
