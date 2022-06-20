import React from "react";
import { useState } from "react";
import useOnHover from "../hooks/useOnHover";

const DescriptionsBar = ({ fields, sorting, setSorting }) => {
  function clickSorting(field) {
    console.log(
      "sorting - ",
      sorting,
      " | sorting.field != field - ",
      sorting.field != field
    );
    if (
      sorting.field != field ||
      (sorting.field == field && !sorting.ascending)
    ) {
      console.log("firstSort");
      setSorting({ field: field, ascending: true });
    } else setSorting({ field: field, ascending: false });
  }
  return (
    <div
      className="divRow"
      style={{ width: "100%", justifyContent: "space-around" }}
    >
      {fields.map((f) => {
        return (
          <DescriptionField
            clickSorting={clickSorting}
            key={f.text}
            field={f}
            sorting={sorting}
            width={f.width}
            flex={f.flex}
          />
        );
      })}
    </div>
  );
};

const DescriptionField = ({ clickSorting, field, sorting }) => {
  return (
    <div
      style={{
        fontSize: field.textSize ?? null,
        width: field.width ?? null,
        flex: field.flex ?? null,
        textAlign: "center",
        color: sorting.field == field.text ? "gold" : "gray",
      }}
      onClick={() => clickSorting(field.text)}
    >
      {field.text}
      <img
        src="/images/icons/icon_up_down_arrow.png"
        className="icon15"
        style={{
          transform:
            sorting.field == field.text && !sorting.ascending
              ? "scaleY(-1)"
              : "",
        }}
      />
    </div>
  );
};

export default DescriptionsBar;
