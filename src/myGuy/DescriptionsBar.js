import React from "react";
import { useState } from "react";
import useOnHover from "../hooks/useOnHover";

const DescriptionsBar = ({
  fieldOne,
  fieldTwo,
  fieldThree,
  sorting,
  setSorting,
}) => {
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
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: sorting.field == "fieldTwo" ? "gold" : "gray",
        }}
        onClick={() => clickSorting("fieldTwo")}
      >
        {fieldTwo}
        {fieldTwo && (
          <img
            src="/images/icons/icon_up_down_arrow.png"
            className="icon15"
            style={{
              transform:
                sorting.field == "fieldTwo" && !sorting.ascending
                  ? "scaleY(-1)"
                  : "",
            }}
          />
        )}
      </div>
      <div style={{ width: "15px" }} />
    </div>
  );
};

export default DescriptionsBar;
