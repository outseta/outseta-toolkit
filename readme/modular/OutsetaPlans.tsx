// File: OutsetaPlans.tsx
// Subscription plan management for Outseta integration
import { type ComponentType } from "react";
import { plans } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// SUBSCRIPTION PLANS ////

// Display current plan UID as component text
export function withPlanUid(Component): ComponentType {
  return plans.withPlanUidAsText(Component);
}

// Selects `OW45KRmg` variant for a user on the OW45KRmg plan
// Selects `amRjLEmJ` variant for a user on the amRjLEmJ plan
// If variant not found, the component will use the primary variant
export function selectPlanUidVariant(Component): ComponentType {
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
export function showWhenPremiumPlan(Component): ComponentType {
  return plans.showWhenPlan(Component, "OW45KRmg");
}

// Component visible for users not on the Premium plan
export function showWhenNotPremiumPlan(Component): ComponentType {
  return plans.showWhenNotPlan(Component, "OW45KRmg");
}

// Selects variant `Active` for users on the Premium plan
// Selects variant `Inactive` for users not on the Premium plan
export function selectVariantForPremiumPlan(Component): ComponentType {
  return plans.selectVariantForPlan(Component, "OW45KRmg");
}
