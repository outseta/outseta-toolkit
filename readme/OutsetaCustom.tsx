// File: OutsetaCustom.tsx
// Custom property examples for Outseta integration
import { type ComponentType } from "react";
import { custom } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// CUSTOM PROPERTY EXAMPLES ////

/*
 ***********************************************************
 ** 🚨 REQUIRES: Create an account custom property with system name: Mascot **
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
 ** 🚨 REQUIRES: Create a person custom property with system name: CoffeePreference **
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
 ** 🚨 REQUIRES: Create a person custom property with system name: Skills **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "Skills"
 3. and the control type is "select"
 4. Add the following options: `JavaScript`, `Design`, `Marketing`
 */

// Toggle skill tag
// Selects variant `Active` when slug is present in skills
// Selects variant `Inactive` when slug is not present in skills
// ℹ️ NOTE: Requires a `slug` property on the component
export function toggleSkillTag(Component): ComponentType {
  return custom.toggleProperty(Component, "Skills", {
    value: "props.slug", // e.g. one of: `JavaScript`, `Design`, `Marketing`
  });
}

/*
 ***********************************************************
 ** 🚨 REQUIRES: Create a person custom property with system name: WatchLater **
 ***********************************************************
 1. Go to CRM > Custom Properties > Person > Add Property
 2. Make sure the system name is "WatchLater"
 3. and the control type is "text"
 */

// Selects variant `OnWatchLaterList` when slug is present in watch later
// Selects variant `NotOnWatchLaterList` when slug is not present in watch later
// ℹ️ NOTE: Requires a `slug` property on the component
export function variantFromWatchLaterStatus(Component): ComponentType {
  return custom.variantForProperty(Component, "WatchLater", {
    value: "props.slug", // e.g. one of: `video1`, `video2`, `video3` etc.
    compare: "includes",
    activeVariant: "OnWatchLaterList",
    inactiveVariant: "NotOnWatchLaterList",
  });
}
