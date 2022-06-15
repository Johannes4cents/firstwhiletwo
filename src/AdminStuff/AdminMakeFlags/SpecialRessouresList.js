import React, { useEffect, useState } from "react";
import SearchBar from "../../misc/elements/SearchBar";
import { getDocListener } from "../../misc/handleFirestore";
import { SpecialRessourceListHolder } from "./SpecialRessourceHolder";

const SpecialRessouresList = ({ onSpecialClicked }) => {
  const [displayedSRs, setDisplayedSRs] = useState([]);

  useEffect(() => {
    getDocListener("general", "lists", (doc) => {
      const srs = doc["specialRessources"];
      setDisplayedSRs(srs);
    });
  }, []);

  const onSearchFunc = (search) => {};
  return (
    <div className="divColumn" style={{ border: "1px solid black" }}>
      <div
        className="divRowColored"
        style={{ width: "100%", textAlign: "center" }}
      >
        <div
          className="textBoldWhite"
          style={{ flex: 1, borderBottom: "5px solid white" }}
        >
          Special Ressources
        </div>
      </div>
      <div style={{ marginBottom: "2px" }}>
        <SearchBar onSearchFunc={onSearchFunc} />
      </div>
      <div
        className="divColumn"
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {displayedSRs.map((sr) => {
          return (
            <SpecialRessourceListHolder
              special={sr}
              key={sr.id}
              onSpecialClicked={onSpecialClicked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SpecialRessouresList;
