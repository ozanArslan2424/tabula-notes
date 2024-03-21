"use client";
import { useEffect, useState } from "react";

export function useLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setIsLargeScreen(window.matchMedia("(min-width: 768px)").matches);

    // I write this into a function for better visibility
    const handleResize = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => {
      setIsLargeScreen(e.matches);
    };

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    mediaQuery.addEventListener("change", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return {
    isLargeScreen,
  };
}

export default useLargeScreen;
