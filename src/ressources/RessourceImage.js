import React, { useEffect } from "react";
import useOnHover from "../hooks/useOnHover";
import chatStore from "../stores/chatStore";

const RessourceImage = ({ ressource, onClick, selectedRessources }) => {
  const hover = useOnHover({
    item: ressource,
    inclusionList: selectedRessources,
    imageSelected: `/images/ressources/res_${ressource}.png`,
    imageUnselected: `/images/ressources/res_${ressource}_unselected.png`,
  });
  useEffect(() => {
    console.log("hover.activeImage - ", hover.activeImage);
  }, [hover.activeImage, ressource]);
  return (
    <div
      onClick={() => onClick(ressource)}
      className="divRow"
      style={{ position: "relative" }}
      {...hover.divProps}
    >
      <img src={hover.activeImage} className="icon25" />
      <img
        src="/images/icons/icon_upvote.png"
        className="icon15"
        style={{ position: "absolute", right: 0, bottom: 0 }}
      />
    </div>
  );
};

export default RessourceImage;
