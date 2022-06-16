import React, { useState } from "react";
import RessourceImage from "../ressources/RessourceImage";

const InputOptionsBar = ({ height }) => {
  const [selectedRessource, setSelectedRessource] = useState("cash");

  const onRessourceClicked = () => {};
  return (
    <div className="inputOptionsBar" style={{ marginRight: "5px" }}>
      <RessourceImage
        selectedRessource={selectedRessource}
        ressource={selectedRessource}
        onClick={onRessourceClicked}
      />
    </div>
  );
};

export default InputOptionsBar;
