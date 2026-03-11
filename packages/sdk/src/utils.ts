import { set, get, cloneDeep } from "lodash-es";

export function setNestedProperty(obj: any, path: string, value: any): any {
  if (!obj || !path) return obj;
  const result = cloneDeep(obj);
  set(result, path, value);
  return result;
}

export function getNestedProperty(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  return get(obj, path);
}

export function computeUser(
  serverUser: any,
  pendingUpdates: Array<{
    updates: Record<string, any>;
    timestamp: number;
    id: string;
  }>
): any {
  if (!serverUser) return null;

  let computedUser = cloneDeep(serverUser);

  for (const pendingUpdate of pendingUpdates) {
    for (const [propertyName, value] of Object.entries(pendingUpdate.updates)) {
      computedUser = setNestedProperty(computedUser, propertyName, value);
    }
  }

  return computedUser;
}
