# Outseta Toolkit

A toolkit for integrating Outseta with Framer. Provides authentication state management, custom property display, and conditional visibility functions.

## Features

🔧 **Authentication Controls**: Show/hide content based on login status, trigger login/register/profile popups and logout action\
👤 **User Data Display**: Automatically populate components with user names, email, avatar, and account info\
💳 **Access Management**: Control component visibility based on subscription plans and add-ons\
🔖 **Bookmark System**: Ready-made bookmark functionality\
📚 **Lesson Tracking**: Ready-made lesson completion tracking and management\
📝 **Build Your Own**: Build overrides for any custom property, user and account properties\

## Quick Start

Copy/paste the following code into a code file in your Framer project named `Outseta.tsx`. This single file provides all the most common Outseta integration functions.

```javascript
// File: Outseta.tsx
import { type ComponentType } from "react";
import {
  auth,
  user,
  plans,
  addOns,
  custom,
  bookmarks,
  lessons,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//////
// 🔧 Authentication
//////

// Trigger login popup (shows for anonymous users only)
export function popupLoginEmbed(Component): ComponentType {
  return auth.popupLoginEmbed(Component);
}

// Trigger registration popup (shows for anonymous users only)
export function popupRegisterEmbed(Component): ComponentType {
  return auth.popupRegisterEmbed(Component);
}

// Trigger profile popup (shows for authenticated users only)
export function popupProfileEmbed(Component): ComponentType {
  return auth.popupProfileEmbed(Component);
}

// Trigger logout action (shows for authenticated users only)
export function logout(Component): ComponentType {
  return auth.logout(Component);
}

// Show component only for anonymous users
export function showForAnonymous(Component): ComponentType {
  return auth.showForAnonymous(Component);
}

// Show component only for authenticated users
export function showForAuthenticated(Component): ComponentType {
  return auth.showForAuthenticated(Component);
}

// Set component variant based on authentication status
// ℹ️ The Framer component must have `Anonymous`, `Authenticated`, optionally a `Pending` variant
export function variantForAuthStatus(Component): ComponentType {
  return auth.variantForAuthStatus(Component);
}

//////
// 🔧 User Data
//////

// Display user's first name
export function withFirstName(Component): ComponentType {
  return user.withFirstName(Component);
}

// Display user's last name
export function withLastName(Component): ComponentType {
  return user.withLastName(Component);
}

// Display user's full name
export function withFullName(Component): ComponentType {
  return user.withFullName(Component);
}

// Display user's email address
export function withEmail(Component): ComponentType {
  return user.withEmail(Component);
}

// Display user's avatar/profile image
export function withAvatar(Component): ComponentType {
  return user.withAvatar(Component);
}

// Display account name
export function withAccountName(Component): ComponentType {
  return user.withAccountName(Component);
}

//////
// 🔧 Plan features
//////

// Display current plan UID
export function withPlanUid(Component): ComponentType {
  return plans.withPlanUid(Component);
}

// Set component variant to the current plan UID
// ℹ️ Requires variants with the same name as your plan UIDs (e.g. `OW45KRmg`, `amRjLEmJ`)
export function variantForPlanUid(Component): ComponentType {
  return plans.variantForPlanUid(Component);
}

// 🚨 Replace the UID below with your actual plan UID

// Show component for specific plan
export function showForPlan_OW45KRmg(Component): ComponentType {
  return plans.showForPlan(Component, "OW45KRmg");
}

// Hide component for specific plan
export function showForForNotPlan_OW45KRmg(Component): ComponentType {
  return plans.showForNotPlan(Component, "OW45KRmg");
}

// Set variant based on plan
// ℹ️ Requires `WithPlan`, `WithoutPlan` component variants
export function variantForPlan_OW45KRmg(Component): ComponentType {
  return plans.variantForPlan(Component, "OW45KRmg");
}

//////
// 🔧 Add-Ons
//////

// Display current add-on UIDs as comma seperated string
export function withAddOnUids(Component): ComponentType {
  return addOns.withAddOnUids(Component);
}

// 🚨 Replace the UID below with your actual add-on UID
// and repeat for each add-on in use

// Show component for specific add-on
export function showForAddOn_OW4pRYWg(Component): ComponentType {
  return addOns.showForAddOn(Component, "OW4pRYWg");
}

// Hide component for specific add-on
export function showForNotAddOn_OW4pRYWg(Component): ComponentType {
  return addOns.showForNotAddOn(Component, "OW4pRYWg");
}

// Set variant based on add-on
// ℹ️ Requires `WithAddOn`, `WithoutAddOn` component variants
export function variantForAddOn_OW4pRYWg(Component): ComponentType {
  return addOns.variantForAddOn(Component, "OW4pRYWg");
}

//////
// 🔧 Bookmarks
// 🚨 Requires a person custom text property with system name: Bookmarks
// ℹ️ Bookmarks is a comma-separated list of item slugs (e.g. `item1,item2,item3`)
//////

// Display bookmarks as comma-separated list
export function withBookmarks(Component): ComponentType {
  return bookmarks.withBookmarks(Component);
}

// Show component if item is bookmarked
// ℹ️ Requires a `slug` property on the component
export function showForBookmarked(Component): ComponentType {
  return bookmarks.showForBookmarked(Component);
}

// Toggle bookmark status
// ℹ️ Requires a `slug` property on the component
export function toggleBookmarked(Component): ComponentType {
  return bookmarks.toggleBookmarked(Component);
}

// Set variant based on bookmark status
// ℹ️ Requires `Bookmarked` and `NotBookmarked` component variants
export function variantForBookmarked(Component): ComponentType {
  return bookmarks.variantForBookmarked(Component);
}

//////
// 🔧 Lessons (Optional)
// 🚨 Requires a person custom property with system name: LessonsCompleted
// ℹ️ Property should contain a comma-separated list of lesson slugs
//////

// Display completed lessons as comma-separated list
export function withLessonsCompleted(Component): ComponentType {
  return lessons.withLessonsCompleted(Component);
}

// Show component if lesson is completed
// ℹ️ Requires a `slug` property on the component
export function showForLessonCompleted(Component): ComponentType {
  return lessons.showForLessonCompleted(Component);
}

// Toggle lesson completion status
// ℹ️ Requires a `slug` property on the component
export function toggleLessonCompletion(Component): ComponentType {
  return lessons.toggleLessonCompletion(Component);
}

// Set variant based on lesson completion
// ℹ️ Requires `Completed` and `NotCompleted` component variants
export function variantForLessonCompletion(Component): ComponentType {
  return lessons.variantForLessonCompletion(Component);
}
```

