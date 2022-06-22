import React, { useState } from "react";
import { objectToArray } from "../../misc/helperFuncs";
import userStore from "../../stores/userStore";
import DescriptionsBar from "../DescriptionsBar";
import RessourceHolderList from "./RessourceHolderList";

const RessourcesSubPage = () => {
  const [sorting, setSorting] = useState({ field: "Name", ascending: true });
  const { info } = userStore();
  const descriptionFields = [
    {
      text: "Amount",
      width: "50px",
      textSize: "11px",
    },

    { text: "Name", flex: 1 },
    {
      text: "DropChance",
      width: "100px",
      textSize: "11px",
    },
  ];
  return (
    <div
      className="divColumn"
      style={{ height: "100%", overflow: "auto", overflowY: "hidden" }}
    >
      <div style={{ width: "100%" }}>
        <DescriptionsBar
          fields={descriptionFields}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
      <div
        className="divColumn"
        style={{ overflow: "auto", width: "100%", height: "100%" }}
      >
        {objectToArray(info.ressources).map((r, index) => {
          return (
            <RessourceHolderList
              key={r.key}
              ressource={r.value}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RessourcesSubPage;
