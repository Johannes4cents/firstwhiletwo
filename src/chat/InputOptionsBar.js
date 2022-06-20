import React, { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import RessourceImage from "../ressources/RessourceImage";
import chatStore from "../stores/chatStore";
import SelectUpvoteRessourceBar from "./inputOptionModals/SelectUpvoteRessourceBar";

const InputOptionsBar = ({ height }) => {
  const { attachedItem } = chatStore();
  const modal = useModal({
    modalContent: <SelectUpvoteRessourceBar />,
    translate: "(-100% -100%)",
    offsetY: 30,
  });
  const { selectedMsgRessources, setMsgRessources } = chatStore();
  const onRessourceClicked = () => {
    if (attachedItem == null) modal.open();
    else setMsgRessources(attachedItem.upvotes[0] ?? "cash");
  };

  useEffect(() => {
    console.log("selectedMsgRessources are -", selectedMsgRessources);
  }, [selectedMsgRessources]);
  return (
    <div className="divRow" style={{ marginRight: "5px" }}>
      {selectedMsgRessources.map((r) => {
        return (
          <div key={r} style={{ marginRight: "5px" }}>
            <RessourceImage
              selectedRessources={selectedMsgRessources}
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
