import React from "react";
import StrainsSectionButton from "../misc/elements/StrainsSectionButton";

const StrainSectionBar = ({ sections, activeSection, setActiveSection }) => {
  return (
    <div className="divRow" style={{ width: "100%", height: "40px" }}>
      {sections.map((s) => (
        <StrainsSectionButton
          key={s}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          section={s}
        />
      ))}
    </div>
  );
};

export default StrainSectionBar;