ℹ️ **NOTE:** Replace the placeholder UIDs (`OW45KRmg`, `OW4pRYWg`) with your actual plan and add-on UIDs from your Outseta dashboard.

## Create Your Own

For custom properties and advanced use cases, use the `custom` module:

```javascript
import { custom } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//////
// 🔧 Examples of custom property usage
//////

// Display company mascot
// 🚨 Requires a account custom text property with system name: Account.Mascot
export function withCompanyMascot(Component): ComponentType {
  return custom.withTextProperty(Component, "Account.Mascot");
}

// Show component based on custom property value
// 🚨 Requires a person custom text property with system name: CoffeePreference
export function showForCoffeePreference_Espresso(Component): ComponentType {
  return custom.showForPropertyMatch(Component, "CoffeePreference", {
    value: "Espresso",
    compare: "equal",
    flags: ["ignore-case"],
  });
}

// Toggle skill tag
// 🚨 Requires a person custom property with system name: Skills
// ℹ️ Skills is a checkbox property with possible values: `JavaScript`, `Design`, `Marketing`
// ℹ️ Requires a `slug` property on the component and a `HasSkill` and `Default` component variants
export function toggleSkillTag(Component): ComponentType {
  return custom.toggleProperty(Component, "Skills", {
    value: "props.slug", // e.g., one of the following: `JavaScript`, `Design`, `Marketing`
    matchVariant: "HasSkill",
    noMatchVariant: "Default",
  });
}

// Toggle watch later status
// 🚨 Requires a person custom property with system name: WatchLater
// ℹ️ WatchLater is a comma-separated list of item slugs (e.g. `video1,video2,video3` etc.)
// ℹ️ Requires a `slug` property on the component and a `Match` and `NoMatch` component variants
export function toggleWatchLater(Component): ComponentType {
  return custom.toggleProperty(Component, "WatchLater", {
    value: "props.slug", // e.g., one of the following: `video1`, `video2`, `video3` etc.
  });
}
```

## API Reference

### Core Modules

The toolkit exports modules for different functionality areas:

```javascript
import {
  auth, // Authentication triggers and status
  user, // User property display
  plans, // Plan-based visibility
  addOns, // Add-on based visibility
  custom, // Custom property operations
  bookmarks, // Ready-made bookmark functionality
  lessons, // Ready-made lesson functionality
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";
```

