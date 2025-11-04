import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current device is mobile
 * @param breakpoint - The breakpoint in pixels (default: 640px)
 * @returns boolean indicating if the device is mobile
 */
export function useIsMobile(breakpoint: number = 640): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

