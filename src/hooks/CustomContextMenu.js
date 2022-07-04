import React from "react";
import useOnHover from "./useOnHover";

const CustomContextMenu = ({ options }) => {
  return (
    <div className="divColumn">
      {options.map((o) => {
        return <ContextOptionHolder key={o.text} option={o} />;
      })}
    </div>
  );
};

const ContextOptionHolder = ({ option }) => {
  const hover = useOnHover({ item: option });
  return (
    <div
      {...hover.divProps}
      className="divRowColored"
      onClick={option.onClick}
      style={{ width: "100px" }}
    >
      <div
        className="textWhiteSmall"
        style={{ flex: 1, color: hover.textColor }}
      >
        {option.text}
      </div>
      <img src={option.imgUrl} className="icon15" />
    </div>
  );
};

export default CustomContextMenu;
