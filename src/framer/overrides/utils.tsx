/**
 * Resolves a value from props if it starts with "props."
 * @param value - The value to resolve
 * @param props - The component props
 * @returns The resolved value
 */
export function resolveValue(value: any, props: any) {
  if (typeof value === "string" && value.startsWith("props.")) {
    return props[value.replace("props.", "")];
  }
  return value;
}

/**
 * Performs case-insensitive string comparison
 * @param value1 - First value to compare
 * @param value2 - Second value to compare
 * @param ignoreCase - Whether to ignore case differences
 * @returns true if values are equal
 */
export function isEqual(
  value1: any,
  value2: any,
  ignoreCase: boolean = false
): boolean {
  if (ignoreCase && typeof value1 === "string" && typeof value2 === "string") {
    return value1.toLowerCase() === value2.toLowerCase();
  }
  return value1 === value2;
}

/**
 * Checks if an array includes a value with optional case-insensitive comparison
 * @param array - Array to search in
 * @param value - Value to search for
 * @param ignoreCase - Whether to ignore case differences
 * @returns true if array includes the value
 */
function includesValue(
  array: any[],
  value: any,
  ignoreCase: boolean = false
): boolean {
  if (ignoreCase && typeof value === "string") {
    return array.some((item: any) => {
      if (typeof item !== "string") return false;
      return item.toLowerCase() === value.toLowerCase();
    });
  }
  return array.includes(value);
}

/**
 * Normalizes a property value to an array for consistent processing
 * @param value - Property value (can be string, array, or other)
 * @returns Array representation of the value
 */
export function normalizeAsArray(value: any): any[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== ""); // remove potential empty strings
  }

  // For non-string, non-array values, wrap in array
  return [value];
}

/**
 * Toggles a value in an array, preserving the original data type
 * @param originalValue - The original property value
 * @param valueToToggle - The value to toggle
 * @param ignoreCase - Whether to ignore case differences
 * @returns The new property value with the same type as original
 */
export function toggleValueInArray(
  originalValue: any,
  valueToToggle: any,
  ignoreCase: boolean = false
): any {
  const wasArray = Array.isArray(originalValue);
  const arrayValue = normalizeAsArray(originalValue);

  // Filter out the toggle value
  const filteredArray = arrayValue.filter(
    (item) => !isEqual(item, valueToToggle, ignoreCase)
  );

  // Add toggle value if it wasn't in the original array
  const wasIncluded = arrayValue.some((item) =>
    isEqual(item, valueToToggle, ignoreCase)
  );

  const newArray = wasIncluded
    ? filteredArray
    : [...filteredArray, valueToToggle];

  // Preserve original data type
  if (wasArray) {
    return newArray;
  } else if (typeof originalValue === "string") {
    return newArray.join(", ");
  } else {
    // For single values, return the array or single value
    return newArray.length === 1 ? newArray[0] : newArray;
  }
}

type CompareType = "equal" | "includes";
type CompareFlag = "ignore-case";

/**
 * Main comparison function that replaces the old compare() function
 * @param propertyValue - The property value to check
 * @param targetValue - The value to compare against
 * @param type - Comparison type: "equal" or "includes"
 * @param ignoreCase - Whether to ignore case differences
 * @returns true if the comparison matches
 */
export function comparePropertyValue(
  propertyValue: any,
  targetValue: any,
  type: CompareType,
  flags: CompareFlag[] = []
): boolean {
  switch (type) {
    case "equal":
      return isEqual(propertyValue, targetValue, flags.includes("ignore-case"));
    case "includes":
      const normalizedArray = normalizeAsArray(propertyValue);
      return includesValue(
        normalizedArray,
        targetValue,
        flags.includes("ignore-case")
      );
    default:
      throw new Error(
        `Invalid comparison type: "${type}". Valid types are: "equal", "includes"`
      );
  }
}
