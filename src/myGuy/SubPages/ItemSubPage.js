import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import userStore from "../../stores/userStore";

const fist = {
  image: "/images/icons/icon_fist.png",
  name: { english: "Fist", german: "Faust" },
};

const ItemSubPage = () => {
  const [displayedItem, setDisplayedItem] = useState(fist);
  const { equippedItem, info } = userStore();

  useEffect(() => {
    if (equippedItem) setDisplayedItem(equippedItem);
  }, [equippedItem]);

  return (
    <div
      className="divColumn"
      style={{
        flex: 1,
        border: "1px solid grey",
        borderRadius: ".5rem/.5rem",
        backgroundColor: "#4f4f4f",
        margin: "10px",
      }}
    >
      <div className="textBoldWhite">
        {displayedItem.name[info ? info.language : "english"]}
      </div>
      <div className="divRow" style={{ width: "100%" }}>
        <img
          src={displayedItem.image}
          style={{
            objectFit: "contain",
            maxHeight: "120px",
            marginLeft: "20px",
            marginBottom: "5px",
          }}
        />
      </div>
    </div>
  );
};

export default ItemSubPage;
