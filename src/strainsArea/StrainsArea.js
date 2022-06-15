import React from "react";
import MyStrainsBar from "./MyStrainsBar";
import SuggestedStrainsBar from "./SuggestedStrainsBar";

const StrainsArea = () => {
  return (
    <div className="divColumn" style={{ height: "100%" }}>
      <SuggestedStrainsBar />
      <MyStrainsBar />
    </div>
  );
};

export default StrainsArea;
