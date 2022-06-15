import React from "react";

const GenericCursor = ({ text, image, minLength = "0" }) => {
  return (
    <div className="divRowColored" style={{ minLength: minLength + "px" }}>
      <div className="textBoldWhite">{text}</div>
      {image != null && <img src={image} className={"icon20"} />}
    </div>
  );
};

export default GenericCursor;
