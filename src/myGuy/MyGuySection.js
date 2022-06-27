import React, { useState } from "react";
import { TabBar } from "../misc/elements/TabButton";
import bg from "../images/bg_section_title.png";
import ItemPage from "./ItemPage";
import LootPage from "./LootPage";
import StatementsPage from "./StatementsPage";
import AlliesPage from "./AlliesPage";
import StatsPageGuy from "./StatsPageGuy";
import MediaPage from "./MediaPage";
import userStore from "../stores/userStore";
import PleaseLogInField from "../sections/main/PleaseLogInField";

const MyGuySection = () => {
  const [activeTab, setActiveTab] = useState("Item");
  const { loggedIn } = userStore();
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
      {!loggedIn && <PleaseLogInField />}
      {activeTab == "Item" && loggedIn && <ItemPage />}
      {activeTab == "Loot" && loggedIn && <LootPage />}
      {activeTab == "Statements" && loggedIn && <StatementsPage />}
      {activeTab == "Allies" && loggedIn && <AlliesPage />}
      {activeTab == "Stats" && loggedIn && <StatsPageGuy />}
      {activeTab == "Media" && loggedIn && <MediaPage />}
    </div>
  );
};

export default MyGuySection;
