import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { makeDescriptionField } from "../misc/helperFuncs";
import listsStore from "../stores/listsStore";
import DescriptionsBar from "./DescriptionsBar";
import ItemAttachedHolder from "./ItemAttachedHolder";
import ItemMyGuyHolder from "./ItemMyGuyHolder";
import SubOptionsBar from "./SubOptionsBar";

const LootPage = () => {
  const catList = ["Items", "Spells", "Skills", "Creatures", "buildings"];

  const [selectedLootCat, setSelectedLootCat] = useState("Items");
  const [displayedItems, setDisplayedItems] = useState([]);
  const { loot } = listsStore();

  useEffect(() => {
    setDisplayedItems(
      loot.filter((i) => i.type == selectedLootCat.toLowerCase())
    );
  }, [selectedLootCat, loot]);

  return (
    <div className="sectionBg">
      <SubOptionsBar
        catList={catList}
        setSelectedCat={setSelectedLootCat}
        selectedCat={selectedLootCat}
      />
      <DescriptionsBar
        sortingList={displayedItems}
        setSortingList={setDisplayedItems}
        fields={[
          makeDescriptionField("Locked", null, "45px"),
          makeDescriptionField("Name", null, null, 1),
        ]}
        startField={"name"}
      />
      <div className="divColumn" style={{ overflow: "auto", width: "100%" }}>
        {displayedItems.map((i) =>
          i.attached ? (
            <ItemAttachedHolder key={i.id} item={i} />
          ) : (
            <ItemMyGuyHolder key={i.id} item={i} />
          )
        )}
      </div>
    </div>
  );
};

export default LootPage;
