// File: OutsetaAddOns.tsx
// Add-on management for Outseta integration
import { type ComponentType } from "react";
import { addOns } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.6/dist/framer/overrides.js";

//// ADD-ON  ////

// Display current add-on UIDs (comma separated string) as component text
export function withAddOnUids(Component): ComponentType {
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
export function showForBoostAddOn(Component): ComponentType {
  return addOns.showForAddOn(Component, "OW4pRYWg");
}

// Component visible for authenticated users without the Boost add-on
export function showForNotBoostAddOn(Component): ComponentType {
  return addOns.showForNotAddOn(Component, "OW4pRYWg");
}

// Selects primary variant for authenticated users with the Boost add-on
// Selects configured variant for authenticated users without the Boost add-on
export function selectPrimaryVariantForBoostAddOn(Component): ComponentType {
  return addOns.selectPrimaryVariantForAddOn(Component, "OW4pRYWg");
}
