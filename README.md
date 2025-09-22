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

//// AUTHENTICATION ////

// Opens login embed as popup (shows for anonymous users only)
export function popupLoginEmbed(Component): ComponentType {
  return auth.popupLoginEmbed(Component);
}

// Opens registration embed as popup (shows for anonymous users only)
export function popupRegisterEmbed(Component): ComponentType {
  return auth.popupRegisterEmbed(Component);
}

// Opens profile embed as popup (shows for authenticated users only)
export function popupProfileEmbed(Component): ComponentType {
  return auth.popupProfileEmbed(Component);
}

// Triggers logout action (shows for authenticated users only)
export function logout(Component): ComponentType {
  return auth.logout(Component);
}

// Show component only for anonymous users
export function showWhenAnonymous(Component): ComponentType {
  return auth.showWhenAnonymous(Component);
}

// Show component only for authenticated users
export function showWhenAuthenticated(Component): ComponentType {
  return auth.showWhenAuthenticated(Component);
}

// Set component variant based on authentication status
// ℹ️ The Framer component must have the variants: `Anonymous` and `Authenticated`
export function variantFromAuthStatus(Component): ComponentType {
  return auth.variantFromAuthStatus(Component);
}

//// USER DATA ////

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
// ℹ️ Requires an image component
export function withAvatar(Component): ComponentType {
  return user.withAvatar(Component);
}

// Display account name
export function withAccountName(Component): ComponentType {
  return user.withAccountName(Component);
}

//// PLANS ////

// Display current plan UID
export function withPlanUid(Component): ComponentType {
  return plans.withPlanUid(Component);
}

// Selects `OW45KRmg`variant for a user on the OW45KRmg plan
// Selects `amRjLEmJ` variant for a user on the amRjLEmJ plan
// If variant not found, the component will use the premium variant
export function variantFromPlanUid(Component): ComponentType {
  return plans.variantFromPlanUid(Component);
}

/*
***********************************************************
** 🚨 Remember to customize the plan overrides! **
***********************************************************
To customize the plan overrides, change the examples below:
1. Change the plan denomination (e.g. `Premium`)
2. Change the plan UID to match the plan denomination
3. Update your project to use the new override
Copy/paste and repeat for each plan needed.
*/

// Example for a "Premium" plan with UID "OW45KRmg":

// Show component for users on the Premium plan
export function showWhenPlan_Premium(Component): ComponentType {
  return plans.showWhenPlan(Component, "OW45KRmg");
}

// Show component for users not on the Premium plan
export function showWhenNotPlan_Premium(Component): ComponentType {
  return plans.showWhenNotPlan(Component, "OW45KRmg");
}

// Select variant `Active` for users on the Premium plan
// Select variant `Inactive` for users not on the Premium plan
// ℹ️ Requires `Active`, `Inactive` component variants
export function variantWhenPlan_Premium(Component): ComponentType {
  return plans.variantWhenPlan(Component, "OW45KRmg");
}

//// ADD-ONS ////

// Display current add-on UIDs as comma seperated string
export function withAddOnUids(Component): ComponentType {
  return addOns.withAddOnUids(Component);
}

/*
***********************************************************
** 🚨 Remember to customize the add-on overrides! **
***********************************************************
To customize the add-on overrides, change the examples below:
1. Change the add-on denomination (e.g. `PowerUp`)
2. Change the add-on UID to match the add-on denomination
3. Update your project to use the new override
🔁 Copy/paste and repeat for each add-on needed.
*/

// Example for a "PowerUp" add-on with UID "OW4pRYWg":

// Show component for users with the PowerUp add-on
export function showWhenAddOn_PowerUp(Component): ComponentType {
  return addOns.showWhenAddOn(Component, "OW4pRYWg");
}

// Show component for users without the PowerUp add-on
export function showWhenNotAddOn_PowerUp(Component): ComponentType {
  return addOns.showWhenNotAddOn(Component, "OW4pRYWg");
}

// Select variant `Active` for users with the PowerUp add-on
// Select variant `Inactive` for users without the PowerUp add-on
// ℹ️ Requires `Active` and `Inactive` component variants
export function variantWhenAddOn_PowerUp(Component): ComponentType {
  return addOns.variantFromAddOnStatus(Component, "OW4pRYWg");
}

//// BOOKMARKS ////

/*
 ***********************************************************
 ** 🚨 Remember to create a person custom property with system name: Bookmarks **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "Bookmarks"
 3. and the control type is "text"
 */

