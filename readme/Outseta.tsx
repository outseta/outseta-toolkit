// File: Outseta.tsx
// All-in-one Outseta integration with all common functions
import { type ComponentType } from "react";
import {
  auth,
  embed,
  user,
  plans,
  addOns,
  bookmarks,
  lessons,
} from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// AUTHENTICATION ////

// Component triggers logout (shows for authenticated users only)
export function auth_triggerLogout(Component): ComponentType {
  return auth.triggerLogout(Component);
}

// Component visible only for anonymous users
export function auth_showWhenAnonymous(Component): ComponentType {
  return auth.showWhenAnonymous(Component);
}

// Component visible only for authenticated users
export function auth_showWhenAuthenticated(Component): ComponentType {
  return auth.showWhenAuthenticated(Component);
}

// Selects `Anonymous` variant for anonymous users
// Selects `Authenticated` variant for authenticated users
export function auth_selectAuthStatusVariant(Component): ComponentType {
  return auth.selectAuthStatusVariant(Component);
}

// Selects primary variant for authenticated users
// Selects configured variant for non-authenticated users
export function auth_selectPrimaryVariantForAuthenticated(
  Component
): ComponentType {
  return auth.selectPrimaryVariantForAuthenticated(Component);
}

/// EMBED ////

// Component opens login embed as popup (shows for anonymous users only)
export function embed_popupLogin(Component): ComponentType {
  return embed.popupLoginEmbed(Component);
}

// Component opens registration embed as popup (shows for anonymous users only)
export function embed_popupRegister(Component): ComponentType {
  return embed.popupRegisterEmbed(Component);
}

// Component opens profile embed as popup (shows for authenticated users only)
export function embed_popupProfile(Component): ComponentType {
  return embed.popupProfileEmbed(Component);
}

//// USER DATA ////

// Display user's first name as component text
export function user_withFirstName(Component): ComponentType {
  return user.withFirstName(Component);
}

// Display user's last name as component text
export function user_withLastName(Component): ComponentType {
  return user.withLastName(Component);
}

// Display user's full name as component text
export function user_withFullName(Component): ComponentType {
  return user.withFullName(Component);
}

// Display user's email address as component text
export function user_withEmail(Component): ComponentType {
  return user.withEmail(Component);
}

// Display user's avatar/profile image as component image
// ℹ️ **NOTE:** Requires an image component
export function user_withAvatar(Component): ComponentType {
  return user.withAvatar(Component);
}

// Display account name as component text
export function user_withAccountName(Component): ComponentType {
  return user.withAccountName(Component);
}

//// PLANS ////

// Display current plan UID as component text
export function plans_withPlanUid(Component): ComponentType {
  return plans.withPlanUidAsText(Component);
}

// Selects `OW45KRmg` variant for a user on the OW45KRmg plan
// Selects `amRjLEmJ` variant for a user on the amRjLEmJ plan
// If variant not found, selects the primary variant
export function plans_selectPlanUidVariant(Component): ComponentType {
  return plans.selectPlanUidVariant(Component);
}

/*
***********************************************************
** 🚨 REQUIRES: Customize the plan overrides below **
***********************************************************
To customize the plan overrides, change the examples below:
1. Change the plan denomination (e.g. `Premium`)
2. Change the plan UID to match your actual plan UID
3. Update your project to use the new override
Copy/paste and repeat for each plan needed.
*/

// Example for a "Premium" plan with UID "OW45KRmg":

// Component visible for users on the Premium plan
export function plans_showWhenPremiumPlan(Component): ComponentType {
  return plans.showWhenPlan(Component, "OW45KRmg");
}

// Component visible for users not on the Premium plan
export function plans_showWhenNotPremiumPlan(Component): ComponentType {
  return plans.showWhenNotPlan(Component, "OW45KRmg");
}

// Selects primary variant for users on the Premium plan
// Selects configured variant for users not on the Premium plan
export function plans_selectPrimaryVariantForPremiumPlan(
  Component
): ComponentType {
  return plans.selectPrimaryVariantForPlan(Component, "OW45KRmg");
}

//// ADD-ONS ////

// Display current add-on UIDs (comma separated string) as component text
export function addOns_withAddOnUids(Component): ComponentType {
  return addOns.withAddOnUidsAsText(Component);
}

/*
***********************************************************
** 🚨 REQUIRES: Customize the add-on overrides below **
***********************************************************
To customize the add-on overrides, change the examples below:
1. Change the add-on denomination (e.g. `PowerUp`)
2. Change the add-on UID to match your actual add-on UID
3. Update your project to use the new override
Copy/paste and repeat for each add-on needed.
*/

// Example for a "PowerUp" add-on with UID "OW4pRYWg":

// Component visible for users with the PowerUp add-on
export function addOns_showWhenPowerUpAddOn(Component): ComponentType {
  return addOns.showWhenAddOn(Component, "OW4pRYWg");
}

// Component visible for users without the PowerUp add-on
export function addOns_showWhenNotPowerUpAddOn(Component): ComponentType {
  return addOns.showWhenNotAddOn(Component, "OW4pRYWg");
}

// Selects primary variant for users with the PowerUp add-on
// Selects configured variant for users without the PowerUp add-on
export function addOns_selectPrimaryVariantForPowerUpAddOn(
  Component
): ComponentType {
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

// Display bookmarks (comma-separated list) as component text
export function bookmarks_withBookmarks(Component): ComponentType {
  return bookmarks.withBookmarksAsText(Component);
}

/**
 * ℹ️ **NOTE:** The following overrides require a `slug` property on the component
 */

// Component visible if item is bookmarked
export function bookmarks_showWhenBookmarked(Component): ComponentType {
  return bookmarks.showWhenBookmarked(Component);
}

// Component visible if item is not bookmarked
export function bookmarks_showWhenNotBookmarked(Component): ComponentType {
  return bookmarks.showWhenNotBookmarked(Component);
}

// Toggle bookmark status
// Selects primary variant when item is bookmarked
// Selects configured variant when the item is not bookmarked
export function bookmarks_toggleBookmarked(Component): ComponentType {
  return bookmarks.toggleBookmarked(Component);
}

// Selects primary variant when the item is bookmarked
// Selects configured variant when the item is not bookmarked
export function bookmarks_selectPrimaryVariantForBookmarked(
  Component
): ComponentType {
  return bookmarks.selectPrimaryVariantForBookmarked(Component);
}

// Selects variant `Empty State` when there are no bookmarks
// Selects primary variant when there are bookmarks
export function bookmarks_selectCollectionVariant(Component): ComponentType {
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

// Display completed lessons (comma-separated list) as component text
export function lessons_withCompleted(Component): ComponentType {
  return lessons.withLessonsCompletedAsText(Component);
}

/**
 * ℹ️ **NOTE:** The following overrides require a `slug` property on the component
 */

// Component visible if lesson is completed
export function lessons_showWhenCompleted(Component): ComponentType {
  return lessons.showWhenLessonCompleted(Component);
}

// Component visible if lesson is not completed
export function lessons_showWhenNotCompleted(Component): ComponentType {
  return lessons.showWhenLessonNotCompleted(Component);
}

// Toggle lesson completion status
// Selects primary variant when lesson is completed
// Selects configured variant when lesson is not completed
export function lessons_toggleCompleted(Component): ComponentType {
  return lessons.toggleLessonCompleted(Component);
}

// Selects primary variant when lesson is completed
// Selects configured variant when lesson is not completed
export function lessons_selectPrimaryVariantWhenCompleted(
  Component
): ComponentType {
  return lessons.selectPrimaryVariantWhenLessonCompleted(Component);
}
