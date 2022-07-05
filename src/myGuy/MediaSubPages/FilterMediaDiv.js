import React from "react";
import CheckBox from "../../misc/elements/CheckBox";

const FilterMediaDiv = ({
  filterOptions,
  onOptionClicked,
  selectedOptions,
}) => {
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
            options={selectedOptions}
            onOptionClicked={onOptionClicked}
          />
        );
      })}
    </div>
  );
};

const FilterHolder = ({ option, options, onOptionClicked }) => {
  return (
    <div className="divRow" onClick={() => onOptionClicked(option)}>
      <CheckBox item={option.name} includeList={options} size={"icon15"} />
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
