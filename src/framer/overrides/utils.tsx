/**
 * Detects if the current environment is Framer canvas mode
 * @returns true if running in Framer canvas
 */
export function isFramerCanvas(): boolean {
  try {
    return window.location.host.includes("framercanvas.com");
  } catch (error) {
    // If it fails, assume we're not in Framer
    return false;
  }
}

function arrayIncludes(array: any[], value: any, flags?: "ignore-case"[]) {
  if (flags?.includes("ignore-case")) {
    return array.some((item: any) => {
      if (typeof item !== "string") return false;
      return item.toUpperCase() === value.toUpperCase();
    });
  }
  return array.includes(value);
}

export function compare(
  propertyValue: any,
  value: any,
  type: "equal" | "array-includes",
  flags?: "ignore-case"[]
) {
  switch (type) {
    case "equal":
      return arrayIncludes([propertyValue], value, flags);
    case "array-includes":
      // If value is array, use arrayIncludes
      if (Array.isArray(propertyValue)) {
        return arrayIncludes(propertyValue, value, flags);
      }

      // If value is string, create array from comma-separated values and use arrayIncludes
      if (typeof propertyValue === "string") {
        return arrayIncludes(
          propertyValue.split(",").map((val) => val.trim()),
          value,
          flags
        );
      }

      // If value is not string or array, return false
      return false;
    default:
      throw new Error(
        `Invalid compare type: "${type}". Valid types are: "equal", "array-includes"`
      );
  }
}
