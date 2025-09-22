import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { comparePropertyValue, resolveValue } from "./utils";

import useAuthStore from "./useAuthStore";

type PlanUid = string;

type VariantNames = {
  matchVariant?: string;
  noMatchVariant?: string;
};

const log = OutsetaLogger(`framer.overrides.plans`);

/**
 * Sets component text to plan UID value
 * @param Component - The component to wrap
 */
export function withPlanUid(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withPlanUid -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentPlanUid = payload["outseta:planUid"];

      log(logPrefix, { currentPlanUid });

      if (!currentPlanUid) {
        throw new Error("No plan UID available");
      }

      return <Component ref={ref} {...props} text={currentPlanUid} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Shows component based on plan UID match
 * @param Component - The component to wrap
 * @param planUid - Plan UID to check against
 */
export function showForPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForPlan ${planUid} -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentPlanUid = payload["outseta:planUid"];
      const resolvedValuePlanUid = resolveValue(planUid, props);

      log(logPrefix, {
        currentPlanUid,
        resolvedValuePlanUid,
      });

      const matches = comparePropertyValue(
        currentPlanUid,
        resolvedValuePlanUid,
        "equal"
      );

      if (!matches) {
        throw new Error("Plan UID mismatch");
      }

      log(logPrefix, "Plan UID match found - showing component");
      return <Component ref={ref} {...props} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Shows component based on plan UID mismatch
 * @param Component - The component to wrap
 * @param planUid - Plan UID to check against (can be "props.propertyName")
 */
export function showForNotPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForNotPlan ${planUid} -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentPlanUid = payload["outseta:planUid"];
      const resolvedValuePlanUid = resolveValue(planUid, props);

      log(logPrefix, {
        currentPlanUid,
        resolvedValuePlanUid,
      });

      const matches = comparePropertyValue(
        currentPlanUid,
        resolvedValuePlanUid,
        "equal"
      );

      if (matches) {
        throw new Error("Plan UID match found");
      }

      log(logPrefix, "Plan UID mismatch - showing component");
      return <Component ref={ref} {...props} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Sets component variant to the current plan UID
 * @param Component - The component to wrap
 */
export function variantForPlanUid(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `planUidVariant -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentPlanUid = payload["outseta:planUid"];

      log(logPrefix, {
        currentPlanUid,
      });

      // Select variant with the same name as the current plan UID
      const variantName = currentPlanUid;

      log(logPrefix, `Selecting variant: ${variantName}`);
      return <Component ref={ref} {...props} variant={variantName} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}

/**
 * Selects variant for plan UID presence
 * @param Component - The component to wrap
 * @param planUid - Plan UID to check for
 * @param options - Configuration
 * @param options.matchVariant - Variant name when plan matches (default: "WithPlan")
 * @param options.noMatchVariant - Variant name when plan doesn't match (default: "WithoutPlan")
 */
export function variantForPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid,
  {
    matchVariant = "WithPlan",
    noMatchVariant = "WithoutPlan",
  } = {} as VariantNames
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `variantForPlan ${planUid} -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentPlanUid = payload["outseta:planUid"];
      const resolvedValuePlanUid = resolveValue(planUid, props);

      log(logPrefix, {
        currentPlanUid,
        resolvedValuePlanUid,
      });

      // Select variant based on whether the plan matches
      const matches = comparePropertyValue(
        currentPlanUid,
        resolvedValuePlanUid,
        "equal"
      );

      const variantName = matches ? matchVariant : noMatchVariant;

      log(logPrefix, `Selecting variant: ${variantName}`);
      return <Component ref={ref} {...props} variant={variantName} />;
    } catch (error) {
      if (error instanceof Error) {
        log(logPrefix, "Hiding component -", error.message);
      } else {
        log(logPrefix, "Hiding component -", error);
      }
      return null;
    }
  });
}
