import { useCallback, useRef, useState } from "react";
import miscStore from "../stores/miscStore";

const useLongPress = (
  onLongPress,
  onClick,
  { shouldPreventDefault = true, delay = 300 } = {},
  onMouseUpFunc = null,
  onDrop = null,
  customMouseLeave = null
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const { dragCursor } = miscStore();
  const timeout = useRef();
  const target = useRef();

  const start = useCallback(
    (event) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick(event);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e) => {
      if (e.button != 0) return;
      start(e);
    },
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => {
      clear(e);
      if (e.button != 0) return;
      if (dragCursor != null && onDrop != null) onDrop(dragCursor);
      if (onMouseUpFunc != null) onMouseUpFunc();
    },
    onMouseLeave: (e) => {
      if (customMouseLeave) customMouseLeave(e);
      clear(e, false);
    },
    onTouchEnd: (e) => clear(e),
  };
};

const isTouchEvent = (event) => {
  return "touches" in event;
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
