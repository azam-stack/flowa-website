import { useEffect } from "react";

/** Marks the document while a tangerine hero is mounted, so the nav can float transparent over it. */
export function useOrangeTop() {
  useEffect(() => {
    document.documentElement.dataset.orangeTop = "1";
    return () => {
      delete document.documentElement.dataset.orangeTop;
    };
  }, []);
}
