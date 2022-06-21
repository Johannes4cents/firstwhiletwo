import React, { useEffect } from "react";
import useOnHover from "../../hooks/useOnHover";
import miscStore from "../../stores/miscStore";
import { newTrim } from "../helperFuncs";

const SubOption = ({ name, selectedOption, onClick }) => {
  const { updateLastActive } = miscStore();

  const onOptionClicked = () => {
    updateLastActive();
    onClick(name);
  };
  const hover = useOnHover({
    item: name,
    active: selectedOption,
    imageSelected: `/images/suboptions/icon_${newTrim(name).replace(
      " ",
      ""
    )}.png`,
    imageUnselected: `/images/suboptions/icon_${newTrim(name).replace(
      " ",
      ""
    )}.png`,
    unselectedTextColor: "lightgray",
  });

  return (
    <div {...hover.divProps} onClick={onOptionClicked} className="divRow">
      <div style={{ color: hover.textColor, flex: 1, textAlign: "center" }}>
        {name}
      </div>
      <img
        src={hover.activeImage}
        className="icon15"
        style={{ marginLeft: "5px", marginRight: "5px" }}
      />
    </div>
  );
};

export default SubOption;
