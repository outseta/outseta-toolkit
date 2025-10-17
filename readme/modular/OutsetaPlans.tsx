// File: OutsetaPlans.tsx
// Subscription plan management for Outseta integration
import { type ComponentType } from "react";
import { plans } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.6/dist/framer/overrides.js";

//// PLANS ////

// Display current plan UID as component text
export function withPlanUid(Component): ComponentType {
  return plans.withPlanUidAsText(Component);
}

// Selects `OW45KRmg` variant for authenticated users on the OW45KRmg plan
// Selects `amRjLEmJ` variant for authenticated users on the amRjLEmJ plan
// Selects primary variant for authenticated users when no variant match
export function selectPlanUidVariant(Component): ComponentType {
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
export function showForGoldPlan(Component): ComponentType {
  return plans.showForPlan(Component, "OW45KRmg");
}

// Component visible for authenticated users not on the Gold plan
export function showForNotGoldPlan(Component): ComponentType {
  return plans.showForNotPlan(Component, "OW45KRmg");
}

// Selects primary variant for authenticated users on the Gold plan
// Selects configured variant for authenticated users not on the Gold plan
export function selectPrimaryVariantForGoldPlan(Component): ComponentType {
  return plans.selectPrimaryVariantForPlan(Component, "OW45KRmg");
}
