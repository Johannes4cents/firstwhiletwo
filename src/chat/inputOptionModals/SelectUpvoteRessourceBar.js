import React from "react";
import useOnHover from "../../hooks/useOnHover";
import { ressources } from "../../misc/lists/otherLists";
import RessourceImage from "../../ressources/RessourceImage";
import chatStore from "../../stores/chatStore";
import miscStore from "../../stores/miscStore";

const SelectUpvoteRessourceBar = () => {
  const { closeModal, updateLastActive } = miscStore();
  const { setMsgRessources } = chatStore();
  const selectRessource = (ressource) => {
    updateLastActive();
    setMsgRessources(ressource);
    closeModal();
  };

  return (
    <div
      className="divRow"
      style={{
        border: "1px solid white",
        borderRadius: "2rem/2rem",
        paddingTop: "2px",
        paddingBottom: "2px",
        paddingLeft: "8px",
        paddingRight: "5px",
        backgroundColor: "#4f4f4f",
      }}
    >
      {ressources.map((r, index) => {
        return (
          <ResHolder
            r={r}
            index={index}
            selectRessource={selectRessource}
            key={r}
          />
        );
      })}
    </div>
  );
};

const ResHolder = ({ r, index, selectRessource }) => {
  const hover = useOnHover({ item: r, hoverDescription: r });
  return (
    <div>
      <div
        {...hover.divProps}
        className="divRow"
        ressource={r}
        key={r}
        onClick={() => selectRessource(r)}
        style={{
          marginRight: "5px",
          backgroundColor: index % 2 == 0 ? "#5f5f5f" : "#3f3f3f",
        }}
      >
        <img src={`/images/ressources/res_${r}.png`} className="icon25" />
      </div>
      {hover.hoverDescription}
    </div>
  );
};

export default SelectUpvoteRessourceBar;
