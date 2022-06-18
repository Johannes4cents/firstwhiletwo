import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../firebase/fireInit";
import FireItemHolder from "./FireItemHolder";

const FireItemsMap = ({
  collection,
  onItemClicked,
  selectedItem,
  setSelectedItem,
}) => {
  const [stuff, setStuff] = useState([]);
  useEffect(() => {
    const fireItemsRef = doc(db, "general", "fireItems");
    let listener = onSnapshot(fireItemsRef, (snapshot) => {
      const foundItem = snapshot
        .data()
        [collection].find((i) => i.id == selectedItem.id);

      if (foundItem != null) setSelectedItem(foundItem);
      setStuff(snapshot.data()[collection]);
    });
    return listener.unsubscribe;
  }, []);

  return (
    <div className="divColumnColored" style={{ width: "200px" }}>
      <div
        className="textBoldWhite"
        style={{ fontSize: "20px", color: "darkgray" }}
      >
        {collection}
      </div>
      <div
        className="divColumn"
        style={{ maxWidth: "150px", overflow: "auto" }}
      >
        {stuff.map((item) => {
          return (
            <FireItemHolder
              key={item.id}
              item={item}
              setFireItem={onItemClicked}
              selectedItem={selectedItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FireItemsMap;
