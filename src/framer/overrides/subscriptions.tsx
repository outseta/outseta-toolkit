import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import useAuthStore from "./useAuthStore";

type PlanOptions = {
  planUid: string;
};

type AddOnOptions = {
  addOnUid: string;
};

type VariantNames = {
  whenTrue?: string;
  whenFalse?: string;
};

const log = OutsetaLogger(`framer.overrides.subscriptions`);

/**
 * Resolves a value from props if it starts with "props."
 * @param value - The value to resolve
 * @param props - The component props
 * @returns The resolved value
 */
function resolveValue(value: any, props: any) {
  if (typeof value === "string" && value.startsWith("props.")) {
    return props[value.replace("props.", "")];
  }
  return value;
}

/**
 * Shows component based on plan UID match
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.planUid - Plan UID to check against
 */
export function showForPlan(
  Component: React.ComponentType<any>,
  { planUid }: PlanOptions
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

      if (currentPlanUid !== resolvedValuePlanUid) {
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
 * Hides component based on plan UID match
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.planUid - Plan UID to check against
 */
export function hideForPlan(
  Component: React.ComponentType<any>,
  { planUid }: PlanOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `hideForPlan ${planUid} -|`;

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

      if (currentPlanUid === resolvedValuePlanUid) {
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
 * Shows component based on add-on UID presence
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.addOnUid - Add-on UID to check for
 */
export function showForAddOnUid(
  Component: React.ComponentType<any>,
  { addOnUid }: AddOnOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForAddOnUid ${addOnUid} -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentAddOnUids = payload["outseta:addOnUids"];
      const resolvedValueAddOnUid = resolveValue(addOnUid, props);

      log(logPrefix, {
        currentAddOnUids,
        resolvedValueAddOnUid,
      });

      if (!currentAddOnUids.includes(resolvedValueAddOnUid)) {
        throw new Error("Add-on UID not found");
      }

      log(logPrefix, "Add-on UID found - showing component");
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
 * Hides component based on add-on UID presence
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.addOnUid - Add-on UID to check for
 */
export function hideForAddOnUid(
  Component: React.ComponentType<any>,
  { addOnUid }: AddOnOptions
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `hideForAddOnUid ${addOnUid} -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentAddOnUids = payload["outseta:addOnUids"];
      const resolvedValueAddOnUid = resolveValue(addOnUid, props);

      log(logPrefix, {
        currentAddOnUids,
        resolvedValueAddOnUid,
      });

      if (currentAddOnUids.includes(resolvedValueAddOnUid)) {
        throw new Error("Add-on UID found");
      }

      log(logPrefix, "Add-on UID not found - showing component");
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
 * Sets component text to add-on UID values as comma-separated list
 * @param Component - The component to wrap
 */
export function withAddOnUids(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withAddOnUid -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentAddOnUids = payload["outseta:addOnUids"];

      log(logPrefix, { currentAddOnUids });

      if (!currentAddOnUids || currentAddOnUids.length === 0) {
        throw new Error("No add-on UIDs available");
      }

      const displayValue = currentAddOnUids.join(", ");

      return <Component ref={ref} {...props} text={displayValue} />;
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
 * Selects the variant with the same name as the user's current plan UID
 * @param Component - The component to wrap
 */
export function selectPlanVariant(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPlanUidVariant -|`;

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
 * @param options - Configuration
 * @param options.planUid - Plan UID to check for
 * @param options.whenTrue - Variant name when plan matches (default: "WithPlan")
 * @param options.whenFalse - Variant name when plan doesn't match (default: "WithoutPlan")
 */
export function selectVariantForPlan(
  Component: React.ComponentType<any>,
  {
    planUid,
    whenTrue = "WithPlan",
    whenFalse = "WithoutPlan",
  }: PlanOptions & VariantNames
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectVariantForPlan ${planUid} -|`;

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
      const hasPlan = currentPlanUid === resolvedValuePlanUid;
      const variantName = hasPlan ? whenTrue : whenFalse;

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
 * Selects variant for add-on UID presence
 * @param Component - The component to wrap
 * @param options - Configuration
 * @param options.addOnUid - Add-on UID to check for
 * @param options.whenTrue - Variant name when add-on is present (default: "WithAddOn")
 * @param options.whenFalse - Variant name when add-on is not present (default: "WithoutAddOn")
 */
export function selectVariantForAddOn(
  Component: React.ComponentType<any>,
  {
    addOnUid,
    whenTrue = "WithAddOn",
    whenFalse = "WithoutAddOn",
  }: AddOnOptions & VariantNames
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectVariantForAddOn ${addOnUid} -|`;

    try {
      const payload = useAuthStore((state) => state.payload);

      if (!payload) {
        throw new Error("JWT payload required");
      }

      const currentAddOnUids = payload["outseta:addOnUids"];
      const resolvedValueAddOnUid = resolveValue(addOnUid, props);

      log(logPrefix, {
        currentAddOnUids,
        resolvedValueAddOnUid,
      });

      // Select variant based on whether the add-on is present
      const hasAddOn = currentAddOnUids.includes(resolvedValueAddOnUid);
      const variantName = hasAddOn ? whenTrue : whenFalse;

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
