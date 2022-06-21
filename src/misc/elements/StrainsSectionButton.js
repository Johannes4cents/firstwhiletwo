import React, { useState } from "react";
import useOnHover from "../../hooks/useOnHover";
import bg from "../../images/bg_strain_section.png";
const StrainsSectionButton = ({ section, activeSection, setActiveSection }) => {
  const hover = useOnHover({
    active: activeSection,
    item: section,
  });
  return (
    <div
      {...hover.divProps}
      className="divColumn"
      style={{
        backgroundImage: `url(${bg})`,
        justifyContent: "center",
        flex: 1,
        height: "100%",
        backgroundRepeat: "no-repeat",
        flexWrap: "wrap",
      }}
      onClick={() => {
        setActiveSection(section);
      }}
    >
      <div
        className="textBoldWhite"
        style={{
          textAlign: "center",
          color: hover.textColor,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {section}
      </div>
    </div>
  );
};

export default StrainsSectionButton;
