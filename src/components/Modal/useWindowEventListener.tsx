import { useEffect } from "react";

export const useWindowEventListener = (
  event: keyof WindowEventMap,
  listener: (event: Event) => void
) => {
  useEffect(() => {
    window.addEventListener(event, listener);

    return () => {
      window.removeEventListener(event, listener);
    };
  }, [event, listener]);
};
