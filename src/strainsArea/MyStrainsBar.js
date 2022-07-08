import React, { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import SearchBar from "../misc/elements/SearchBar";
import SearchStrainsBar from "../misc/elements/SearchStrainsBar";
import listsStore from "../stores/listsStore";
import StrainListHolder from "./holder/StrainListHolder";
import MyChatsPage from "./myStrainsSubPages/MyChatsPage";
import MyStrainsPage from "./myStrainsSubPages/MyStrainsPage";
import SavedPage from "./myStrainsSubPages/SavedPage";
import StrainSectionBar from "./StrainSectionBar";

const MyStrainsBar = () => {
  const [displayedStrains, setDisplayedStrains] = useState([]);
  const sections = ["Chats", "Strains", "Saved"];
  const [activeSection, setActiveSection] = useState("Chats");

  const sectionHolder = {
    Chats: <MyChatsPage />,
    Strains: <MyStrainsPage />,
    Saved: <SavedPage />,
  };

  return (
    <div
      className="divColumn"
      style={{ flex: 1, overflow: "auto", marginTop: "4px" }}
    >
      <div
        className="bgSection"
        style={{
          width: "225px",
        }}
      >
        My Strains
      </div>
      <SearchStrainsBar
        setDisplayedStrains={setDisplayedStrains}
        displayedStrains={displayedStrains}
      />
      <StrainSectionBar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {sectionHolder[activeSection]}
    </div>
  );
};

export default MyStrainsBar;
