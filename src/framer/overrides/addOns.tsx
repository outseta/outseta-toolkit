import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { comparePropertyValue, resolveValue } from "./utils";

import useAuthStore, { isFramerCanvas } from "./useAuthStore";

type AddOnUid = string;

const log = OutsetaLogger(`framer.overrides.addOns`);

// Display overrides

export function withAddOnUidsAsText(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withAddOnUid -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - showing placeholder");
      return <Component ref={ref} {...props} text={`{AddOnUids}`} />;
    }

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

// Visibility overrides

export function showWhenAddOn(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showWhenAddOn ${addOnUid} -|`;

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - showing component");
      return <Component ref={ref} {...props} />;
    }

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

    if (isFramerCanvas()) {
      log(logPrefix, "Framer Canvas - showing component");
      return <Component ref={ref} {...props} />;
    }

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

// Variant overrides

// Selects primary variant (null) when the add-on is present
// Selects configured variant when the add-on is not present
export function selectPrimaryVariantForAddOn(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPrimaryVariantForAddOn ${addOnUid} -|`;

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
