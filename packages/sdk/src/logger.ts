let _cachedDebugScope: string | null = null;

const initializeDebugScope = () => {
  if (_cachedDebugScope === null) {
    _cachedDebugScope = window?.localStorage?.getItem("outseta.debug") || "";
  }
  return _cachedDebugScope;
};

function shouldLog(scope: string): boolean {
  const debugScope = initializeDebugScope();

  if (debugScope === null || debugScope === "") {
    return false;
  }

  if (debugScope === "true") {
    return true;
  }

  const scopes = debugScope.split(",").map((s) => s.trim());
  return scopes.some((debugScopeItem) => scope.startsWith(debugScopeItem));
}

export function OutsetaLogger(scope: string) {
  const fullScope = `sdk.${scope}`;
  return (...args: any[]): void => {
    if (shouldLog(fullScope)) {
      console.log(
        `[${window?.location?.origin} | outseta.${fullScope}]`,
        ...args
      );
    }
  };
}