### Authentication Module (`auth`)

##### `auth.popupLoginEmbed(Component)`

Converts component into login popup trigger (shows for anonymous users only).

##### `auth.popupRegisterEmbed(Component)`

Converts component into registration popup trigger (shows for anonymous users only).

##### `auth.popupProfileEmbed(Component)`

Converts component into profile popup trigger (shows for authenticated users only).

##### `auth.logout(Component)`

Converts component into logout action trigger (shows for authenticated users only).

##### `auth.showForAnonymous(Component)`

Shows component only for anonymous users.

##### `auth.showForAuthenticated(Component)`

Shows component only for authenticated users.

##### `auth.showForAuthStatus(Component, status)`

Shows component based on specific auth status: `"pending"`, `"anonymous"`, `"authenticated"`.

##### `auth.variantForAuthStatus(Component)`

Sets component variant based on current authentication status.

### User Module (`user`)

##### `user.withFirstName(Component)`

Sets component text to user's first name.

##### `user.withLastName(Component)`

Sets component text to user's last name.

##### `user.withFullName(Component)`

Sets component text to user's full name.

##### `user.withEmail(Component)`

Sets component text to user's email address.

##### `user.withAvatar(Component)`

Sets component background image to user's profile image.

##### `user.withAccountName(Component)`

Sets component text to account name.

### Plans Module (`plans`)

##### `plans.showForPlan(Component, planUid)`

Shows component only for users with specific plan.

##### `plans.hideForPlan(Component, planUid)`

Hides component for users with specific plan.

##### `plans.variantForPlan(Component, planUid)`

Sets component variant based on plan.

### Add-Ons Module (`addOns`)

##### `addOns.showForAddOn(Component, addOnUid)`

Shows component only for users with specific add-on.

##### `addOns.hideForAddOn(Component, addOnUid)`

Hides component for users with specific add-on.

##### `addOns.variantForAddOn(Component, addOnUid)`

Sets component variant based on add-on.

### Custom Properties Module (`custom`)

##### `custom.withTextProperty(Component, propertyName)`

Sets component text to any property value.

##### `custom.withImageProperty(Component, propertyName)`

Sets component background image to property containing image URL.

##### `custom.showForPropertyMatch(Component, propertyName, options)`

Shows component based on property comparison.

**Options:**

- `value` - Value to compare (supports `"props.propertyName"`)
- `compare` - Comparison type: `"equal"`, `"includes"`
- `flags` - Array of flags: `["ignore-case"]`

##### `custom.showForNotPropertyMatch(Component, propertyName, options)`

Hides component based on property comparison.

##### `custom.toggleProperty(Component, propertyName, options)`

Creates toggle button for property with array support.

**Options:**

- `value` - Value to toggle (supports `"props.propertyName"`)
- `matchVariant` - Variant name when match found
- `noMatchVariant` - Variant name when no match

##### `custom.variantForPropertyMatch(Component, propertyName, options)`

Sets component variant based on property comparison.

**Options:**

- `value` - Value to compare
- `compare` - Comparison type: `"equal"`, `"includes"`
- `matchVariant` - Variant name when match found
- `noMatchVariant` - Variant name when no match
- `flags` - Array of flags: `["ignore-case"]`

### Bookmarks Module (`bookmarks`)

🚨 **REQUIRES** a person custom property with system name: `Bookmarks`

##### `bookmarks.withBookmarks(Component)`

Displays bookmarks as comma-separated list.

##### `bookmarks.showForBookmarked(Component)`

Shows component if item is bookmarked (requires `slug` prop).

##### `bookmarks.toggleBookmarked(Component)`

Toggles bookmark status (requires `slug` prop).

##### `bookmarks.variantForBookmarked(Component)`

Sets variant based on bookmark status (requires `Bookmarked`/`NotBookmarked` variants).

### Lessons Module (`lessons`)

🚨 **REQUIRES** a person custom property with system name: `LessonsCompleted`

##### `lessons.withLessonsCompleted(Component)`

Displays completed lessons as comma-separated list.

##### `lessons.showForLessonCompleted(Component)`

Shows component if lesson is completed (requires `slug` prop).

##### `lessons.toggleLessonCompletion(Component)`

Toggles lesson completion status (requires `slug` prop).

##### `lessons.variantForLessonCompletion(Component)`

Sets variant based on lesson completion (requires `Completed`/`NotCompleted` variants).

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
