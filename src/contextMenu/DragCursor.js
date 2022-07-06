import React, { useRef, useEffect, useState } from "react";
import miscStore from "../stores/miscStore";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/fireInit";
import useMousePosition from "../hooks/useMousePosition";
import GenericCursor from "./cursors/GenericCursor";
import userStore from "../stores/userStore";

const DragCursor = () => {
  const { dragCursor } = miscStore();
  const { info } = userStore();
  const [dragElement, setDragElement] = useState(null);
  const { x, y } = useMousePosition();

  useEffect(() => {
    if (dragCursor != null) {
      const elementObj = {
        specialRessource: (
          <GenericCursor
            text={dragCursor.item.name}
            image={"/images/icons/icon_statement.png"}
          />
        ),
        loot: (
          <GenericCursor
            text={dragCursor.item.name[info.language]}
            image={dragCursor.item.imgUrl}
          />
        ),

        media: (
          <GenericCursor
            text={dragCursor.item.name}
            image={dragCursor.item.url}
            imageSize={"icon30"}
            fontSize={18}
          />
        ),
      };
      setDragElement(elementObj[dragCursor.type]);
    }
  }, [dragCursor]);
  return (
    <div
      className="cursor"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      {dragCursor != null && dragElement}
    </div>
  );
};

export default DragCursor;
