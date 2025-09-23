// File: OutsetaEmbeds.tsx
// Embed controls for Outseta integration
import { type ComponentType } from "react";
import { embed } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.3/dist/framer/overrides.js";

//// EMBED CONTROLS ////

// Component opens login embed as popup (shows for anonymous users only)
export function popupLoginEmbed(Component): ComponentType {
  return embed.popupLoginEmbed(Component);
}

// Component opens registration embed as popup (shows for anonymous users only)
export function popupRegisterEmbed(Component): ComponentType {
  return embed.popupRegisterEmbed(Component);
}

// Component opens profile embed as popup (shows for authenticated users only)
export function popupProfileEmbed(Component): ComponentType {
  return embed.popupProfileEmbed(Component);
}
