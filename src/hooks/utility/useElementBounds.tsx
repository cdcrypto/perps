import { useState, useCallback, useEffect } from "react";

export interface ElementBounds {
  width: number;
  height: number;
  top: number;
  left: number;
}

/**
 * Useful for cases where you need to obtain the current dimensions and position of the div element.
 * Also contains a listener that handles the case when the user zooms in/out or resizes the viewport.
 */

export function useElementBounds<T extends HTMLElement>(): [
  (node: T | null) => void,
  ElementBounds
] {
  const [ref, setRef] = useState<T | null>(null);
  const [elementBounds, setElementBounds] = useState<ElementBounds>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const boundingClientRect = ref?.getBoundingClientRect();
  const handleSize = useCallback(() => {
    if (boundingClientRect) {
      const { top, left, width, height } = boundingClientRect;
      setElementBounds({
        top,
        left,
        height,
        width,
      });
    } else {
      setElementBounds({
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      });
    }
    // boundingClientRect might possibly be a different object in some cases,
    // so we use the values inside it, not the object itself as dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    boundingClientRect?.top,
    boundingClientRect?.left,
    boundingClientRect?.width,
    boundingClientRect?.height,
  ]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleSize);
    if (ref) {
      resizeObserver.observe(ref);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [handleSize, ref]);

  return [setRef, elementBounds];
}
