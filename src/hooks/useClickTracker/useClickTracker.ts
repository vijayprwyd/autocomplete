import { RefObject, useCallback, useEffect, useState } from "react";

export function useClickTracker(node: RefObject<HTMLElement>, shouldTrackClick = false) {
  const [clickedOutside, setClickedOutside] = useState(false);

  const handleClickOutside = useCallback(
    e => {
      if (node?.current?.contains(e.target)) return;
      // outside click
      setClickedOutside(true);
    },
    [node]
  );

  useEffect(() => {
    if (!shouldTrackClick) {
      if (clickedOutside) setClickedOutside(false);
      document.removeEventListener("mouseup", handleClickOutside);
    } else if (shouldTrackClick) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shouldTrackClick, handleClickOutside, clickedOutside]);

  return clickedOutside;
}
