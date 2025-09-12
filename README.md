# Outseta Toolkit

A toolkit for integrating Outseta with visual website builders like Framer and Webflow.

Currently only provides Framer override functions for authentication, custom property display, and conditional visibility.

## Features

🔧 **Framer Overrides**: Functions for authentication, visibility, and dynamic content\
📦 **CDN/ESM Support**: Direct imports from CDN or npm\
📝 **TypeScript**: Full type definitions included\
❗ **Error Handling**: Optimistic updates with automatic rollback\
🔄 **Event Integration**: Automatic sync with Outseta events\
⚡ **Performance**: Debounced API calls and selective subscriptions

## Installation

### CDN Import

```javascript
// Framer overrides
import {
  trigger,
  toggleProperty,
  showForProperty,
  showForAuthStatus,
  withProperty,
  withImageProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.1/dist/framer/overrides.js";
```

## Quick Start

Provides override functions for integrating Outseta authentication and custom properties with Framer components. Handles authentication flows, conditional visibility, and dynamic content.

### User - Framer Overrides

Copy/paste the following code into a code file in your Framer project named `OutsetaUser.tsx`.

```javascript
// File: Outseta.tsx
import { type ComponentType } from "react";
import {
  showForAuthStatus,
  withProperty,
  withUserImageProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.1/dist/framer/overrides.js";

// Visibility controls
export function showForAnonymous(Component): ComponentType {
  return showForAuthStatus(Component, "anonymous");
}

export function showForAuthenticated(Component): ComponentType {
  return showForAuthStatus(Component, "authenticated");
}

export function showWhenUserLoaded(Component): ComponentType {
  return showForAuthStatus(Component, "user-loaded");
}

// User property display
export function withFirstName(Component): ComponentType {
  return withProperty(Component, { name: "FirstName" });
}

export function withLastName(Component): ComponentType {
  return withProperty(Component, { name: "LastName" });
}

export function withFullName(Component): ComponentType {
  return withProperty(Component, { name: "FullName" });
}

export function withEmail(Component): ComponentType {
  return withProperty(Component, { name: "Email" });
}

export function withAvatar(Component): ComponentType {
  return withImageProperty(Component, { name: "ProfileImageS3Url" });
}

// Account property display
export function withAccountName(Component): ComponentType {
  return withProperty(Component, { name: "Account.Name" });
}
```

### Subscriptions - Framer Overrides

Copy/paste the following code into a code file in your Framer project named `OutsetaSubscription.tsx`.

ℹ️ **NOTE:** Remember to replace the plan uids and names with your own, and duplicate the code for additional plan uids and names.

```javascript
// File: OutsetaSubscription.tsx
import { type ComponentType } from "react";
import {
  showForProperty,
  hideForProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.1/dist/framer/overrides.js";

// 🚨 Replace OW4pRYWg with your add-on uid, and duplicate for additional add-on uids
export function showForAddOn_OW4pRYWg(Component): ComponentType {
  return showForProperty(Component, {
    name: "CurrentAddOnUids",
    value: "OW4pRYWg",
    compare: "array-includes", // Compare as array
  });
}

// 🚨 Replace OW4pRYWg with your add-on uid, and duplicate for additional add-on uids
export function hideForAddOn_OW4pRYWg(Component): ComponentType {
  return hideForProperty(Component, {
    name: "CurrentAddOnUids",
    value: "OW4pRYWg",
    compare: "array-includes", // Compare as array
  });
}

// 🚨 Replace OW45KRmg with your plan uid, and duplicate for additional plan uids
export function showForPlan_OW45KRmg(Component): ComponentType {
  return showForProperty(Component, {
    name: "CurrentPlanUid",
    value: "OW45KRmg",
    compare: "equal-string", // Compare as string
  });
}

// 🚨 Replace OW45KRmg with your plan uid, and duplicate for additional plan uids
export function hideForPlan_OW45KRmg(Component): ComponentType {
  return hideForProperty(Component, {
    name: "CurrentPlanUid",
    value: "OW45KRmg",
    compare: "equal-string", // Compare as string
  });
}
```

### Auth Triggers - Framer Overrides

Copy/paste the following code into a code file in your Framer project named `OutsetaAuth.tsx`.

```javascript
// File: OutsetaAuth.tsx
import { type ComponentType } from "react";
import {
  triggerPopup,
  triggerAction,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.1/dist/framer/overrides.js";

// Authentication triggers
export function triggerLoginPopup(Component): ComponentType {
  return triggerPopup(Component, "login");
}

export function triggerRegisterPopup(Component): ComponentType {
  return triggerPopup(Component, "register");
}

export function triggerProfilePopup(Component): ComponentType {
  return triggerPopup(Component, "profile");
}

export function triggerLogout(Component): ComponentType {
  return triggerAction(Component, "logout");
}
```

