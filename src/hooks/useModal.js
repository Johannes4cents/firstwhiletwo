import React, { useState } from "react";
import miscStore from "../stores/miscStore";
import useMousePosition from "./useMousPosition";

const useModal = ({ modalContent, offsetX = 0, offsetY = 0 }, onClick) => {
  const mousePosition = useMousePosition();
  const [openPos, setOpenPos] = useState({ x: 0, y: 0 });
  const { closeModal, openModal, modalOpen } = miscStore();

  const open = () => {
    console.log("openening Modal - ");
    setOpenPos({ x: mousePosition.x, y: mousePosition.y });
    openModal(true);
  };
  return {
    open,
    element: (
      <div>
        {modalOpen && (
          <div>
            <div className="overlayClear" onClick={() => closeModal()} />
            <div
              className="modalContent"
              style={{
                left: `${openPos.x - offsetX}px`,
                top: `${openPos.y - offsetY}px`,
                zIndex: 1,
              }}
            >
              {modalContent}
            </div>
          </div>
        )}
      </div>
    ),
  };
};

export default useModal;
