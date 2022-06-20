import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useOnHover from "../../../hooks/useOnHover";
import SearchBar from "../../../misc/elements/SearchBar";
import { getGeneralList } from "../../../misc/handleFirestore";
import WcHolder from "./WcHolder";

const TriggerWordCatModal = ({
  selectedWordCats,
  setSelectedWordCats,
  firstSetTriggerWords,
}) => {
  const [displayedWordCats, setDisplayedWordCats] = useState([]);
  const [wcs, setWcs] = useState([]);

  useEffect(() => {
    getGeneralList("triggerWordCats", (list) => {
      setDisplayedWordCats(list);
      setWcs(list);
    });
  }, []);
  const onSearch = (search) => {
    if (search.length > 0) {
      setDisplayedWordCats(
        wcs.filter((wc) => wc.text.startsWith(search.toLowerCase()))
      );
    } else setDisplayedWordCats(wcs);
  };
  const clickWc = (wordCat) => {
    setSelectedWordCats(
      selectedWordCats.includes(wordCat.id)
        ? selectedWordCats.filter((id) => id != wordCat.id)
        : [...selectedWordCats, wordCat.id]
    );
    setDisplayedWordCats(wcs);
  };
  return (
    <div className="divColumn" style={{ width: "200px" }}>
      <SearchBar onSearchFunc={onSearch} />
      <div
        className="divColumn"
        style={{ maxHeight: "300px", overflow: "auto", width: "100%" }}
      >
        {displayedWordCats.map((wc) => {
          return (
            <WcHolder
              key={wc.id}
              wordCat={wc}
              selectedWordCats={selectedWordCats}
              click={clickWc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TriggerWordCatModal;
