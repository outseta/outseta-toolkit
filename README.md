# Outseta Toolkit

A toolkit for integrating Outseta with visual website builders like Framer and Webflow.

Currently only provides Framer override functions for authentication, custom property display, and conditional visibility.

## Features

🔧 **Framer Overrides**: Functions for authentication, visibility, and dynamic content
📦 **CDN/ESM Support**: Direct imports from CDN or npm
📝 **TypeScript**: Full type definitions included
❗ **Error Handling**: Optimistic updates with automatic rollback
🔄 **Event Integration**: Automatic sync with Outseta events
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
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@latest/dist/framer/overrides.js";
```

## Quick Start

Provides override functions for integrating Outseta authentication and custom properties with Framer components. Handles authentication flows, conditional visibility, and dynamic content.

### Basic Framer Overrides

Copy/paste the following code into a code file in your Framer project named `Outseta.tsx`.

```javascript
// File: Outseta.tsx
import { type ComponentType } from "react";
import {
  withProperty,
  withImageProperty,
  showForAuthStatus,
  showForProperty,
  triggerPopup,
  triggerAction,
  toggleProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@latest/dist/framer/overrides.js";

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
  return withUserProperty(Component, { name: "FirstName" });
}

export function withLastName(Component): ComponentType {
  return withUserProperty(Component, { name: "LastName" });
}

export function withFullName(Component): ComponentType {
  return withUserProperty(Component, { name: "FullName" });
}

export function withEmail(Component): ComponentType {
  return withUserProperty(Component, { name: "Email" });
}

export function withAvatar(Component): ComponentType {
  return withImageProperty(Component, { name: "ProfileImageS3Url" });
}

