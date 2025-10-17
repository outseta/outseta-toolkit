import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { comparePropertyValue, resolveValue } from "./property-utils";

import useAuthStore, { isFramerCanvas } from "./useAuthStore";

type PlanUid = string;

const log = OutsetaLogger(`framer.overrides.plans`);

// Display overrides

export function withPlanUidAsText(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withPlanUid -|`;

    if (isFramerCanvas()) {
      log(logPrefix, `Framer Canvas - show component with placeholder`);
      return <Component ref={ref} {...props} text={`{PlanUid}`} />;
    }

    const payload = useAuthStore((state) => state.payload);
    if (!payload) {
      log(logPrefix, `No payload - remove component`);
      return null;
    }

    const currentPlanUid = payload["outseta:planUid"] || "";

    if (!currentPlanUid) {
      log(logPrefix, `No plan uid - remove component`);
      return null;
    }

    log(logPrefix, `Plan uid - show component with text: ${currentPlanUid}`);
    return <Component ref={ref} {...props} text={currentPlanUid} />;
  });
}

// Visibility overrides

// Display when authenticated and plan is present
export function showForPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const resolvedValuePlanUid = resolveValue(planUid, props);
    const logPrefix = `showForPlan ${resolvedValuePlanUid} -|`;

    if (isFramerCanvas()) {
      log(logPrefix, `Framer Canvas - show component`);
      return <Component ref={ref} {...props} />;
    }

    const payload = useAuthStore((state) => state.payload);
    if (!payload) {
      log(logPrefix, `No payload - remove component`);
      return null;
    }

    const currentPlanUid = payload["outseta:planUid"] || "";

    const matches = comparePropertyValue(
      currentPlanUid,
      resolvedValuePlanUid,
      "equal"
    );

    if (!matches) {
      log(logPrefix, `Plan mismatch - remove component`);
      return null;
    }

    log(logPrefix, `Plan match - show component`);
    return <Component ref={ref} {...props} />;
  });
}

// Display when authenticated and plan is not present
export function showForNotPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const resolvedValuePlanUid = resolveValue(planUid, props);
    const logPrefix = `showForNotPlan ${resolvedValuePlanUid} -|`;

    if (isFramerCanvas()) {
      log(logPrefix, `Framer Canvas - show component`);
      return <Component ref={ref} {...props} />;
    }

    const payload = useAuthStore((state) => state.payload);
    if (!payload) {
      log(logPrefix, `No Payload - remove component`);
      return null;
    }

    const currentPlanUid = payload["outseta:planUid"] || "";

    const matches = comparePropertyValue(
      currentPlanUid,
      resolvedValuePlanUid,
      "equal"
    );

    if (matches) {
      log(logPrefix, `Plan match - hide component`);
      return null;
    }

    log(logPrefix, `Plan mismatch - show component`);
    return <Component ref={ref} {...props} />;
  });
}

// Variant overrides

// Display when authenticated
// Selects variant with the same name as the current plan UID,
// if no match defaults the primary variant
export function selectPlanUidVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `planUidVariant -|`;

    if (isFramerCanvas()) {
      log(logPrefix, `Framer Canvas - show configured variant`);
      return <Component ref={ref} {...props} />;
    }

    const payload = useAuthStore((state) => state.payload);
    if (!payload) {
      log(logPrefix, `No Payload - remove component`);
      return null;
    }

    const variantName = payload["outseta:planUid"] || "";
    log(logPrefix, `Payload - show '${variantName}' variant`);
    return <Component ref={ref} {...props} variant={variantName} />;
  });
}

// Display when authenticated
// Selects primary variant (null) when the plan is present
// Selects configured variant when the plan is not present
export function selectPrimaryVariantForPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPrimaryVariantForPlan ${planUid} -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show configured variant`);
        return <Component ref={ref} {...props} />;
      }

      const payload = useAuthStore((state) => state.payload);
      if (!payload) {
        log(logPrefix, `No Payload - remove component`);
        return null;
      }

      const currentPlanUid = payload["outseta:planUid"] || "";
      const resolvedValuePlanUid = resolveValue(planUid, props);
      log(
        logPrefix,
        `Compare ${resolvedValuePlanUid} to ${currentPlanUid} using equal`
      );

      // Select variant based on whether the plan matches
      const matches = comparePropertyValue(
        currentPlanUid,
        resolvedValuePlanUid,
        "equal"
      );

      if (matches) {
        log(logPrefix, `Plan match - show primary variant`);
        return <Component ref={ref} {...props} variant={null} />;
      }

      log(logPrefix, `Plan mismatch - show configured variant`);
      return <Component ref={ref} {...props} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

// Backwards compatibility aliases
export const showWhenPlan = showForPlan;
export const showWhenNotPlan = showForNotPlan;
