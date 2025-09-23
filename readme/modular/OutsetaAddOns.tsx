// File: OutsetaAddOns.tsx
// Add-on management for Outseta integration
import { type ComponentType } from "react";
import { addOns } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// ADD-ON MANAGEMENT ////

// Display current add-on UIDs (comma separated string) as component text
export function withAddOnUids(Component): ComponentType {
  return addOns.withAddOnUidsAsText(Component);
}

/*
***********************************************************
** 🚨 **REQUIRES** Customize the add-on overrides below **
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

// Selects primary variant for users with the PowerUp add-on
// Selects configured variant for users without the PowerUp add-on
export function selectPrimaryVariantForPowerUpAddOn(Component): ComponentType {
  return addOns.selectPrimaryVariantForAddOn(Component, "OW4pRYWg");
}
