import React from "react";
import FireImage from "../../misc/elements/FireImage";
import userStore from "../../stores/userStore";

const AttachedItemHolder = ({ item }) => {
  const { info } = userStore();
  return (
    <div
      className="divColumn"
      style={{
        border: "2px solid brown",
        borderRadius: "1rem/1rem",
        minWidth: "300px",
        paddingTop: "5px",
        paddingBottom: "5px",
      }}
    >
      <div className="divRow">
        <div className="textBoldWhite">
          {item.name[info.language ?? "english"]}
        </div>
        <FireImage imgUrl={item.imgUrl} />
      </div>
    </div>
  );
};

export default AttachedItemHolder;
