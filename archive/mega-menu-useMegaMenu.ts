import { useCallback, useEffect, useRef, useState } from "react";

const OPEN_INTENT_MS = 100;
const CLOSE_GRACE_MS = 200;
const CLOSE_ANIM_MS = 150;

/**
 * Shared open/close state machine for a row of mega-menu triggers.
 * - Hover: 100ms intent delay before opening from closed; switching directly
 *   between two triggers cross-fades with no delay (no close-then-open).
 * - Leave: 200ms grace before closing, so a diagonal mouse path into the
 *   panel doesn't trigger a close.
 * - `renderedKey` lags `activeKey` by CLOSE_ANIM_MS so the panel can play a
 *   closing transition before it unmounts.
 */
export function useMegaMenu() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [renderedKey, setRenderedKey] = useState<string | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const unmountTimer = useRef<ReturnType<typeof setTimeout>>();

  const clearTimers = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(unmountTimer.current);
  };

  const openImmediate = useCallback((key: string) => {
    clearTimers();
    setRenderedKey(key);
    setActiveKey(key);
  }, []);

  const scheduleOpen = useCallback(
    (key: string) => {
      clearTimeout(closeTimer.current);
      clearTimeout(unmountTimer.current);
      if (activeKey !== null && activeKey !== key) {
        // cross-fade: switch straight away, no intent delay
        setRenderedKey(key);
        setActiveKey(key);
        return;
      }
      clearTimeout(openTimer.current);
      openTimer.current = setTimeout(() => {
        setRenderedKey(key);
        setActiveKey(key);
      }, OPEN_INTENT_MS);
    },
    [activeKey],
  );

  const scheduleClose = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setActiveKey(null);
      unmountTimer.current = setTimeout(() => setRenderedKey(null), CLOSE_ANIM_MS);
    }, CLOSE_GRACE_MS);
  }, []);

  const closeAll = useCallback(() => {
    clearTimers();
    setActiveKey(null);
    setRenderedKey(null);
  }, []);

  useEffect(() => clearTimers, []);

  return {
    activeKey,
    renderedKey,
    isOpen: (key: string) => activeKey === key,
    isRendered: (key: string) => renderedKey === key,
    openImmediate,
    scheduleOpen,
    scheduleClose,
    closeAll,
  };
}
