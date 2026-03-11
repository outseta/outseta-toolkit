import { forwardRef } from "react";

export function withTestText(
  Component: React.ComponentType<any>,
  { text }: { text: string }
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    if (typeof text !== "string") return null;

    return <Component ref={ref} {...props} text={`TEST ${text}`} />;
  });
}
