import React, { useEffect, useState } from "react";
import { makeDescriptionField, objectToArray } from "../../misc/helperFuncs";
import userStore from "../../stores/userStore";
import DescriptionsBar from "../DescriptionsBar";
import RessourceHolderList from "./RessourceHolderList";

const RessourcesSubPage = () => {
  const [displayedList, setDisplayedList] = useState([]);
  const { info } = userStore();

  useEffect(() => {
    if (info != null) {
      setDisplayedList(objectToArray(info.ressources));
    }
  }, [info]);
  return (
    <div
      className="divColumn"
      style={{ height: "100%", overflow: "auto", overflowY: "hidden" }}
    >
      <div style={{ width: "100%" }}>
        <DescriptionsBar
          fields={[
            makeDescriptionField("amount", "11px", "50px"),
            makeDescriptionField("name", null, null, 1),
            makeDescriptionField("dropChance", "11px", "100px"),
          ]}
          startField={"name"}
          sortingList={displayedList}
          setSortingList={setDisplayedList}
        />
      </div>
      <div
        className="divColumn"
        style={{ overflow: "auto", width: "100%", height: "100%" }}
      >
        {displayedList.map((r, index) => {
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
