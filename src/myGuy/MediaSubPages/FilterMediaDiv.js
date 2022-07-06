import React from "react";
import CheckBox from "../../misc/elements/CheckBox";

const FilterMediaDiv = ({ filterOptions, onTypeClicked, selectedTypes }) => {
  return (
    <div
      className="divRow"
      style={{
        width: "90%",
        justifyContent: "space-between",
      }}
    >
      {filterOptions.map((o) => {
        return (
          <FilterHolder
            key={o.name}
            option={o}
            selectedTypes={selectedTypes}
            onTypeClicked={onTypeClicked}
          />
        );
      })}
    </div>
  );
};

const FilterHolder = ({ option, selectedTypes, onTypeClicked }) => {
  return (
    <div className="divRow" onClick={() => onTypeClicked(option)}>
      <CheckBox
        item={option.name}
        includeList={selectedTypes}
        size={"icon15"}
      />
      <div className="textWhiteSmall" style={{ flex: 1 }}>
        {option.name}
      </div>
      <img
        src={option.imgUrl}
        className="icon15"
        style={{ marginLeft: "2px" }}
      />
    </div>
  );
};

export default FilterMediaDiv;
