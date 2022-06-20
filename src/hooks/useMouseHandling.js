import React, { useState } from "react";
import miscStore from "../stores/miscStore";
import useLongPress from "./useLongPress";

const useMouseHandling = ({
  onOneClick,
  type,
  item,
  onDoubleClick,
  onDrop,
}) => {
  const { dragCursor, setDragCursor } = miscStore();
  const [clickCount, setClickCount] = useState(0);
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 150,
  };
  const onLongPress = () => {
    if (type && item) setDragCursor({ type, item });
  };

  const onClick = (e) => {
    setClickCount((state) => state + 1);
    setTimeout(() => {
      setClickCount((state) => {
        if (state == 1) {
          if (onOneClick) onOneClick();
        } else if (state == 2) {
          if (onDoubleClick) onDoubleClick();
        }

        return 0;
      });
    }, 250);
  };

  const onMouseUp = () => {
    if (dragCursor != null && onDrop != null) onDrop(dragCursor);
  };

  const mouseEvents = useLongPress(onLongPress, onClick, defaultOptions);
  mouseEvents.onMouseUp = onMouseUp;

  return mouseEvents;
};

export default useMouseHandling;
