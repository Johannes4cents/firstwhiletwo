import React, { useEffect } from "react";
import FireImage from "../misc/elements/FireImage";
import userStore from "../stores/userStore";

const ItemAttachedHolder = ({ item }) => {
  const { info } = userStore();
  useEffect(() => {
    console.log("item is - ", item);
  }, [item]);

  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        backgroundColor: "lightblue",
        textAlign: "center",
      }}
    >
      <div className="textBoldWhite" style={{ flex: 1 }}>
        {item.name[info.language ?? "english"]} Attached
      </div>
      <FireImage imgUrl={item.imgUrl} />
    </div>
  );
};

export default ItemAttachedHolder;
