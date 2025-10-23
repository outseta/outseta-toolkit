// File: OutsetaEmbeds.tsx
// Embed controls for Outseta integration
import { embed } from "https://cdn.jsdelivr.net/npm/@outseta/toolkit@v0.6/dist/framer/overrides.js";

//// EMBED CONTROLS ////

// Component opens login embed as popup (shows for anonymous users only)
export function popupLoginEmbed(Component): React.ComponentType {
  return embed.popupLoginEmbed(Component);
}

// Component opens registration embed as popup (shows for anonymous users only)
export function popupRegisterEmbed(Component): React.ComponentType {
  return embed.popupRegisterEmbed(Component);
}

// Component opens profile embed as popup (shows for authenticated users only)
export function popupProfileEmbed(Component): React.ComponentType {
  return embed.popupProfileEmbed(Component);
}
