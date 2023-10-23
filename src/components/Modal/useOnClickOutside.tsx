import { useCallback, useState } from "react";
import { useWindowEventListener } from "./useWindowEventListener";

export const useOnClickOutside = (onClickOutside: (event: Event) => void) => {
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  useWindowEventListener("mousedown", (event) => {
    if (!elementRef || elementRef.contains(event.target as Node)) {
      // user clicked inside element
      return;
    }

    onClickOutside(event);
  });

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) {
      setElementRef(node);
    }
  }, []);

  return ref;
};
