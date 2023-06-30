import { isTouchDevice } from "@/utils/utils";
import { useEffect, useState } from "react";

// WHETHER VIEWPORT WIDTH IS OF MOBILE DIMENSIONS
function useMobileSizeState(isMobile: any, setIsMobile: any) {
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 769) {
        setIsMobile(true);
      } else if (viewportWidth > 769) {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
}

// WHETHER VIEWPORT WIDTH IS OF MOBILE DIMENSIONS
function useGetScreenSize() {
  const [viewport, setViewport] = useState({ width: window.innerWidth });

  useEffect(() => {
    function handleResize() {
      setViewport({ width: window.innerWidth });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewport.width < 769;
  const isTablet = viewport.width >= 769 && viewport.width < 1280;
  const isDesktop = viewport.width >= 1280;

  return { viewport, isMobile, isTablet, isDesktop };
}

function useHasTouched() {
  const [isTouchOrSwipeDetected, setIsTouchOrSwipeDetected] = useState(false);

  function handleTouchStart() {
    setIsTouchOrSwipeDetected(true);
  }

  function handleTouchMove() {
    setIsTouchOrSwipeDetected(true);
  }
  useEffect(() => {
    if (isTouchDevice()) {
      document.addEventListener("touchstart", handleTouchStart);
      return () => document.removeEventListener("touchstart", handleTouchStart);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice()) {
      document.addEventListener("touchmove", handleTouchMove);
      return () => document.removeEventListener("touchmove", handleTouchMove);
    }
  }, []);

  return isTouchOrSwipeDetected;
}

export { useMobileSizeState, useGetScreenSize, useHasTouched };
