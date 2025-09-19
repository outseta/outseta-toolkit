import { set, get, debounce, cloneDeep } from "lodash";

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

  // Use lodash set with a deep clone to maintain immutability
  const result = cloneDeep(obj);
  set(result, path, value);
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
  return get(obj, path);
}

// Re-export lodash debounce for consistency
export { debounce };

/**
 * Computes the final user object by applying pending updates to the server user
 * This creates a merged object where pending updates override server values
 *
 * @param serverUser - The user object from the server (source of truth)
 * @param pendingUpdates - Array of pending updates to apply
 * @returns The computed user object with pending updates applied
 *
 * @example
 * const serverUser = { Account: { FullName: "John" }, Person: { Email: "john@example.com" } };
 * const pendingUpdates = [
 *   { updates: { "Account.FullName": "Jane" }, timestamp: 1234567890, id: "1" }
 * ];
 * computeUser(serverUser, pendingUpdates);
 * // Returns: { Account: { FullName: "Jane" }, Person: { Email: "john@example.com" } }
 */
export function computeUser(
  serverUser: any,
  pendingUpdates: Array<{
    updates: Record<string, any>;
    timestamp: number;
    id: string;
  }>
): any {
  if (!serverUser) return null;

  // Start with a deep copy of the server user using lodash cloneDeep
  let computedUser = cloneDeep(serverUser);

  // Apply each pending update in order
  for (const pendingUpdate of pendingUpdates) {
    for (const [propertyName, value] of Object.entries(pendingUpdate.updates)) {
      computedUser = setNestedProperty(computedUser, propertyName, value);
    }
  }

  return computedUser;
}
