import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { comparePropertyValue, resolveValue } from "./utils";

import useAuthStore from "./useAuthStore";

type AddOnUid = string;

type VariantNames = {
  matchVariant?: string;
  noMatchVariant?: string;
};

const log = OutsetaLogger(`framer.overrides.addOns`);

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
 * Shows component based on add-on UID presence
 * @param Component - The component to wrap
 * @param addOnUid - Add-on UID to check against (can be "props.propertyName")
 */
export function showForAddOnUid(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
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

      const matches = comparePropertyValue(
        currentAddOnUids,
        resolvedValueAddOnUid,
        "includes"
      );

      if (!matches) {
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
 * Shows component based on add-on UID not present
 * @param Component - The component to wrap
 * @param addOnUid - Add-on UID to check against (can be "props.propertyName")
 */
export function showForNotAddOnUid(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
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

      const matches = comparePropertyValue(
        currentAddOnUids,
        resolvedValueAddOnUid,
        "includes"
      );

      if (matches) {
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
 * Selects variant for add-on UID presence
 * @param Component - The component to wrap
 * @param addOnUid - Add-on UID to check against (can be "props.propertyName")
 * @param options.matchVariant - Variant name when add-on is present (default: "WithAddOn")
 * @param options.noMatchVariant - Variant name when add-on is not present (default: "WithoutAddOn")
 */
export function variantForAddOnUid(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid,
  {
    matchVariant = "WithAddOn",
    noMatchVariant = "WithoutAddOn",
  } = {} as VariantNames
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `variantForAddOnUid ${addOnUid} -|`;

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
      const matches = comparePropertyValue(
        currentAddOnUids,
        resolvedValueAddOnUid,
        "includes"
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
