import React, { useState } from "react";
import { capitalize } from "@mui/material";
import bg from "../../images/bg_tab.png";
import miscStore from "../../stores/miscStore";

const TabButton = ({ tab, setActiveTab, activeTab }) => {
  const [entered, setEntered] = useState(false);
  const { updateLastActive } = miscStore();

  const clickTab = () => {
    updateLastActive();
    setActiveTab(tab);
  };
  return (
    <div
      className="divRow"
      onMouseEnter={() => {
        setEntered(true);
      }}
      onMouseLeave={() => {
        setEntered(false);
      }}
      style={{ flex: 1, textAlign: "center", backgroundImage: `url(${bg})` }}
      onClick={clickTab}
    >
      <div
        className="textWhite"
        style={{
          fontStyle: "italic",
          fontSize: "14px",
          width: "100%",
          color: activeTab == tab ? "orange" : entered ? "gold" : "white",
        }}
      >
        {tab}
      </div>
    </div>
  );
};

const TabBar = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="divRow" style={{ width: "100%", textAlign: "center" }}>
      {tabs.map((t) => {
        return (
          <TabButton
            key={t}
            tab={t}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        );
      })}
    </div>
  );
};

export { TabBar };

export default TabButton;
