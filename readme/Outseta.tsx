// File: Outseta.tsx
// All-in-one Outseta integration with all common functions
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

//// USER DATA ////

// Display user's first name as component text
export function withFirstName(Component): ComponentType {
  return user.withFirstName(Component);
}

// Display user's last name as component text
export function withLastName(Component): ComponentType {
  return user.withLastName(Component);
}

// Display user's full name as component text
export function withFullName(Component): ComponentType {
  return user.withFullName(Component);
}

// Display user's email address as component text
export function withEmail(Component): ComponentType {
  return user.withEmail(Component);
}

// Display user's avatar/profile image as component image
// ℹ️ NOTE: Requires an image component
export function withAvatar(Component): ComponentType {
  return user.withAvatar(Component);
}

// Display account name as component text
export function withAccountName(Component): ComponentType {
  return user.withAccountName(Component);
}

//// PLANS ////

// Display current plan UID as component text
export function withPlanUid(Component): ComponentType {
  return plans.withPlanUid(Component);
}

// Selects `OW45KRmg` variant for a user on the OW45KRmg plan
// Selects `amRjLEmJ` variant for a user on the amRjLEmJ plan
// If variant not found, the component will use the primary variant
export function planUidVariant(Component): ComponentType {
  return plans.planUidVariant(Component);
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
export function showWhenPremiumPlan(Component): ComponentType {
  return plans.showWhenPlan(Component, "OW45KRmg");
}

// Component visible for users not on the Premium plan
export function showWhenNotPremiumPlan(Component): ComponentType {
  return plans.showWhenNotPlan(Component, "OW45KRmg");
}

// Selects variant `Active` for users on the Premium plan
// Selects variant `Inactive` for users not on the Premium plan
export function variantForPremiumPlan(Component): ComponentType {
  return plans.variantForPlan(Component, "OW45KRmg");
}

//// ADD-ONS ////

// Display current add-on UIDs (comma separated string) as component text
export function withAddOnUids(Component): ComponentType {
  return addOns.withAddOnUids(Component);
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
export function showWhenPowerUpAddOn(Component): ComponentType {
  return addOns.showWhenAddOn(Component, "OW4pRYWg");
}

// Component visible for users without the PowerUp add-on
export function showWhenNotPowerUpAddOn(Component): ComponentType {
  return addOns.showWhenNotAddOn(Component, "OW4pRYWg");
}

// Selects variant `Active` for users with the PowerUp add-on
// Selects variant `Inactive` for users without the PowerUp add-on
export function variantForPowerUpAddOn(Component): ComponentType {
  return addOns.variantForAddOn(Component, "OW4pRYWg");
}

//// BOOKMARKS ////

/*
 ***********************************************************
 ** 🚨 REQUIRES: Create a person custom property with system name: Bookmarks **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "Bookmarks"
 3. and the control type is "text"
 */

// Display bookmarks (comma-separated list) as component text
export function withBookmarks(Component): ComponentType {
  return bookmarks.withBookmarksAsText(Component);
}

/**
 * ℹ️ NOTE: The following overrides require a `slug` property on the component
 */

// Component visible if item is bookmarked
export function showWhenBookmarked(Component): ComponentType {
  return bookmarks.showWhenBookmarked(Component);
}

// Component visible if item is not bookmarked
export function showWhenNotBookmarked(Component): ComponentType {
  return bookmarks.showWhenNotBookmarked(Component);
}

// Toggle bookmark status
// Selects variant `Bookmarked` when item is bookmarked
// Selects variant `NotBookmarked` when the item is not bookmarked
export function toggleBookmarked(Component): ComponentType {
  return bookmarks.toggleBookmarked(Component);
}

// Selects variant `Bookmarked` when the item is bookmarked
// Selects variant `NotBookmarked` when the item is not bookmarked
export function bookmarkedVariant(Component): ComponentType {
  return bookmarks.bookmarkedVariant(Component);
}

//// LESSONS ////

/*
 ***********************************************************
 ** 🚨 REQUIRES: Create a person custom property with system name: LessonsCompleted **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "LessonsCompleted"
 3. and the control type is "text"
 */

// Display completed lessons (comma-separated list) as component text
export function withLessonsCompleted(Component): ComponentType {
  return lessons.withLessonsCompletedAsText(Component);
}

/**
 * ℹ️ NOTE: The following overrides require a `slug` property on the component
 */

// Component visible if lesson is completed
export function showWhenLessonCompleted(Component): ComponentType {
  return lessons.showWhenLessonCompleted(Component);
}

// Component visible if lesson is not completed
export function showWhenLessonNotCompleted(Component): ComponentType {
  return lessons.showWhenLessonNotCompleted(Component);
}

// Toggle lesson completion status
// Selects variant `Completed` when lesson is completed
// Selects variant `NotCompleted` when lesson is not completed
export function toggleLessonCompleted(Component): ComponentType {
  return lessons.toggleLessonCompleted(Component);
}

// Selects variant `Completed` when lesson is completed
// Selects variant `NotCompleted` when lesson is not completed
export function lessonCompletedVariant(Component): ComponentType {
  return lessons.lessonCompletedVariant(Component);
}
