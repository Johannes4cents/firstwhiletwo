import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { storage } from "../firebase/fireInit";
import useOnHover from "../hooks/useOnHover";
import userStore from "../stores/userStore";

const ItemMyGuyHolder = ({ item }) => {
  const image = useRef();
  const hover = useOnHover({
    item,
    hoverBgColor: "#4f8f4f",
    normalBgColor: "#00000000",
  });
  const { info } = userStore();

  useEffect(() => {
    if (image != null) {
      getDownloadURL(ref(storage, item.imgUrl)).then((url) => {
        image.current.setAttribute("src", url);
      });
    }
  }, [image, item]);

  return (
    <div
      className="divRowColored"
      style={{
        width: "100%",
        backgroundColor: hover.bgColor,
        marginBottom: "5px",
      }}
      {...hover.divProps}
    >
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
