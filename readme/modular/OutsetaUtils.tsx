// File: OutsetaUtils.tsx
import { utils } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.7/dist/framer/overrides.js";

// Automatically hides empty grid items
export function dynamicGridHeight(Component): React.ComponentType {
  return utils.dynamicGridHeight(Component);
}
