import React, { useEffect, useState } from "react";
import { getPureFirestoreFireItems } from "./handleLoot";
import SearchBar from "../../misc/elements/SearchBar";
import { getItemById } from "../../misc/helperFuncs";
import userStore from "../../stores/userStore";

const SteppingStonesBar = ({ startItems, onItemsSelected, lootItem }) => {
  const { info } = userStore();

  const [kingdomItems, setKingdomItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(startItems);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [firstLoadSafety, setFirstLoadSafety] = useState(true);

  useEffect(() => {
    onItemsSelected(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    getPureFirestoreFireItems(info, (list) => {
      setKingdomItems(list);
      setDisplayedItems(list);
    });
  }, []);

  useEffect(() => {
    if (!firstLoadSafety) {
      if (lootItem != null) {
        if (lootItem.steppingStones != null) {
          setSelectedItems(
            lootItem.steppingStones.map((id) => getItemById(id, kingdomItems))
          );
        }
      }
    } else setFirstLoadSafety(false);
  }, [lootItem]);

  const onSearch = (search) => {
    if (search.length <= 0) {
      setDisplayedItems(kingdomItems);
    } else {
      const filteredItems = kingdomItems.filter((i) =>
        i.name[info.language].toLowerCase().startsWith(search.toLowerCase())
      );
      setDisplayedItems(filteredItems);
    }
  };

  const onItemClicked = (item) => {
    if (selectedItems.map((i) => i.id).includes(item.id))
      setSelectedItems(selectedItems.filter((i) => i.id != item.id));
    else setSelectedItems([...selectedItems, item]);
  };

  return (
    <div
      className="divColumnColored"
      style={{
        width: "250px",
        borderLeft: "3px solid white",
        borderTop: "2px solid white",
        height: "100%",
      }}
    >
      <div className="textBoldWhite" style={{ marginBottom: "5px" }}>
        Stepping Stones
      </div>
      <SearchBar onSearchFunc={onSearch} />
      {displayedItems.map((i) => {
        return (
          <KingdomItemHolder
            key={i.id}
            item={i}
            onClick={onItemClicked}
            selectedItems={selectedItems}
          />
        );
      })}
    </div>
  );
};

const KingdomItemHolder = ({ item, onClick, selectedItems }) => {
  const { info } = userStore();
  return (
    <div
      className="divRowColored"
      onClick={() => onClick(item)}
      style={{ width: "200px" }}
    >
      <img
        className="icon20"
        src={
          selectedItems.map((i) => i.id).includes(item.id)
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
      />
      <div className="textBoldWhite" style={{ flex: 1, textAlign: "center" }}>
        {item.name[info.language]}
      </div>
      <img src={item.imgUrl} className="icon20" />
    </div>
  );
};

export default SteppingStonesBar;
