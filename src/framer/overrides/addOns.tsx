import React, { forwardRef } from "react";
import { OutsetaLogger } from "../../outseta";
import { comparePropertyValue, resolveValue } from "./property-utils";

import useAuthStore, { isFramerCanvas } from "./useAuthStore";

type AddOnUid = string;

const log = OutsetaLogger(`framer.overrides.addOns`);

// Display overrides

export function withAddOnUidsAsText(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `withAddOnUidsAsText -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component with placeholder`);
        return <Component ref={ref} {...props} text={`{AddOnUids}`} />;
      }

      const payload = useAuthStore((state) => state.payload);
      if (!payload) {
        log(logPrefix, `No payload - remove component`);
        return null;
      }

      const currentAddOnUids = payload["outseta:addOnUids"] || [];

      if (currentAddOnUids.length === 0) {
        log(logPrefix, `No add-on uids - remove component`);
        return null;
      }

      const displayValue = currentAddOnUids.join(", ");
      log(logPrefix, `Add on uids - show component with text: ${displayValue}`);
      return <Component ref={ref} {...props} text={displayValue} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

// Visibility overrides

// Display when authenticated and add-on is present
export function showForAddOn(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForAddOn ${addOnUid} -|`;
    try {
      const resolvedValueAddOnUid = resolveValue(addOnUid, props);

      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const payload = useAuthStore((state) => state.payload);
      if (!payload) {
        log(logPrefix, `No payload - remove component`);
        return null;
      }

      const currentAddOnUids = payload["outseta:addOnUids"] || [];

      const matches = comparePropertyValue(
        currentAddOnUids,
        resolvedValueAddOnUid,
        "includes"
      );

      if (!matches) {
        log(logPrefix, `Add-on mismatch - remove component`);
        return null;
      }

      log(logPrefix, `Add-on match - show component`);
      return <Component ref={ref} {...props} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

// Display when authenticated and add-on is not present
export function showForNotAddOn(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `showForNotAddOn ${addOnUid} -|`;
    try {
      if (isFramerCanvas()) {
        log(logPrefix, `Framer Canvas - show component`);
        return <Component ref={ref} {...props} />;
      }

      const payload = useAuthStore((state) => state.payload);
      if (!payload) {
        log(logPrefix, `No Payload - remove component`);
        return null;
      }

      const currentAddOnUids = payload["outseta:addOnUids"] || [];
      const resolvedValueAddOnUid = resolveValue(addOnUid, props);
      log(
        logPrefix,
        `Compare ${resolvedValueAddOnUid} to ${currentAddOnUids} using includes`
      );

      const matches = comparePropertyValue(
        currentAddOnUids,
        resolvedValueAddOnUid,
        "includes"
      );

      if (matches) {
        log(logPrefix, `Add-on match - remove component`);
        return null;
      }

      log(logPrefix, `Add-on mismatch - show component`);
      return <Component ref={ref} {...props} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

// Variant overrides

// Display when authenticated
// Selects primary variant when the add-on is present
// Selects configured variant when the add-on is not present
export function selectPrimaryVariantForAddOn(
  Component: React.ComponentType<any>,
  addOnUid: AddOnUid
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const logPrefix = `selectPrimaryVariantForAddOn ${addOnUid} -|`;
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

      const currentAddOnUids = payload["outseta:addOnUids"] || [];
      const resolvedValueAddOnUid = resolveValue(addOnUid, props);
      log(
        logPrefix,
        `Compare ${resolvedValueAddOnUid} to ${currentAddOnUids} using includes`
      );

      // Select variant based on whether the add-on is present
      const matches = comparePropertyValue(
        currentAddOnUids,
        resolvedValueAddOnUid,
        "includes"
      );

      if (matches) {
        log(logPrefix, `Add-on match - show primary variant`);
        return <Component ref={ref} {...props} variant={null} />;
      }

      log(logPrefix, `Add-on mismatch - show configured variant`);
      return <Component ref={ref} {...props} />;
    } catch (error) {
      log(logPrefix, `Error - remove component`, error);
      return null;
    }
  });
}

// Backwards compatibility aliases
export const showWhenAddOn = showForAddOn;
export const showWhenNotAddOn = showForNotAddOn;
