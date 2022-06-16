import React from "react";
import MessageFilterSection from "./MessageFilterSection";
import MyStrainsBar from "./MyStrainsBar";
import SuggestedStrainsBar from "./SuggestedStrainsBar";

const StrainsArea = () => {
  return (
    <div className="divColumn" style={{ height: "100%" }}>
      <SuggestedStrainsBar />
      <MyStrainsBar />
      <MessageFilterSection />
    </div>
  );
};

export default StrainsArea;
