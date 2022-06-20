import React, { useEffect } from "react";
import useOnHover from "../../hooks/useOnHover";

const SubOption = ({ name, selectedOption, onClick }) => {
  const hover = useOnHover({
    item: name,
    active: selectedOption,
    imageSelected: `/images/suboptions/icon_${name.toLowerCase()}.png`,
    imageUnselected: `/images/suboptions/icon_${name.toLowerCase()}.png`,
    unselectedTextColor: "lightgray",
  });
  useEffect(() => {
    console.log("textColor - ", hover.textColor);
  }, [hover.textColor]);
  return (
    <div {...hover.divProps} onClick={() => onClick(name)} className="divRow">
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
