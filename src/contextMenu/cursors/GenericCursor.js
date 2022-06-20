import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { storage } from "../../firebase/fireInit";

const GenericCursor = ({ text, image, minLength = "0" }) => {
  const imageRef = useRef();
  useEffect(() => {
    if (imageRef != null) {
      if (!image.startsWith("images")) {
        getDownloadURL(ref(storage, image)).then((url) => {
          if (imageRef.current != null)
            imageRef.current.setAttribute("src", url);
        });
      } else imageRef.current.setAttribute("src", image);
    }
  }, [image, imageRef]);
  return (
    <div className="divRowColored" style={{ minLength: minLength + "px" }}>
      <div className="textBoldWhite">{text}</div>
      {image != null && (
        <img
          ref={imageRef}
          src={"/images/drawable/icon_unknown.png"}
          className={"icon20"}
        />
      )}
    </div>
  );
};

export default GenericCursor;
