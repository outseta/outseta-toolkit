// File: Outseta.tsx
// All-in-one Outseta integration with all common functions
import {
  auth,
  embed,
  user,
  plans,
  addOns,
  bookmarks,
  lessons,
  utils,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.7/dist/framer/overrides.js";

//// AUTHENTICATION ////

// Component triggers logout (shows for authenticated users only)
export function auth_triggerLogout(Component): React.ComponentType {
  return auth.triggerLogout(Component);
}

// Component visible for anonymous users
export function auth_showForAnonymous(Component): React.ComponentType {
  return auth.showForAnonymous(Component);
}

// Component visible for authenticated users
export function auth_showForAuthenticated(Component): React.ComponentType {
  return auth.showForAuthenticated(Component);
}

// Selects `Anonymous` variant for anonymous users
// Selects `Authenticated` variant for authenticated users
export function auth_selectAuthStatusVariant(Component): React.ComponentType {
  return auth.selectAuthStatusVariant(Component);
}

// Selects primary variant for authenticated users
// Selects configured variant for non-authenticated users
export function auth_selectPrimaryVariantForAuthenticated(
  Component
): React.ComponentType {
  return auth.selectPrimaryVariantForAuthenticated(Component);
}

/// EMBED ////

// Component opens login embed as popup (shows for anonymous users only)
export function embed_popupLogin(Component): React.ComponentType {
  return embed.popupLoginEmbed(Component);
}

// Component opens registration embed as popup (shows for anonymous users only)
export function embed_popupRegister(Component): React.ComponentType {
  return embed.popupRegisterEmbed(Component);
}

// Component opens profile embed as popup (shows for authenticated users only)
export function embed_popupProfile(Component): React.ComponentType {
  return embed.popupProfileEmbed(Component);
}

//// USER DATA ////

// Display user's first name as component text
export function user_withFirstName(Component): React.ComponentType {
  return user.withFirstName(Component);
}

// Display user's last name as component text
export function user_withLastName(Component): React.ComponentType {
  return user.withLastName(Component);
}

// Display user's full name as component text
export function user_withFullName(Component): React.ComponentType {
  return user.withFullName(Component);
}

// Display user's email address as component text
export function user_withEmail(Component): React.ComponentType {
  return user.withEmail(Component);
}

// Display user's avatar/profile image as component image
// ℹ️ **NOTE:** Requires an image component
export function user_withAvatar(Component): React.ComponentType {
  return user.withAvatar(Component);
}

// Display account name as component text
export function user_withAccountName(Component): React.ComponentType {
  return user.withAccountName(Component);
}

//// PLANS ////

// Display current plan UID as component text
export function plans_withPlanUid(Component): React.ComponentType {
  return plans.withPlanUidAsText(Component);
}

// Selects `OW45KRmg` variant for authenticated users on the OW45KRmg plan
// Selects `amRjLEmJ` variant for authenticated users on the amRjLEmJ plan
// Selects primary variant for authenticated users when no variant match
export function plans_selectPlanUidVariant(Component): React.ComponentType {
  return plans.selectPlanUidVariant(Component);
}

/*
***********************************************************
** 🚨 REQUIRES: Customize the plan overrides below **
***********************************************************
To customize the plan overrides, change the examples below:
1. Change the plan denomination (e.g. `Gold`)
2. Change the plan UID to match your actual plan UID
3. Update your project to use the new override
Copy/paste and repeat for each plan needed.
*/

// Example for a "Gold" plan with UID "OW45KRmg":

// Component visible for authenticated users on the Gold plan
export function plans_showForGoldPlan(Component): React.ComponentType {
  return plans.showForPlan(Component, "OW45KRmg");
}

// Component visible for authenticated users not on the Gold plan
export function plans_showForNotGoldPlan(Component): React.ComponentType {
  return plans.showForNotPlan(Component, "OW45KRmg");
}

// Selects primary variant for authenticated users on the Gold plan
// Selects configured variant for authenticated users not on the Gold plan
export function plans_selectPrimaryVariantForGoldPlan(
  Component
): React.ComponentType {
  return plans.selectPrimaryVariantForPlan(Component, "OW45KRmg");
}

//// ADD-ONS ////

// Display current add-on UIDs (comma separated string) as component text
export function addOns_withAddOnUids(Component): React.ComponentType {
  return addOns.withAddOnUidsAsText(Component);
}

/*
***********************************************************
** 🚨 REQUIRES: Customize the add-on overrides below **
***********************************************************
To customize the add-on overrides, change the examples below:
1. Change the add-on denomination (e.g. `Boost`)
2. Change the add-on UID to match your actual add-on UID
3. Update your project to use the new override
Copy/paste and repeat for each add-on needed.
*/

// Example for a "Boost" add-on with UID "OW4pRYWg":

// Component visible for authenticated users with the Boost add-on
export function addOns_showForBoostAddOn(Component): React.ComponentType {
  return addOns.showForAddOn(Component, "OW4pRYWg");
}

// Component visible for authenticated users without the Boost add-on
export function addOns_showForNotBoostAddOn(Component): React.ComponentType {
  return addOns.showForNotAddOn(Component, "OW4pRYWg");
}

// Selects primary variant for authenticated users with the Boost add-on
// Selects configured variant for authenticated users without the Boost add-on
export function addOns_selectPrimaryVariantForBoostAddOn(
  Component
): React.ComponentType {
  return addOns.selectPrimaryVariantForAddOn(Component, "OW4pRYWg");
}

//// BOOKMARKS ////

/*
 ***********************************************************
 ** 🚨 **REQUIRES** a person custom property with system name: Bookmarks **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "Bookmarks"
 3. and the control type is "text"
 */

/**
 * ℹ️ **NOTE:** The following overrides require a `slug` property on the component
 */

// Component visible for authenticated users when item is bookmarked
export function bookmarks_showForBookmarked(Component): React.ComponentType {
  return bookmarks.showForBookmarked(Component);
}

// Toggle bookmark status
// Selects primary variant for authenticated users when item is bookmarked
// Selects configured variant for authenticated users when item is not bookmarked
export function bookmarks_toggleBookmarked(Component): React.ComponentType {
  return bookmarks.toggleBookmarked(Component);
}

// Selects variant `Empty State` when there are no bookmarks
// Selects primary variant when there are bookmarks
export function bookmarks_selectCollectionVariant(
  Component
): React.ComponentType {
  return bookmarks.selectBookmarkCollectionVariant(Component);
}

//// LESSONS ////

/*
 ***********************************************************
 ** 🚨 **REQUIRES** a person custom property with system name: LessonsCompleted **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "LessonsCompleted"
 3. and the control type is "text"
 */

/**
 * ℹ️ **NOTE:** The following overrides require a `slug` property on the component
 */

// Component visible for authenticated users when lesson is completed
export function lessons_showForCompleted(Component): React.ComponentType {
  return lessons.showForLessonCompleted(Component);
}

// Toggle lesson completion status
// Selects primary variant for authenticated users when lesson is completed
// Selects configured variant for authenticated users when lesson is not completed
export function lessons_toggleCompleted(Component): React.ComponentType {
  return lessons.toggleLessonCompleted(Component);
}

//// UTILS ////

// Automatically hides empty grid items
export function utils_dynamicGridHeight(Component): React.ComponentType {
  return utils.dynamicGridHeight(Component);
}
