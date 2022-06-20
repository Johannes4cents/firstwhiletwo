import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import listsStore from "../stores/listsStore";
import DescriptionsBar from "./DescriptionsBar";
import ItemMyGuyHolder from "./ItemMyGuyHolder";
import SubOptionsBar from "./SubOptionsBar";

const LootPage = () => {
  const catList = ["Items", "Spells", "events", "creatures", "buildings"];
  const [sorting, setSorting] = useState({ field: "", ascending: true });
  const [selectedLootCat, setSelectedLootCat] = useState("Items");
  const [displayedItems, setDisplayedItems] = useState([]);
  const { loot } = listsStore();

  useEffect(() => {
    setDisplayedItems(
      loot.filter((i) => i.type == selectedLootCat.toLowerCase())
    );
  }, [selectedLootCat]);

  return (
    <div className="sectionBg">
      <SubOptionsBar
        catList={catList}
        setSelectedCat={setSelectedLootCat}
        selectedCat={selectedLootCat}
      />
      <DescriptionsBar
        fieldTwo={"Name"}
        sorting={sorting}
        setSorting={setSorting}
      />
      <div className="divColumn" style={{ overflow: "auto" }}>
        {displayedItems.map((i) => (
          <ItemMyGuyHolder key={i.id} item={i} />
        ))}
      </div>
    </div>
  );
};

export default LootPage;
