// File: OutsetaUtils.tsx
import { type ComponentType } from "react";
import { utils } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.5/dist/framer/overrides.js";

// Automatically hides empty grid items
export function dynamicGridHeight(Component): ComponentType {
  return utils.dynamicGridHeight(Component);
}
