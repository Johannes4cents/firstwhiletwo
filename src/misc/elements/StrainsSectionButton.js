import React, { useState } from "react";
import useOnHover from "../../hooks/useOnHover";
import bg from "../../images/bg_strain_section";
const StrainsSectionButton = ({ section, activeSection, setActiveSection }) => {
  const hover = useOnHover({
    active: activeSection,
    item: section,
  });
  return (
    <div
      {...hover.divProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave
      className="divColumn"
      style={{ backgroundImage: `url(${bg})`, color: hover.textColor }}
      onClick={() => {
        setActiveSection(section);
      }}
    >
      {section}
    </div>
  );
};

export default StrainsSectionButton;
