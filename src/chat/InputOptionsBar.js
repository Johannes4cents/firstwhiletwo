import React, { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import RessourceImage from "../ressources/RessourceImage";
import chatStore from "../stores/chatStore";
import SelectUpvoteRessourceBar from "./inputOptionModals/SelectUpvoteRessourceBar";

const InputOptionsBar = ({ height }) => {
  const { currentMessage } = chatStore();
  const modal = useModal({
    modalContent: <SelectUpvoteRessourceBar />,
    translate: "(-100% -100%)",
    position: "topLeft",
  });
  const onRessourceClicked = () => {
    if (currentMessage.attachedItems.length < 1) modal.open();
  };

  return (
    <div className="divRow" style={{ marginRight: "5px" }}>
      {currentMessage.ressources.map((r) => {
        return (
          <div key={r} style={{ marginRight: "5px" }}>
            <RessourceImage
              selectedRessources={currentMessage.ressources}
              ressource={r}
              onClick={onRessourceClicked}
            />
          </div>
        );
      })}

      {modal.element}
    </div>
  );
};

export default InputOptionsBar;
