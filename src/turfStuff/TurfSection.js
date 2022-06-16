import React, { useState } from "react";
import { TabBar } from "../misc/elements/TabButton";
import bg from "../images/bg_section_title.png";
import FlagsPage from "./FlagsPage";
import StatsPage from "./StatsPage";
import MyTurfPage from "./MyTurfPage";
import PopulationPage from "./PopulationPage";

const TurfSection = () => {
  const [activeTab, setActiveTab] = useState("Flags");
  return (
    <div
      className="divColumn"
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <div
        className="divRow"
        style={{
          width: "100%",
          marginBottom: "5px",
          marginTop: "5px",
          backgroundImage: `url(${bg})`,
          borderRadius: "1rem/1rem",
          height: "35px",
          borderBottomLeftRadius: "1rem/1rem",
          textAlign: "center",
        }}
      >
        <div className="textBoldWhite" style={{ flex: 1, color: "lightgray" }}>
          Turf
        </div>
      </div>
      <TabBar
        tabs={["Flags", "Stats", "My Turf", "Population"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab == "Flags" && <FlagsPage />}
      {activeTab == "Stats" && <StatsPage />}
      {activeTab == "My Turf" && <MyTurfPage />}
      {activeTab == "Population" && <PopulationPage />}
    </div>
  );
};

export default TurfSection;
