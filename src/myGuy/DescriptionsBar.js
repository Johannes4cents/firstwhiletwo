import React, { useEffect } from "react";
import { useState } from "react";

const DescriptionsBar = ({
  fields,
  sortingList,
  setSortingList,
  startIdentifier,
}) => {
  const [sorting, setSorting] = useState({
    identifier: startIdentifier ?? "",
    ascending: true,
  });

  const clickSorting = (field) => {
    if (
      sorting.identifier.toLowerCase() != field.identifier.toLowerCase() ||
      (sorting.identifier.toLowerCase() == field.identifier.toLowerCase() &&
        !sorting.ascending)
    ) {
      setSorting({
        identifier: field.identifier.toLowerCase(),
        ascending: true,
      });
    } else
      setSorting({
        identifier: field.identifier.toLowerCase(),
        ascending: false,
      });
  };

  useEffect(() => {
    if (sorting.identifier != "") {
      setSortingList(
        [...sortingList].sort((a, b) =>
          sorting.ascending
            ? a[sorting.identifier.toLowerCase()] >
              b[sorting.identifier.toLowerCase()]
              ? 1
              : -1
            : a[sorting.identifier.toLowerCase()] <
              b[sorting.identifier.toLowerCase()]
            ? 1
            : -1
        )
      );
    }
  }, [sorting]);

  return (
    <div
      className="divRow"
      style={{ width: "100%", justifyContent: "space-around" }}
    >
      {fields.map((f) => {
        return (
          <DescriptionField
            clickSorting={clickSorting}
            sorting={sorting}
            key={f.text}
            field={f}
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
        color:
          sorting.identifier.toLowerCase() == field.identifier.toLowerCase()
            ? "gold"
            : "gray",
      }}
      onClick={() => clickSorting(field)}
    >
      {!field.hidden && field.text}
      {!field.hidden && (
        <img
          src="/images/icons/icon_up_down_arrow.png"
          className="icon15"
          style={{
            transform:
              sorting.identifier.toLowerCase() ==
                field.identifier.toLowerCase() && !sorting.ascending
                ? "scaleY(-1)"
                : "",
          }}
        />
      )}
    </div>
  );
};

export default DescriptionsBar;
