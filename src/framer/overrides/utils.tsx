import React, {
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { isFramerCanvas } from "./useAuthStore";

export function dynamicGridHeight(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return forwardRef((props, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const { style, ...otherProps } = props;

    // Forward the ref to the internal ref
    useImperativeHandle(ref, () => internalRef.current);

    const hideEmptyChildren = () => {
      if (!internalRef.current) return;

      Array.from(internalRef.current.children).forEach((child: any) => {
        const htmlChild = child as HTMLElement;

        // Check if child is "empty"
        const isEmpty = htmlChild.children.length === 0;
        // Or if all of it's children are hidden
        const hiddenChildred = Array.from(htmlChild.children).every(
          (child) => getComputedStyle(child).display === "none"
        );

        htmlChild.style.display = isEmpty || hiddenChildred ? "none" : "";
      });
    };

    useEffect(() => {
      if (!internalRef.current) return;
      if (isFramerCanvas()) return;

      // Initial check
      hideEmptyChildren();

      // Watch for changes in child content
      const observer = new MutationObserver(() => {
        hideEmptyChildren();
      });

      observer.observe(internalRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      return () => {
        observer.disconnect();
      };
    }, []);

    return <Component {...otherProps} ref={internalRef} />;
  });
}