### Completed Lessons - Framer Overrides

Copy/paste the following code into a code file in your Framer project named `OutsetaLessons.tsx`.

ℹ️ **NOTE:** The `CompletedLessons` custom property is required to be configured Outseta for this to work.

```javascript
// File: OutsetaLessons.tsx
import { type ComponentType } from "react";
import {
  withProperty,
  showForProperty,
  toggleProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.1/dist/framer/overrides.js";

//////
// 🚨 Requires a person custom property with system name: CompletedLessons
//////

// Display the completed lessons as a comma-separated list
export function withCompletedLessons(Component): ComponentType {
  return withProperty(Component, { name: "CompletedLessons" });
}

// Show the component if the lesson is completed
// 🚨 The Framer component must have a `slug` property.
export function showForLessonCompleted(Component): ComponentType {
  return showForProperty(Component, {
    name: "CompletedLessons",
    value: "props.slug",
    compare: "array-includes",
  });
}

// Hide the component if the lesson is completed
// 🚨 The Framer component must have a `slug` property.
export function hideForLessonCompleted(Component): ComponentType {
  return hideForProperty(Component, {
    name: "CompletedLessons",
    value: "props.slug",
  });
}

// Toggle the lesson as completed
// 🚨 The Framer component must have a `slug` property.
export function toggleCompletedLesson(Component): ComponentType {
  return toggleProperty(Component, {
    name: "CompletedLessons",
    value: "props.slug",
  });
}
```

### Bookmarks - Framer Overrides

Copy/paste the following code into a code file in your Framer project named `OutsetaBookmarks.tsx`.

ℹ️ **NOTE:** The `Bookmarks` custom property is required to be configured Outseta for this to work.

```javascript
// File: OutsetaBookmarks.tsx
import { type ComponentType } from "react";
import {
  withProperty,
  showForProperty,
  toggleProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.1/dist/framer/overrides.js";

//////
// 🚨 Requires a person custom property with system name: Bookmarks
//////

// Display the bookmarks as a comma-separated list
export function withBookmarks(Component): ComponentType {
  return withProperty(Component, { name: "Bookmarks" });
}

// Show the component if the bookmark is in the list
// 🚨 The Framer component must have a `slug` property.
export function showForBookmarked(Component): ComponentType {
  return showForProperty(Component, {
    name: "Bookmarks",
    value: "props.slug",
    compare: "array-includes",
  });
}

// Hide the component if the bookmark is in the list
// 🚨 The Framer component must have a `slug` property.
export function hideForBookmarked(Component): ComponentType {
  return hideForProperty(Component, {
    name: "Bookmarks",
    value: "props.slug",
  });
}

// Toggle the bookmark
// 🚨 The Framer component must have a `slug` property.
export function toggleBookmark(Component): ComponentType {
  return toggleProperty(Component, {
    name: "Bookmarks",
    value: "props.slug",
  });
}
```

## API Reference

### Override Functions

##### `triggerPopup(Component, embed)`

Converts any component into an Outseta popup trigger with automatic visibility rules.

**Embed Types:**

- `"register"` - Registration popup (shows for anonymous users only)
- `"login"` - Login popup (shows for anonymous users only)
- `"profile"` - Profile management (shows for authenticated users only)

```javascript
// Use in Framer Overrides Code File
export function triggerLoginPopup(Component) {
  return triggerPopup(Component, "login");
}

export function triggerRegisterPopup(Component) {
  return triggerPopup(Component, "register");
}

export function triggerProfilePopup(Component) {
  return triggerPopup(Component, "profile");
}
```

##### `triggerAction(Component, action)`

Converts any component into an Outseta action trigger with automatic visibility rules.

**Action Types:**

- `"logout"` - Logout action (shows for authenticated users only)

```javascript
// Use in Framer Overrides Code File
export function triggerLogout(Component) {
  return triggerAction(Component, "logout");
}
```

##### `showForAuthStatus(Component, status)`

Shows component only when authentication status matches the specified state.

**Status Options:**

- `"pending"` - Shows when authentication status is pending
- `"anonymous"` - Shows when authentication status is anonymous - logged out
- `"authenticated"` - Shows when authentication status is authenticated - logged in (user data might not be fully loaded yet)
- `"user-loaded"` - Shows when authentication status is user-loaded (user data is fully loaded and authenticated)

