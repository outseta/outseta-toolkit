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

    const hasVisibleContent = (element: HTMLElement): boolean => {
      // Check if element itself is hidden
      if (getComputedStyle(element).display === "none") {
        return false;
      }

      // If no children, check if it has text content
      if (element.children.length === 0) {
        return (element.textContent?.trim().length ?? 0) > 0;
      }

      // Recursively check if any child has visible content
      return Array.from(element.children).some((child) =>
        hasVisibleContent(child as HTMLElement)
      );
    };

    const hideEmptyChildren = () => {
      if (!internalRef.current) return;

      Array.from(internalRef.current.children).forEach((child: any) => {
        const htmlChild = child as HTMLElement;

        // Check if child has any visible content recursively
        const hasContent = hasVisibleContent(htmlChild);

        htmlChild.style.display = hasContent ? "" : "none";
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
