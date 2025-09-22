import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { comparePropertyValue, resolveValue } from "./utils";

import useAuthStore from "./useAuthStore";

type PlanUid = string;

type VariantNames = {
  activeVariant?: string;
  inactiveVariant?: string;
};

const log = OutsetaLogger(`framer.overrides.plans`);

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

export function showWhenPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenPlan ${planUid} -|`;

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

export function showWhenNotPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenNotPlan ${planUid} -|`;

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

export function planUidVariant(
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

export function variantWhenPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid,
  { activeVariant = "Active", inactiveVariant = "Inactive" }: VariantNames = {}
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `variantWhenPlan ${planUid} -|`;

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

      const variantName = matches ? activeVariant : inactiveVariant;

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
