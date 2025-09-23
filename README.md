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

### Option 1: Modular Overrides (Recommended)

The modulear overrides are a set of focused override files for specific functionality.

For each set of overrides, copy the following code into a code file in your Framer project with the same name:

- 🔧 **[OutsetaAuth.tsx](./readme/OutsetaAuth.tsx)** - Authentication controls and login flows
- 👤 **[OutsetaUser.tsx](./readme/OutsetaUser.tsx)** - User data display functions
- 💳 **[OutsetaPlans.tsx](./readme/OutsetaPlans.tsx)** - Subscription plan management
- 🔌 **[OutsetaAddOns.tsx](./readme/OutsetaAddOns.tsx)** - Add-on management
- 🔖 **[OutsetaBookmarks.tsx](./readme/OutsetaBookmarks.tsx)** - Ready-made bookmark system
- 📚 **[OutsetaLessons.tsx](./readme/OutsetaLessons.tsx)** - Lesson completion tracking
- 📝 **[OutsetaCustom.tsx](./readme/OutsetaCustom.tsx)** - Custom property examples

**Benefits:** Smaller files, easier to customize, only include what you need
**Downside:** You need to copy and paste the code for each set of overrides

### Option 2: All-in-One Override File

The all-in-one override file is a single file that provides all the most common Outseta integration functions in a single file.

Copy the code from **[Outseta.tsx](./templates/Outseta.tsx)** that provides all the most common Outseta integration functions in a single file.

**Benefits:** Everything in one place, comprehensive functionality
**Downside:** The file is large and may be difficult to navigate

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
export function variantFromWatchLaterStatus(Component): ComponentType {
  return custom.variantForProperty(Component, "WatchLater", {
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
