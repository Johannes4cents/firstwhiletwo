import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { storage } from "../../firebase/fireInit";

const GenericCursor = ({
  text,
  image,
  minLength = "0",
  fontSize,
  imageSize = "icon20",
}) => {
  return (
    <div className="divRowColored" style={{ minLength: minLength + "px" }}>
      <div
        className="textBoldWhite"
        style={{ fontSize: fontSize ? `${fontSize}px` : null }}
      >
        {text}
      </div>
      {image != null && <img src={image} className={imageSize} />}
    </div>
  );
};

export default GenericCursor;