// Display bookmarks as comma-separated list
export function withBookmarks(Component): ComponentType {
  return bookmarks.withBookmarksAsText(Component);
}

/**
 *  ℹ️ The following overrides require a `slug` property on the component
 */

// Show component if item is bookmarked
export function showWhenBookmarked(Component): ComponentType {
  return bookmarks.showWhenBookmarked(Component);
}

// Show component if item is not bookmarked
export function showWhenNotBookmarked(Component): ComponentType {
  return bookmarks.showWhenNotBookmarked(Component);
}

// Toggle bookmark status
export function toggleBookmarked(Component): ComponentType {
  return bookmarks.toggleBookmarked(Component);
}

// Select variant `Bookmarked` when item is bookmarked
// Select variant `NotBookmarked` when item is not bookmarked
export function variantFromBookmarkStatus(Component): ComponentType {
  return bookmarks.variantFromBookmarkStatus(Component);
}

//// LESSONS ////

/*
 ***********************************************************
 ** 🚨 Remember to create a person custom property with system name: LessonsCompleted **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "LessonsCompleted"
 3. and the control type is "text"
 */

// Display completed lessons as comma-separated list
export function withLessonsCompleted(Component): ComponentType {
  return lessons.withLessonsCompletedAsText(Component);
}

/**
 *  ℹ️ The following overrides require a `slug` property on the component
 */

// Show component if lesson is completed
export function showWhenLessonCompleted(Component): ComponentType {
  return lessons.showWhenLessonCompleted(Component);
}

// Show component if lesson is not completed
export function showWhenLessonNotCompleted(Component): ComponentType {
  return lessons.showWhenLessonNotCompleted(Component);
}

// Toggle lesson completion status
// Select variant `Completed` when lesson is completed
// Select variant `NotCompleted` when lesson is not completed
export function toggleLessonCompletion(Component): ComponentType {
  return lessons.toggleLessonCompletion(Component);
}

// Select variant `Completed` when lesson is completed
// Select variant `NotCompleted` when lesson is not completed
export function variantFromLessonCompletionStatus(Component): ComponentType {
  return lessons.variantFromLessonCompletionStatus(Component);
}
```

## Create Your Own

For custom properties and advanced use cases, use the `custom` module:

```javascript
import { custom } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// EXAMPLES OF CUSTOM PROPERTIES ////

/*
 ***********************************************************
 ** 🚨 Remember to create an account custom property with system name: Account.Mascot **
 ***********************************************************
// 1. Go to CRM > Custom Properties > Account > Add Property
// 2. Make sure the system name is "Mascot"
// 3. and the control type is "text"
// 4. Click "Add"
 */

// Display company mascot
export function withCompanyMascot(Component): ComponentType {
  return custom.withTextProperty(Component, "Account.Mascot");
}

/*
 ***********************************************************
 ** 🚨 Remember to create a person custom property with system name: CoffeePreference **
 ***********************************************************
// 1. Go to CRM > Custom Properties > Person > Add Property
// 2. Make sure the system name is "CoffeePreference"
// 3. and the control type is "text"
 */

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
// 1. Go to CRM > Custom Properties > Person > Add Property
// 2. Make sure the system name is "Skills"
// 3. and the control type is "select"
// 4. Add the following options: `JavaScript`, `Design`, `Marketing`
 */

// Toggle skill tag
// Select variant `Active` when slug is present in skills
// Select variant `Inactive` when slug is not present in skills
// ℹ️ Requires a `slug` property on the component
export function toggleSkillTag(Component): ComponentType {
  return custom.toggleProperty(Component, "Skills", {
    value: "props.slug",
  });
}

/*
 ***********************************************************
 ** 🚨 Remember to create a person custom property with system name: WatchLater **
 ***********************************************************
// 1. Go to CRM > Custom Properties > Person > Add Property
// 2. Make sure the system name is "WatchLater"
// 3. and the control type is "text"
 */

// Select variant `OnWatchLaterList` when slug is present in watch later
// Select variant `NotOnWatchLaterList` when slug is not present in watch later
// ℹ️ Requires a `slug` property on the component
export function variantFromWatchLaterStatus(Component): ComponentType {
  return custom.variantWhenProperty(Component, "WatchLater", {
    value: "props.slug", // e.g., one of the following: `video1`, `video2`, `video3` etc.
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
