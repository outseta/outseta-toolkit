// isFramerCanvas is kept here — it's used by all overrides.
// The Zustand store has been replaced by @outseta/sdk nanostores.

export function isFramerCanvas(): boolean {
  try {
    return window.location.host.includes("framercanvas.com");
  } catch {
    return false;
  }
}
