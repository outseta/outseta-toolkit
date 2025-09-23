# Outseta Toolkit

A toolkit for integrating Outseta with Framer. Provides authentication state management, custom property display, and conditional visibility functions.

## Features

🔧 **Authentication Controls**: Show/hide content based on login status, trigger login/register/profile popups and logout action\
👤 **User Data Display**: Automatically populate components with user names, email, avatar, and account info\
💳 **Access Management**: Control component visibility based on subscription plans and add-ons\
🔖 **Bookmark System**: Ready-made bookmark functionality\
📚 **Lesson Tracking**: Ready-made lesson completion tracking and management\
📝 **Build Your Own**: Build overrides for any custom property, user and account properties\

## Getting Started

Choose your approach based on your project needs:

### Option 1: All-in-One Override File (Recommended)

The all-in-one override file provides all the most common Outseta integration functions in a single file.

Copy the code from **[Outseta.tsx](./readme/Outseta.tsx)** into a code file in your Framer project.

The file contains all of the functions listed in the Modular Overrides section below, prefixed with the module name for easy navigation in the override selector.

**Benefits:** Everything in one place, comprehensive functionality, single file to manage
**Downside:** The file is large and may be difficult to navigate

### Option 2: Modular Overrides

The modular overrides are a set of focused override files for specific functionality.

For each set of overrides, copy the following code into a code file in your Framer project:

- 🔧 **[OutsetaAuth.tsx](./readme/modular/OutsetaAuth.tsx)**
  - `showWhenAnonymous` - Component visible only for anonymous users
  - `showWhenAuthenticated` - Component visible only for authenticated users
  - `selectAuthStatusVariant` - Selects variants based on auth status
  - `triggerLogout` - Component triggers logout (shows for authenticated users only)
- 🚀 **[OutsetaEmbeds.tsx](./readme/modular/OutsetaEmbeds.tsx)**
  - `popupLoginEmbed` - Component opens login embed as popup
  - `popupRegisterEmbed` - Component opens registration embed as popup
  - `popupProfileEmbed` - Component opens profile embed as popup
- 👤 **[OutsetaUser.tsx](./readme/modular/OutsetaUser.tsx)**
  - `withFirstName` - Display user's first name as component text
  - `withLastName` - Display user's last name as component text
  - `withFullName` - Display user's full name as component text
  - `withEmail` - Display user's email address as component text
  - `withAvatar` - Display user's avatar/profile image as component image
  - `withAccountName` - Display account name as component text
- 💳 **[OutsetaPlans.tsx](./readme/modular/OutsetaPlans.tsx)**
  - `withPlanUid` - Display current plan UID as component text
  - `selectPlanUidVariant` - Selects variant based on plan UID
  - `showWhenPremiumPlan` - Component visible for users on specific plan (customizable)
  - `showWhenNotPremiumPlan` - Component visible for users not on specific plan (customizable)
  - `selectVariantForPremiumPlan` - Selects `Active` variant for users on the Premium plan, `Inactive` variant for users not on the Premium plan (customizable)
- 🔌 **[OutsetaAddOns.tsx](./readme/modular/OutsetaAddOns.tsx)**
  - `withAddOnUids` - Display current add-on UIDs as component text
  - `showWhenPowerUpAddOn` - Component visible for users with specific add-on (customizable)
  - `showWhenNotPowerUpAddOn` - Component visible for users without specific add-on (customizable)
  - `selectVariantForPowerUpAddOn` - Select `Active` variant for users with the PowerUp add-on, `Inactive` variant for users without the PowerUp add-on (customizable)
- 🔖 **[OutsetaBookmarks.tsx](./readme/modular/OutsetaBookmarks.tsx)**
  - 🚨 Requires a person custom property with system name: Bookmarks
  - `withBookmarks` - Display bookmarks as component text
  - `showWhenBookmarked` - Component visible if item is bookmarked
  - `showWhenNotBookmarked` - Component visible if item is not bookmarked
  - `toggleBookmarked` - Toggle bookmark status
  - `selectBookmarkedVariant` - Selects `Bookmarked` variant when the item is bookmarked, `NotBookmarked` variant when the item is not bookmarked
- 📚 **[OutsetaLessons.tsx](./readme/modular/OutsetaLessons.tsx)**
  - 🚨 Requires a person custom property with system name: LessonsCompleted
  - `withLessonsCompleted` - Display completed lessons as component text
  - `showWhenLessonCompleted` - Component visible if lesson is completed
  - `showWhenLessonNotCompleted` - Component visible if lesson is not completed
  - `toggleLessonCompleted` - Toggle lesson completion status
  - `selectLessonCompletedVariant` - Selects `Completed` variant when lesson is completed, `NotCompleted` variant when lesson is not completed

**Benefits:** Smaller files, easier to customize, only include what you need
**Downside:** Multiple files to manage and copy

## Create Your Own

For custom properties and advanced use cases, you may create your own overrides. Here are some examples:

```javascript
import { custom } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// EXAMPLES OF CUSTOM PROPERTIES ////

/*
 ***********************************************************
 ** 🚨 Remember to create an account custom property with system name: Mascot **
 ***********************************************************
 1. Go to CRM > Custom Properties > Account > Add Property
 2. Make sure the system name is "Mascot"
 3. and the control type is "text"
 */

// Display company mascot as component text
export function withCompanyMascot(Component): ComponentType {
  return custom.withTextProperty(Component, "Account.Mascot");
}

/*
 ***********************************************************
 ** 🚨 Remember to create a person custom property with system name: CoffeePreference **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "CoffeePreference"
 3. and the control type is "text"
 */

// Component visible when coffee preference is Espresso
export function showWhenCoffeePreference_Espresso(Component): ComponentType {
  return custom.showWhenProperty(Component, "CoffeePreference", {
    value: "Espresso",
    compare: "equal",
    flags: ["ignore-case"],
  });
}

/*
 ***********************************************************
 ** 🚨 Remember to create a person custom property with system name: Skills **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "Skills"
 3. and the control type is "select"
 4. Add the following options: `JavaScript`, `Design`, `Marketing`
 */

// Toggle skill tag
// Selects variant `Active` when slug is present in skills
// Selects variant `Inactive` when slug is not present in skills
// ℹ️ Requires a `slug` property on the component
export function toggleSkillTag(Component): ComponentType {
  return custom.toggleProperty(Component, "Skills", {
    value: "props.slug", // e.g. one of: `JavaScript`, `Design`, `Marketing`
  });
}

/*
 ***********************************************************
 ** 🚨 Remember to create a person custom property with system name: WatchLater **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "WatchLater"
 3. and the control type is "text"
 */

// Selects variant `OnWatchLaterList` when slug is present in watch later
// Selects variant `NotOnWatchLaterList` when slug is not present in watch later
// ℹ️ Requires a `slug` property on the component
export function selectVariantFromWatchLaterStatus(Component): ComponentType {
  return custom.selectVariantForProperty(Component, "WatchLater", {
    value: "props.slug", // e.g. one of: `video1`, `video2`, `video3` etc.
    compare: "includes",
    activeVariant: "OnWatchLaterList",
    inactiveVariant: "NotOnWatchLaterList",
  });
}
```

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Contributing

Contributions welcome. View the [contributing guide](./CONTRIBUTING.md) for more information.

## Support

- [GitHub Issues](https://github.com/outseta/framer-overrides/issues)
- [Outseta Documentation](https://docs.outseta.com)
- [Framer Community](https://www.framer.com/community)
