import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { comparePropertyValue, resolveValue } from "./utils";

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
      log(logPrefix, "Framer Canvas - showing placeholder plan UID");
      return <Component ref={ref} {...props} text={`{PlanUid}`} />;
    }

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

// Visibility overrides

export function showWhenPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenPlan ${planUid} -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - showing component");
      return <Component ref={ref} {...props} />;
    }

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

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - showing component");
      return <Component ref={ref} {...props} />;
    }

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

// Variant overrides

// Selects variant with the same name as the current plan UID
// Selects primary variant when no plan UID is present
export function selectPlanUidVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `planUidVariant -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - selecting configured variant");
      return <Component ref={ref} {...props} variant={props.variant} />;
    }

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        log(logPrefix, "No JWT payload available - selecting primary variant");
        return <Component ref={ref} {...props} variant={null} />;
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

// Selects primary variant (null) when the plan is present
// Selects configured variant when the plan is not present
export function selectPrimaryVariantForPlan(
  Component: React.ComponentType<any>,
  planUid: PlanUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPrimaryVariantForPlan ${planUid} -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - selecting configured variant");
      return <Component ref={ref} {...props} variant={props.variant} />;
    }

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        log(
          logPrefix,
          "No JWT payload available - selecting configured variant"
        );
        return <Component ref={ref} {...props} variant={props.variant} />;
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

      const variantName = matches ? null : props.variant;

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
