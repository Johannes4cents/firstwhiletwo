import React from "react";
import miscStore from "../stores/miscStore";
import useLongPress from "./useLongPress";

const useDragDrop = ({ onClick, type, item }) => {
  const { setDragCursor } = miscStore();
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 150,
  };
  const onLongPress = () => {
    setDragCursor({ type, item });
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return longPressEvent;
};

export default useDragDrop;
