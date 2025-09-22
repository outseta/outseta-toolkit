import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { comparePropertyValue, resolveValue } from "./utils";

import useAuthStore from "./useAuthStore";

type AddOnUid = string;

type VariantNames = {
  activeVariant?: string;
  inactiveVariant?: string;
};

const log = OutsetaLogger(`framer.overrides.addOns`);

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

export function showWhenAddOn(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenAddOn ${addOnUid} -|`;

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

export function showWhenNotAddOn(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenNotAddOn ${addOnUid} -|`;

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

export function variantWhenAddOn(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid,
  { activeVariant = "Active", inactiveVariant = "Inactive" }: VariantNames = {}
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `variantWhenAddOn ${addOnUid} -|`;

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
