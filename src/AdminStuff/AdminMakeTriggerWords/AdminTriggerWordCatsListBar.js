import React, { useEffect } from "react";
import { useState } from "react";
import SearchBar from "../../misc/elements/SearchBar";
import { getDocListener } from "../../misc/handleFirestore";
import adminStore from "../../stores/adminStore";
import TriggerWordCatHolder from "./TriggerWordCatHolder";

const AdminTriggerWordCatsListBar = () => {
  const [displayedWcs, setDisplayedWcs] = useState([]);
  const {
    setTriggerWordCats,
    triggerWordCats,
    addWordCat,
    addRemoveSelectedWordCat,
  } = adminStore();
  const [wordCatText, setWordCatText] = useState("");
  const [resetSearchTrigger, setResetSearchTrigger] = useState({});
  useEffect(() => {
    getDocListener("general", "lists", (doc) => {
      setTriggerWordCats(doc["triggerWordCats"]);
    });
  }, []);

  useEffect(() => {
    setDisplayedWcs(triggerWordCats);
  }, [triggerWordCats]);

  const onSearch = (result) => {
    setWordCatText(result);
    if (result.length > 0)
      setDisplayedWcs(
        triggerWordCats.filter((w) => w.text.startsWith(result.toLowerCase()))
      );
    else setDisplayedWcs(triggerWordCats);
  };

  const onWordCatClicked = (wc) => {
    addRemoveSelectedWordCat(wc);
  };

  const onSaveNewWordCat = () => {
    addWordCat(wordCatText);
    setResetSearchTrigger({});
  };
  const onEnter = (e) => {
    if (e.key == "Enter") onSaveNewWordCat();
  };
  return (
    <div
      className="divColumnColored"
      style={{ width: "200px", height: "100%" }}
    >
      <div className="textBoldWhite">Trigger WordCats</div>
      <div className="divRow">
        <SearchBar
          resetSearchTrigger={resetSearchTrigger}
          onSearchFunc={onSearch}
          onEnter={onEnter}
        />
        <img
          src="/images/drawable/btn_save.png"
          className="icon25"
          onClick={onSaveNewWordCat}
        />
      </div>
      <div
        className="divColumn"
        style={{
          maxHeight: "400px",
          overflow: "auto",
          width: "100%",
          marginTop: "5px",
        }}
      >
        {displayedWcs.map((wc) => {
          return (
            <TriggerWordCatHolder
              key={wc.id}
              wc={wc}
              onWcClicked={onWordCatClicked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminTriggerWordCatsListBar;
