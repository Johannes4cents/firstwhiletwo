import React, { useState } from "react";
import miscStore from "../stores/miscStore";
import CustomContextMenu from "./CustomContextMenu";
import useLongPress from "./useLongPress";

const useMouseHandling = ({
  onOneClick,
  type,
  item,
  onDoubleClick,
  onDrop,
  onMouseUp,
  rightClickOptions,
}) => {
  const { setDragCursor, setContextContent } = miscStore();
  const [clickCount, setClickCount] = useState(0);
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 150,
  };
  const onLongPress = () => {
    if (type && item) setDragCursor({ type, item });
  };

  const onClick = (e) => {
    if (e.button == 0) setClickCount((state) => state + 1);
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
    if (e.button == 2) {
      if (rightClickOptions) {
        setContextContent(<CustomContextMenu options={rightClickOptions} />);
      }
    }
  };

  const mouseEvents = useLongPress(
    onLongPress,
    onClick,
    defaultOptions,
    onMouseUp,
    onDrop
  );

  return mouseEvents;
};

export default useMouseHandling;
