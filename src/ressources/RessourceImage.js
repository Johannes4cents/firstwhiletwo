import React from "react";
import useOnHover from "../hooks/useOnHover";

const RessourceImage = ({ ressource, selectedRessource, onClick }) => {
  const hover = useOnHover({
    item: ressource,
    active: selectedRessource,
    imageSelected: `/images/ressources/res_${ressource}.png`,
    imageUnselected: `/images/ressources/res_${ressource}_unselected.png`,
  });
  return (
    <div
      onClick={() => onClick(ressource)}
      className="divRow"
      style={{ position: "relative" }}
      {...hover.divProps}
    >
      <img src={hover.activeImage} className="icon20" />
      <img
        src="/images/icons/icon_upvote.png"
        className="icon15"
        style={{ position: "absolute" }}
      />
    </div>
  );
};

export default RessourceImage;
