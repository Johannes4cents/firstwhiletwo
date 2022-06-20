import { getDownloadURL, ref } from "firebase/storage";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { storage } from "../../firebase/fireInit";
import userStore from "../../stores/userStore";

const FireItemHolder = ({ item, setFireItem, selectedItem }) => {
  const image = useRef();
  const { info } = userStore();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (image != null) {
      // gets and sets image of snippetPart from firebase storage
      getDownloadURL(ref(storage, item.imgUrl)).then((url) => {
        image.current.setAttribute("src", url);
      });
    }
  }, [image]);

  const onClick = () => {
    console.log("item is - ", item);
    setFireItem(item);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="divRow"
      style={{ width: "100%" }}
      onClick={onClick}
    >
      <div
        className="textWhite"
        style={{
          flex: 1,
          textAlign: "center",
          marginRight: "3px",
          color:
            selectedItem.id == item.id ? "orange" : hovered ? "gold" : "white",
        }}
      >
        {item.name[info.language]}
      </div>
      <img
        ref={image}
        className="icon20"
        alt="/images/drawable/icon_unknown.png"
      />
    </div>
  );
};

export default FireItemHolder;
