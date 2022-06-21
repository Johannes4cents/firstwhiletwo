import React from "react";
import { useState } from "react";
import FlagsBar from "./FlagsBar";

const FlagsPage = () => {
  const [activeFlag, setActiveFlag] = useState(1);
  return (
    <div className="sectionBg">
      <FlagsBar activeFlag={activeFlag} setActiveFlag={setActiveFlag} />
    </div>
  );
};

export default FlagsPage;
