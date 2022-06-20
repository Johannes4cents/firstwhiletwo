import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { storage } from "../firebase/fireInit";
import useDragDrop from "../hooks/useDragDrop";
import useOnHover from "../hooks/useOnHover";
import userStore from "../stores/userStore";

const ItemMyGuyHolder = ({ item }) => {
  const dragDrop = useDragDrop({ onClick: onItemClicked, type: "loot", item });
  const image = useRef();
  const hover = useOnHover({
    item,
    hoverBgColor: "#4f8f4f",
    normalBgColor: item.locked ? "#8f8f8f" : "#00000000",
  });
  const { info } = userStore();

  function onItemClicked() {
    console.log("item is - ", item);
  }

  useEffect(() => {
    if (image != null) {
      getDownloadURL(ref(storage, item.imgUrl)).then((url) => {
        image.current.setAttribute("src", url);
      });
    }
  }, [image, item]);

  return (
    <div
      {...dragDrop}
      onClick={onItemClicked}
      className="divRowColored"
      style={{
        width: "100%",
        backgroundColor: hover.bgColor,
        marginBottom: "5px",
      }}
      {...hover.divProps}
    >
      {item.locked && (
        <img
          src="/images/icons/icon_locked.png"
          className="icon20"
          style={{ marginLeft: "2px" }}
        />
      )}
      <div
        className="textBoldWhite"
        style={{ flex: 1, textAlign: "center", color: hover.textColor }}
      >
        {item.name[info.language]}
      </div>
      <img ref={image} className="icon20" style={{ marginRight: "5px" }} />
    </div>
  );
};

export default ItemMyGuyHolder;