// Account property display
export function withAccountName(Component): ComponentType {
  return withUserProperty(Component, { name: "Account.Name" });
}
```

### Plan/Add-On Overrides

Copy/paste the following code into a code file in your Framer project named `OutsetaPlans.tsx`.

ℹ️ **NOTE:** Remember to replace the plan uids and names with your own, and duplicate the code for additional plan uids and names.

```javascript
// File: OutsetaPlans.tsx
import { type ComponentType } from "react";
import {
  showForUserProperty,
  showForPayloadProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@latest/dist/framer/overrides.js";

////
// Payload versions, faster than the user property version but will not update in real-time.
// The only option atm for add-ons.
///

// 🚨 Replace OW45KRmg with your plan uid, and duplicate for additional plan uids
export function showForPlanInPayload_OW45KRmg(Component): ComponentType {
  return showForPayloadProperty(Component, {
    name: "outseta:planUid",
    value: "OW45KRmg",
    compare: "equal-string", // Compare as string
  });
}

// 🚨 Replace OW4pRYWg with your plan uid, and duplicate for additional plan uids
export function showForAddOnInPayload_OW4pRYWg(Component): ComponentType {
  return showForPayloadProperty(Component, {
    name: "outseta:addOnUids",
    value: "OW4pRYWg",
    compare: "array-includes", // Compare as array
  });
}

///
// User property versions, slower initial load than the payload version but will update in real-time.
///

// 🚨 Replace OW45KRmg with your plan uid, and duplicate for additional plan uids
export function showForPlan_OW45KRmg(Component): ComponentType {
  return showForUserProperty(Component, {
    name: "Account.CurrentSubscription.Plan.Uid",
    value: "OW45KRmg",
    compare: "equal-string", // Compare as string
  });
}

// 🚨 Replace Basic with your plan name, and duplicate for additional plan names
export function showForPlan_Pro(Component): ComponentType {
  return showForUserProperty(Component, {
    name: "Account.CurrentSubscription.Plan.Name",
    value: "Pro",
    compare: "equal-string", // Compare as string
    flags: ["ignore-case"], // Ignore case when comparing names
  });
}
```

### Ready to use **Completed Lessons** Overrides

Copy/paste the following code into a code file in your Framer project named `OutsetaCompletedLessons.tsx`.

ℹ️ **NOTE:** The `CompletedLessons` custom property is required to be configured Outseta for this to work.

```javascript
// File: OutsetaCompletedLessons.tsx
import { type ComponentType } from "react";
import {
  withUserProperty,
  showForUserProperty,
  toggleUserProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@latest/dist/framer/overrides.js";

//////
// 🚨 Requires a person custom property with system name: CompletedLessons
//////

// Display the completed lessons as a comma-separated list
export function withCompletedLessons(Component): ComponentType {
  return withUserProperty(Component, { name: "CompletedLessons" });
}

// Show the component if the lesson is completed
// 🚨 The Framer component must have a `slug` property.
export function showForLessonCompleted(Component): ComponentType {
  return showForUserProperty(Component, {
    name: "CompletedLessons",
    value: "props.slug",
    compare: "string-array-includes",
  });
}

// Toggle the lesson as completed
// 🚨 The Framer component must have a `slug` property.
export function toggleCompletedLesson(Component): ComponentType {
  return toggleUserProperty(Component, {
    name: "CompletedLessons",
    value: "props.slug",
  });
}
```

### Ready to use **Bookmark** Overrides

Copy/paste the following code into a code file in your Framer project named `OutsetaBookmarks.tsx`.

ℹ️ **NOTE:** The `Bookmarks` custom property is required to be configured Outseta for this to work.

```javascript
// File: OutsetaBookmarks.tsx
import { type ComponentType } from "react";
import {
  withUserProperty,
  showForProperty,
  toggleProperty,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@latest/dist/framer/overrides.js";

//////
// 🚨 Requires a person custom property with system name: Bookmarks
//////

// Display the bookmarks as a comma-separated list
export function withBookmarks(Component): ComponentType {
  return withUserProperty(Component, { name: "Bookmarks" });
}

// Show the component if the bookmark is in the list
// 🚨 The Framer component must have a `slug` property.
export function showForBookmark(Component): ComponentType {
  return showForUserProperty(Component, {
    name: "Bookmarks",
    value: "props.slug",
    compare: "string-array-includes",
  });
}

// Toggle the bookmark
// 🚨 The Framer component must have a `slug` property.
export function toggleBookmark(Component): ComponentType {
  return toggleUserProperty(Component, {
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
- `"authenticated"` - Shows when authentication status is authenticated (user might not be loaded yet)
- `"anonymous"` - Shows when authentication status is anonymous

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
```

##### `toggleUserProperty(Component, options)`

Creates a toggle button for any custom property with comma-separated array support.

**Options:**

- `name` - Property name (use Account.Bookmarks for account custom properties)
- `value` - Value to toggle, either a value or "props.propertyName" (e.g. "props.slug") to use the component's "props.propertyName" value

```javascript
// Use in Framer Overrides Code File
export function toggleBookmark(Component) {
  return toggleUserProperty(Component, {
    name: "Bookmarks", // 🚨 Requires a person custom property with system name: Bookmarks
    value: "props.slug",
  });
}

export function toggleNewsletterPreference(Component) {
  return toggleUserProperty(Component, {
    name: "Preferences", // 🚨 Requires a person custom property with system name: Preferences
    value: "newsletter",
  });
}
```

##### `showForUserProperty(Component, options)`

Conditional visibility based on custom property comparison.

**Options:**

- `name` - Property name (supports dot notation)
- `value` - Value to compare (supports "props.propertyName")
- `compare` - Comparison type: `"equal"`, `"equal-string"`, `"string-array-includes"`
- `flags` - Array of flags: `["ignore-case"]`

```javascript
// Use in Framer Overrides Code File

export function showForVIPMembers(Component) {
  return showForUserProperty(Component, {
    name: "Account.CurrentSubscription.Plan.Name",
    value: "VIP",
    compare: "equal-string",
    flags: ["ignore-case"],
  });
}

export function showForLessonCompleted(Component) {
  return showForUserProperty(Component, {
    name: "CompletedLessons", // 🚨 Requires a person custom property with system name: CompletedLessons
    value: "props.slug",
    compare: "string-array-includes",
  });
}

export function showForCatMascot(Component) {
  return showForUserProperty(Component, {
    name: "Account.Mascot", // 🚨 Requires an account custom property with system name: Mascot
    value: "Cat",
    compare: "equal-string",
    flags: ["ignore-case"],
  });
}
```

##### `withUserProperty(Component, options)`

Sets component text to any custom property value.

**Options:**

- `name` - Property name (supports dot notation)

```javascript
// Use in Framer Overrides Code File
export function withFirstName(Component) {
  return withUserProperty(Component, { name: "FirstName" });
}

export function withAccountName(Component) {
  return withUserProperty(Component, { name: "Account.Name" });
}

export function coffeePreference(Component) {
  return withUserProperty(Component, {
    name: "CoffeePreference", // 🚨 Requires a person custom property with system name: CoffeePreference
  });
}

export function companyMascot(Component) {
  return withUserProperty(Component, {
    name: "Account.Mascot", // 🚨 Requires an account custom property with system name: Mascot
  });
}
```

##### `withUserImageProperty(Component, options)`

Sets component background image to any custom property containing an image URL.

**Options:**

- `name` - Property name (supports dot notation)

```javascript
// Use in Framer Overrides Code File
export function withAvatar(Component) {
  return withUserImageProperty(Component, { name: "MascotImageUrl" });
}

export function withAccountLogo(Component) {
  return withUserImageProperty(Component, { name: "Account.LogoUrl" });
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
  withUserProperty,
} from "http://localhost:3000/framer/overrides.js";
```

**For public testing, use ngrok:**

```bash
# In another terminal, expose locally
ngrok http 3000

# Then use the ngrok URL in your imports
import { triggerAction, triggerPopup, withUserProperty } from "https://your-ngrok-url.ngrok-free.app/framer/overrides.js";
```

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Contributing

Contributions welcome. Submit pull requests for improvements.

## Support

- [GitHub Issues](https://github.com/outseta/framer-overrides/issues)
- [Outseta Documentation](https://docs.outseta.com)
- [Framer Community](https://www.framer.com/community)
