import React, { useEffect, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import hoverStore from "../stores/hoverStore";

const HoverBox = () => {
  const hover = hoverStore();
  const { x, y } = useMousePosition();
  const [boxOpen, setBoxOpen] = useState(false);
  const [box, setBox] = useState(null);

  function showBox() {
    hover.setOpen(true);
  }

  useEffect(() => {
    setBoxOpen(hover.open);
    setBox(hover.box);
    if (hover.box != null && !hover.open) {
      setTimeout((e) => {
        if (!hover.open) showBox(e);
      }, 500);
    } else {
    }
  }, [hover]);

  return (
    <>
      {boxOpen && (
        <div>
          <div
            className="hoverBox"
            style={{
              left: `${x + hover.offset.x}px`,
              top: `${y + hover.offset.y}px`,
            }}
          >
            {box}
          </div>
        </div>
      )}
    </>
  );
};

export default HoverBox;
