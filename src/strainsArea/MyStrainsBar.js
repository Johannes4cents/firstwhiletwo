import React, { useEffect, useState } from "react";
import SearchBar from "../misc/elements/SearchBar";
import listsStore from "../stores/listsStore";
import StrainListHolder from "./holder/StrainListHolder";

const MyStrainsBar = () => {
  const [displayedStrains, setDisplayedStrains] = useState([]);

  const { myStrains } = listsStore();

  useEffect(() => {
    if (myStrains != null) setDisplayedStrains(myStrains);
  }, [myStrains]);

  const onSearchFunc = (result) => {};
  return (
    <div className="divColumn" style={{ flex: 1, overflow: "auto" }}>
      <div
        className="bgSection"
        style={{
          width: "225px",
        }}
      >
        My Strains
      </div>
      <div style={{ marginBottom: "2px" }}>
        <SearchBar onSearchFunc={onSearchFunc} />
      </div>
      <div
        className="divColumn"
        style={{
          width: "100%",
          maxHeight: "380px",
          overflow: "auto",
          height: "100%",
          flex: 1,
        }}
      >
        {displayedStrains.map((s) => {
          return <StrainListHolder key={s.id} strain={s} />;
        })}
      </div>
    </div>
  );
};

export default MyStrainsBar;
