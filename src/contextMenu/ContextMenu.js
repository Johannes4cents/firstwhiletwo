import React from "react";
import miscStore from "../stores/miscStore";
import useContextMenu from "./useContextMenu";

const ContextMenu = () => {
  const { xPos, yPos, showMenu } = useContextMenu();
  const { contextContent } = miscStore();

  return (
    <div>
      {showMenu && (
        <div>
          <div className="overlayClear" style={{ zIndex: "1" }} />
          <div
            style={{
              left: `${xPos}`,
              top: `${yPos}`,
              position: "absolute",
              zIndex: "1",
            }}
          >
            {contextContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
