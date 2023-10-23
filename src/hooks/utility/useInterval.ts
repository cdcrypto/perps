import { useEffect, useRef } from "react";

export function useInterval(
  callback: () => unknown,
  delay: number | null,
  initialCall = false
) {
  const savedCallback = useRef(callback);
  const isInitialCallComplete = useRef<boolean>(!initialCall);
  const intervalId = useRef<NodeJS.Timeout>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
    if (!isInitialCallComplete.current) {
      savedCallback.current();
      isInitialCallComplete.current = true;
    }
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
      isInitialCallComplete.current = true;
    }

    if (delay !== null) {
      intervalId.current = setInterval(tick, delay);
      return () => clearInterval(intervalId.current);
    }
  }, [delay]);
}
