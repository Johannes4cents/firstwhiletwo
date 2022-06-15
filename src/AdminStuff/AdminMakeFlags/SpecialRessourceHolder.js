import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { storage } from "../../firebase/fireInit";
import useLongPress from "../../hooks/useLongPress";
import miscStore from "../../stores/miscStore";

const SpecialRessourceHolder = ({ special, onSpecialClicked }) => {
  const image = useRef();

  useEffect(() => {
    if (special.imgUrl != "" && special.imgUrl != null) {
      getDownloadURL(ref(storage, special.imgUrl)).then((url) => {
        image.current.setAttribute("src", url);
      });
    }
  }, [image]);

  return (
    <div
      className="divRowColored"
      style={{
        borderRadius: "15%",
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      onClick={() => onSpecialClicked(special)}
    >
      <div className="textBoldWhite" style={{ flex: 1, textAlign: "center" }}>
        {special.name}
      </div>
      <img ref={image} className="icon25" style={{ marginLeft: "5px" }} />
    </div>
  );
};

const SpecialRessourceListHolder = ({ special, onSpecialClicked }) => {
  const { setDragCursor, dragCursor } = miscStore();
  const image = useRef();

  const onLongPress = () => {
    setDragCursor({ type: "specialRessource", item: special });
  };

  const onClick = () => {
    if (dragCursor == null) onSpecialClicked(special);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 150,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  useEffect(() => {
    if (special.imgUrl != "" && special.imgUrl != null) {
      getDownloadURL(ref(storage, special.imgUrl)).then((url) => {
        image.current.setAttribute("src", url);
      });
    }
  }, [image]);

  return (
    <div
      {...longPressEvent}
      className="divRowColored"
      style={{
        paddingLeft: "5px",
        paddingRight: "5px",
        width: "100%",
        borderBottom: "1px solid white",
      }}
    >
      <div className="textBoldWhite" style={{ flex: 1, textAlign: "center" }}>
        {special.name}
      </div>
      <img
        ref={image}
        className="icon25"
        style={{ marginLeft: "5px", maxWidth: "25px", minWidth: "25px" }}
      />
    </div>
  );
};

export { SpecialRessourceListHolder };
export default SpecialRessourceHolder;
