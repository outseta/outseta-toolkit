import { useEffect } from "react";
import { init } from "@outseta/sdk";

export function OutsetaProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    init();
  }, []);

  return <>{children}</>;
}
