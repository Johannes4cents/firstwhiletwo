import React from "react";
import RessourceImage from "../../ressources/RessourceImage";
import chatStore from "../../stores/chatStore";
import miscStore from "../../stores/miscStore";

const SelectUpvoteRessourceBar = () => {
  console.log("modal open");
  const ressourceList = [
    "cash",
    "diplomacy",
    "energy",
    "fear",
    "food",
    "happiness",
    "health",
    "knowledge",
    "love",
    "mana",
    "oil",
    "rage",
    "religion",
    "science",
    "weapons",
  ];

  const { closeModal } = miscStore();
  const { setMsgRessource } = chatStore();
  const selectRessource = (ressource) => {
    setMsgRessource(ressource);
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
      }}
    >
      {ressourceList.map((r) => {
        return (
          <div
            className="divRow"
            ressource={r}
            key={r}
            onClick={() => selectRessource(r)}
            style={{ marginRight: "5px" }}
          >
            <img src={`/images/ressources/res_${r}.png`} className="icon25" />
          </div>
        );
      })}
    </div>
  );
};

export default SelectUpvoteRessourceBar;
