import React, { useState } from "react";
import { TabBar } from "../misc/elements/TabButton";
import bg from "../images/bg_section_title.png";
import ItemPage from "./ItemPage";
import LootPage from "./LootPage";
import StatementsPage from "./StatementsPage";
import AlliesPage from "./AlliesPage";
import StatsPageGuy from "./StatsPageGuy";
import MediaPage from "./MediaPage";

const MyGuySection = () => {
  const [activeTab, setActiveTab] = useState("Item");
  return (
    <div
      className="divColumn"
      style={{
        flex: 1,
        width: "100%",
        overflow: "auto",
        overflowX: "hidden",
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
          My Guy
        </div>
      </div>
      <TabBar
        tabs={["Item", "Loot", "Statements", "Allies", "Stats", "Media"]}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      {activeTab == "Item" && <ItemPage />}
      {activeTab == "Loot" && <LootPage />}
      {activeTab == "Statements" && <StatementsPage />}
      {activeTab == "Allies" && <AlliesPage />}
      {activeTab == "Stats" && <StatsPageGuy />}
      {activeTab == "Media" && <MediaPage />}
    </div>
  );
};

export default MyGuySection;