```javascript
// Use in Framer Overrides Code File
export function showForAuthenticated(Component) {
  return showForAuthStatus(Component, "authenticated");
}

export function showForAnonymous(Component) {
  return showForAuthStatus(Component, "anonymous");
}

export function showForPending(Component) {
  return showForAuthStatus(Component, "pending");
}

export function showForUserLoaded(Component) {
  return showForAuthStatus(Component, "user-loaded");
}
```

##### `toggleProperty(Component, options)`

Creates a toggle button for any custom property with comma-separated array support.

**Options:**

- `name` - Property name (supports dot notation, prefix "Account." for account custom properties)
- `value` - Value to toggle, supports a static value and "props.propertyName" (e.g. "props.slug") to use a component's prop value

```javascript
// Use in Framer Overrides Code File
export function toggleBookmark(Component) {
  return toggleProperty(Component, {
    name: "Bookmarks", // 🚨 Requires a person custom property with system name: Bookmarks
    value: "props.slug", // 🚨 The Framer component must have a `slug` property.
  });
}

export function toggleNewsletterPreference(Component) {
  return toggleProperty(Component, {
    name: "Preferences", // 🚨 Requires a person custom property with system name: Preferences
    value: "newsletter",
  });
}
```

##### `showForProperty(Component, options)`

Conditional visibility based on custom property comparison.

**Options:**

- `name` - Property name (supports dot notation, prefix "Account." for account custom properties)
- `value` - Value to compare, supports a static value and "props.propertyName" (e.g. "props.slug") to use a component's prop value
- `compare` - Comparison type: `"equal"`, `"equal-string"`, `"string-array-includes"`
- `flags` - Array of flags: `["ignore-case"]`

```javascript
// Use in Framer Overrides Code File

export function showForMembers_VIP(Component) {
  return showForProperty(Component, {
    name: "Account.CurrentSubscription.Plan.Name",
    value: "VIP",
    compare: "equal-string",
    flags: ["ignore-case"],
  });
}

export function showForLesson_Completed(Component) {
  return showForProperty(Component, {
    name: "CompletedLessons", // 🚨 Requires a person custom property with system name: CompletedLessons
    value: "props.slug", // 🚨 The Framer component must have a `slug` property.
    compare: "string-array-includes",
  });
}

export function showForMascot_Cat(Component) {
  return showForProperty(Component, {
    name: "Account.Mascot", // 🚨 Requires an account custom property with system name: Mascot
    value: "Cat",
    compare: "equal-string",
    flags: ["ignore-case"],
  });
}
```

##### `withProperty(Component, options)`

Sets component text to any custom property value.

**Options:**

- `name` - Property name (supports dot notation, prefix "Account." for account custom properties)

```javascript
// Use in Framer Overrides Code File
export function withFirstName(Component) {
  return withProperty(Component, { name: "FirstName" });
}

export function withAccountName(Component) {
  return withProperty(Component, { name: "Account.Name" });
}

export function coffeePreference(Component) {
  return withProperty(Component, {
    name: "CoffeePreference", // 🚨 Requires a person custom property with system name: CoffeePreference
  });
}

export function companyMascot(Component) {
  return withProperty(Component, {
    name: "Account.Mascot", // 🚨 Requires an account custom property with system name: Mascot
  });
}
```

##### `withImageProperty(Component, options)`

Sets component background image to any custom property containing an image URL.

**Options:**

- `name` - Property name (supports dot notation)

```javascript
// Use in Framer Overrides Code File
export function withAvatar(Component) {
  return withImageProperty(Component, { name: "MascotImageUrl" });
}

export function withAccountLogo(Component) {
  return withImageProperty(Component, { name: "Account.LogoUrl" });
}
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Development build with watch
npm run dev

# Type checking
npm run type-check
```

### Testing with Local Server

For testing the built files from external servers or applications:

```bash
# Build and start the local server
npm run serve

# Or manually build and serve
npm run build
node server.js
```

The setup provides:

- Express server serving the `dist` files with CORS headers
- Helpful endpoints:
  - `GET /` - Server info and available endpoints
  - `GET /api/files` - List all available files with usage examples
- CORS-enabled for external testing

**Example usage from external sites:**

```javascript
// Import from your local server
import {
  triggerAction,
  triggerPopup,
  withProperty,
} from "http://localhost:3000/framer/overrides.js";
```

**For public testing, use ngrok:**

```bash
# In another terminal, expose locally
ngrok http 3000

# Then use the ngrok URL in your imports
import { triggerAction, triggerPopup, withProperty } from "https://your-ngrok-url.ngrok-free.app/framer/overrides.js";
```

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Contributing

Contributions welcome. Submit pull requests for improvements.

## Support

- [GitHub Issues](https://github.com/outseta/framer-overrides/issues)
- [Outseta Documentation](https://docs.outseta.com)
- [Framer Community](https://www.framer.com/community)
