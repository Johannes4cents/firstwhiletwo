import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useModal from "../../../hooks/useModal";
import SearchBar from "../../../misc/elements/SearchBar";
import { getGeneralList } from "../../../misc/handleFirestore";
import { forArrayLength } from "../../../misc/helperFuncs";
import AddTriggerWordModal from "./AddTriggerWordModal";
import TriggerWordCatModal from "./TriggerWordCatModal";
import TriggerWordHolder from "./TriggerWordHolder";

const AddTriggerWordsSection = ({
  itemChance,
  triggerWords,
  setTriggerWords,
  firstSetTriggerWords,
  setFirstSetTriggerWords,
}) => {
  const [newWords, setNewWords] = useState([]);
  const [selectedWordCats, setSelectedWordCats] = useState([]);
  const [wcSaftety, setWcSafety] = useState(false);
  const [enteredWord, setEnteredWord] = useState("");
  const [globalTriggerWords, setGlobalTriggerWords] = useState([]);
  const [displayedWords, setDisplayedWords] = useState([]);
  const [resetSearchTrigger, setResetSearchTrigger] = useState({});
  const [extraOpenWcs, setExtraOpenWcs] = useState(true);
  const [extraOpenWord, setExtraOpenWord] = useState(true);

  useEffect(() => {
    let newWords = [...globalTriggerWords];
    for (let i = 0; i < newWords.length; i++) {
      let wordObj = newWords[i];
      wordObj.chance = itemChance;
    }

    let newTriggerWords = [...triggerWords];
    forArrayLength(newTriggerWords, (word) => {
      word.chance = itemChance;
    });
    console.log("newWords are - ", newWords);
    setDisplayedWords(newWords);
    setTriggerWords(newTriggerWords);
  }, [itemChance]);

  useEffect(() => {
    if (firstSetTriggerWords) {
      setWcSafety(true);
      setSelectedWordCats([]);
      setTimeout(() => {
        setWcSafety(false);
      }, 200);
    }
  }, [firstSetTriggerWords]);

  useEffect(() => {
    if (!wcSaftety) {
      const wcWords = globalTriggerWords.filter((w) =>
        w.obj.cats.some((wc) => selectedWordCats.includes(wc))
      );
      setTriggerWords(wcWords.concat(newWords));
    }
  }, [selectedWordCats]);

  useEffect(() => {
    getGeneralList("triggerWords", (list) => {
      const chanceList = list.map((w) => {
        return { obj: w, chance: 0 };
      });
      setGlobalTriggerWords(chanceList);
      setDisplayedWords(chanceList);
    });
  }, []);

  const wcModal = useModal({
    modalContent: (
      <TriggerWordCatModal
        firstSetTriggerWords={firstSetTriggerWords}
        selectedWordCats={selectedWordCats}
        setSelectedWordCats={setSelectedWordCats}
      />
    ),
    extraOpen: extraOpenWcs,
  });

  const newWordModal = useModal({
    modalContent: (
      <AddTriggerWordModal
        wordText={enteredWord}
        wcs={selectedWordCats}
        onClose={onWordCreated}
      />
    ),
    extraOpen: extraOpenWord,
  });
  const onSearch = (search) => {
    setEnteredWord(search);
    if (search.length > 0) {
      setDisplayedWords(
        globalTriggerWords.filter((w) =>
          w.obj.text.english.startsWith(search.toLowerCase())
        )
      );
    } else setDisplayedWords(globalTriggerWords);
  };

  function onWordCreated() {
    setResetSearchTrigger({});
    setEnteredWord("");
  }

  const onSearchEnter = (e) => {
    if (e.key == "Enter") {
      setExtraOpenWord(true);
      setExtraOpenWcs(false);
      newWordModal.open();
    }
  };

  const onWordClicked = (word, chance, changeChance = false) => {
    let mappedSelected = triggerWords.map((w) => w.obj.text.english);
    let filteredWords = triggerWords.filter(
      (w) => w.obj.text.english != word.text.english
    );
    let addedWords = [...triggerWords, { chance: chance, obj: word }];
    if (!changeChance) {
      setTriggerWords(
        mappedSelected.includes(word.text.english) ? filteredWords : addedWords
      );
    } else {
      console.log("word is - ", word);
      setTriggerWords([...filteredWords, { chance: chance, obj: word }]);
    }
  };
  return (
    <div className="divColumn" style={{ width: "350px" }}>
      <div className="divRow">
        <img
          src="/images/icons/icon_word_cat.png"
          className="icon20"
          onClick={() => {
            setExtraOpenWord(false);
            setExtraOpenWcs(true);
            wcModal.open();
          }}
        />
      </div>
      {wcModal.element}
      {newWordModal.element}
      <div className="divColumn">
        <div className="textBoldWhite">Words</div>
        <SearchBar
          onSearchFunc={onSearch}
          resetSearchTrigger={resetSearchTrigger}
          onEnter={onSearchEnter}
        />
        <div
          className="divColumn"
          style={{ minHeight: "300px", maxHeight: "300px", overflow: "auto" }}
        >
          {displayedWords.map((w) => {
            return (
              <TriggerWordHolder
                itemChance={itemChance}
                setFirstSetTriggerWords={setFirstSetTriggerWords}
                firstSet={firstSetTriggerWords}
                word={w}
                key={w.obj.text.english}
                onWordClicked={onWordClicked}
                selectedWords={triggerWords}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddTriggerWordsSection;
