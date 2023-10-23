import { useState, useEffect } from "react";

// TODO: this state should live the store to avoid having multiple listeners
export function useScreenSize() {
 
  const [state, setState] = useState({
    isMobile: window.innerWidth <= 480,
    width: window.innerWidth,
    height: window.innerHeight,
  });
 
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  function handleWindowSizeChange() {
    setState({
      isMobile: window.innerWidth <= 480,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  return state;
}
