/**
 * Sets a nested property value in an object using dot notation
 * This allows updating deeply nested properties like "Account.FullName" or "Person.Email"
 * Also supports array access with [index] notation like "items[0].name" or "tags[1]"
 *
 * @param obj - The object to set the property in
 * @param path - The dot notation path to the property (supports array indices)
 * @param value - The value to set
 * @returns A new object with the property set (immutable update)
 *
 * @example
 * const user = {
 *   Account: { FullName: "John Doe" },
 *   Person: { Email: "john@example.com" },
 *   Tags: ["premium", "active"],
 *   Orders: [{ id: 1, name: "Order 1" }, { id: 2, name: "Order 2" }]
 * };
 * setNestedProperty(user, "Account.FullName", "Jane Doe");
 * setNestedProperty(user, "Tags[0]", "vip");
 * setNestedProperty(user, "Orders[1].name", "Updated Order");
 */
export function setNestedProperty(obj: any, path: string, value: any): any {
  if (!obj || !path) return obj;

  const parts = path.split(".");
  const result = { ...obj };
  let current = result;

  // Navigate to the parent of the target property
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];

    // Check if this part contains an array index
    const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, propertyName, indexStr] = arrayMatch;
      const index = parseInt(indexStr, 10);

      // Ensure the property exists and is an array
      if (!(propertyName in current) || !Array.isArray(current[propertyName])) {
        current[propertyName] = [];
      } else {
        current[propertyName] = [...current[propertyName]];
      }

      // Ensure the array is long enough
      while (current[propertyName].length <= index) {
        current[propertyName].push(null);
      }

      // Navigate to the array element
      if (
        current[propertyName][index] === null ||
        typeof current[propertyName][index] !== "object"
      ) {
        current[propertyName][index] = {};
      } else {
        current[propertyName][index] = { ...current[propertyName][index] };
      }

      current = current[propertyName][index];
    } else {
      // Regular object property
      if (
        !(part in current) ||
        typeof current[part] !== "object" ||
        current[part] === null
      ) {
        current[part] = {};
      } else {
        current[part] = { ...current[part] };
      }
      current = current[part];
    }
  }

  // Set the final property
  const finalPart = parts[parts.length - 1];
  const finalArrayMatch = finalPart.match(/^(.+)\[(\d+)\]$/);

  if (finalArrayMatch) {
    const [, propertyName, indexStr] = finalArrayMatch;
    const index = parseInt(indexStr, 10);

    // Ensure the property exists and is an array
    if (!(propertyName in current) || !Array.isArray(current[propertyName])) {
      current[propertyName] = [];
    } else {
      current[propertyName] = [...current[propertyName]];
    }

    // Ensure the array is long enough
    while (current[propertyName].length <= index) {
      current[propertyName].push(null);
    }

    // Set the array element
    current[propertyName][index] = value;
  } else {
    // Regular property
    current[finalPart] = value;
  }

  return result;
}

/**
 * Gets a nested property value from an object using dot notation
 * This allows accessing deeply nested properties like "Account.FullName" or "Person.Email"
 * Also supports array access with [index] notation like "items[0].name" or "tags[1]"
 *
 * @param obj - The object to get the property from
 * @param path - The dot notation path to the property (supports array indices)
 * @returns The value at the specified path, or undefined if not found
 *
 * @example
 * const user = {
 *   Account: { FullName: "John Doe" },
 *   Person: { Email: "john@example.com" },
 *   Tags: ["premium", "active"],
 *   Orders: [{ id: 1, name: "Order 1" }, { id: 2, name: "Order 2" }]
 * };
 * getNestedProperty(user, "Account.FullName"); // Returns "John Doe"
 * getNestedProperty(user, "Person.Email"); // Returns "john@example.com"
 * getNestedProperty(user, "Tags[0]"); // Returns "premium"
 * getNestedProperty(user, "Orders[1].name"); // Returns "Order 2"
 * getNestedProperty(user, "Account.NonExistent"); // Returns undefined
 */
export function getNestedProperty(obj: any, path: string): any {
  if (!obj || !path) return undefined;

  // Split by dots, but handle array indices properly
  const parts = path.split(".");
  let current = obj;

  for (const part of parts) {
    if (current === null || current === undefined) return undefined;

    // Check if this part contains an array index
    const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, propertyName, indexStr] = arrayMatch;
      const index = parseInt(indexStr, 10);

      if (!Array.isArray(current[propertyName])) return undefined;
      current = current[propertyName][index];
    } else {
      current = current[part];
    }
  }

  return current;
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified delay has elapsed since the last time it was invoked.
 * Each time the debounced function is invoked, it cancels the previous delayed invocation
 * and reschedules a new one.
 *
 * @param func - The function to debounce
 * @param delay - The number of milliseconds to delay
 * @returns A debounced version of the function
 *
 * @example
 * const debouncedSave = debounce((data) => saveToAPI(data), 300);
 * debouncedSave("data1"); // Will be cancelled
 * debouncedSave("data2"); // Will be cancelled
 * debouncedSave("data3"); // Only this will execute after 300ms
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}
