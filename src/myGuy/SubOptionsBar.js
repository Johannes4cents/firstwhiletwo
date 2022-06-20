import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SubOption from "../misc/elements/SubOption";

const SubOptionsBar = ({ catList, selectedCat, setSelectedCat }) => {
  return (
    <div
      className="divRow"
      style={{ width: "100%", justifyContent: "space-around" }}
    >
      {catList.map((c) => {
        return (
          <SubOption
            key={c}
            name={c}
            selectedOption={selectedCat}
            onClick={setSelectedCat}
          />
        );
      })}
    </div>
  );
};

export default SubOptionsBar;
