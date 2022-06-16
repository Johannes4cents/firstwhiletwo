import React, { useState } from "react";
import useModal from "../hooks/useModal";
import RessourceImage from "../ressources/RessourceImage";
import chatStore from "../stores/chatStore";
import SelectUpvoteRessourceBar from "./inputOptionModals/SelectUpvoteRessourceBar";

const InputOptionsBar = ({ height }) => {
  const modal = useModal({
    modalContent: <SelectUpvoteRessourceBar />,
    translate: "(-100% -100%)",
    offsetY: 30,
  });
  const { selectedMsgRessources } = chatStore();
  const onRessourceClicked = () => {
    modal.open();
  };
  return (
    <div className="inputOptionsBar" style={{ marginRight: "5px" }}>
      <RessourceImage
        selectedRessources={selectedMsgRessources}
        ressource={selectedMsgRessources[0]}
        onClick={onRessourceClicked}
      />
      {modal.element}
    </div>
  );
};

export default InputOptionsBar;
