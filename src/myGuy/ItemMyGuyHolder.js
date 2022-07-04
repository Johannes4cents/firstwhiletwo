import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { storage } from "../firebase/fireInit";
import useMouseHandling from "../hooks/useMouseHandling";
import useOnHover from "../hooks/useOnHover";
import { deleteItemInUserList } from "../misc/handleFirestore";
import listsStore from "../stores/listsStore";
import userStore from "../stores/userStore";

const ItemMyGuyHolder = ({ item }) => {
  const mouseHandling = useMouseHandling({
    onOneClick: onItemClicked,
    type: "loot",
    item,
    onDoubleClick: handleDoubleClick,
    rightClickOptions: [
      {
        text: "Delete Item",
        imgUrl: "/images/drawable/icon_trashcan.png",
        onClick: deleteItem,
      },
    ],
  });
  const image = useRef();
  const hover = useOnHover({
    item,
    hoverBgColor: "#4f8f4f",
    normalBgColor: item.locked ? "#8f8f8f" : "#00000000",
  });
  const { info } = userStore();
  const { removeLoot } = listsStore();

  function onItemClicked() {
    console.log("singleClick");
  }

  function handleDoubleClick() {
    console.log("doubleClick");
  }

  function deleteItem() {
    removeLoot(info.uid, item);
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
      {...mouseHandling}
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
        {item.name[info.language ?? "english"]}
      </div>
      <img ref={image} className="icon20" style={{ marginRight: "5px" }} />
    </div>
  );
};

export default ItemMyGuyHolder;
