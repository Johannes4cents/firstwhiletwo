import { textAlign } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../../misc/elements/SearchBar";
import {
  getDocListener,
  updateItemInGeneralList,
  updateTriggerWordInGeneralList,
} from "../../misc/handleFirestore";
import { checkIfListsTheSame } from "../../misc/helperFuncs";
import adminStore from "../../stores/adminStore";
import TriggerWordHolder from "./TriggerWordHolder";

const AdminTriggerWordListBar = () => {
  const [displayedWords, setDisplayedWords] = useState([]);
  const [germanText, setGermanText] = useState("");
  const [wordText, setWordText] = useState("");
  const germanInput = useRef();
  const englishInput = useRef();
  const otherFormInputEnglish = useRef();
  const otherFormInputGerman = useRef();
  const [otherForms, setOtherForms] = useState("");
  const [otherFormsGerman, setOtherFormsGerman] = useState("");

  const {
    triggerWords,
    setTriggerWords,
    addTriggerWord,
    selectedTriggerWordCats,
  } = adminStore();
  const [resetSearchTrigger, setResetWordTrigger] = useState({});
  useEffect(() => {
    getDocListener("general", "lists", (doc) => {
      setTriggerWords(doc["triggerWords"]);
    });
  }, []);

  useEffect(() => {
    setDisplayedWords(triggerWords);
  }, [triggerWords]);

  const onSearch = (result) => {
    setWordText(result);
    if (result.length > 0)
      setDisplayedWords(
        triggerWords.filter((w) =>
          w.text.english.startsWith(result.toLowerCase())
        )
      );
    else setDisplayedWords(triggerWords);
  };

  const onWordClicked = (word) => {
    if (
      checkIfListsTheSame(
        selectedTriggerWordCats.map((wc) => wc.id),
        word.cats
      )
    ) {
      console.log("lists are the same");
      word.cats = [];
    } else {
      console.log("listsAreNotTheSame");
      word.cats = selectedTriggerWordCats.map((wc) => wc.id);
    }
    console.log("selectedTriggerWordCats - ", selectedTriggerWordCats);
    updateTriggerWordInGeneralList(word);
    englishInput.current.focus();
  };

  const onSaveNewWord = () => {
    const otherWordObj = {
      english: [
        ...otherForms
          .split(",")
          .map((s) => s.toLowerCase())
          .filter((s) => s != "" && s != " "),
        wordText.toLowerCase(),
      ],
      german: [
        ...otherFormsGerman
          .split(",")
          .map((s) => s.toLowerCase())
          .filter((s) => s != "" && s != " "),
        germanText.toLowerCase(),
      ],
    };
    addTriggerWord(wordText, germanText, otherWordObj);
    setResetWordTrigger({});
    setGermanText("");
    setWordText("");
    setOtherForms("");
    setOtherFormsGerman("");
  };
  const onEnter = (e) => {
    if (e.key == "Enter") {
      console.log("enter pressed");
      onSaveNewWord();
      englishInput.current.focus();
    }
  };

  const onEnterOtherEnglish = (e) => {
    if (e.key == "Enter") germanInput.current.focus();
  };

  const onEnterGerman = (e) => {
    if (e.key == "Enter") otherFormInputGerman.current.focus();
  };

  const onEnterWord = (e) => {
    if (e.key == "Enter") otherFormInputEnglish.current.focus();
  };

  return (
    <div
      className="divColumnColored"
      style={{ height: "100%", alignItems: "start" }}
    >
      <div className="textBoldWhite" style={{ alignSelf: "center" }}>
        TriggerWords
      </div>
      <div className="divColumn">
        <div className="divRow">
          <SearchBar
            elRef={englishInput}
            onEnter={onEnterWord}
            onSearchFunc={onSearch}
            resetSearchTrigger={resetSearchTrigger}
          />
          <OtherFormsInput
            language={"us"}
            onEnter={onEnterOtherEnglish}
            otherForms={otherForms}
            setOtherForms={setOtherForms}
            elRef={otherFormInputEnglish}
          />
        </div>
        <div className="divRow" style={{ marginTop: "5px" }}>
          <LanguageInput
            language={"german"}
            text={germanText}
            setText={setGermanText}
            elRef={germanInput}
            onEnter={onEnterGerman}
          />
          <OtherFormsInput
            language={"german"}
            onEnter={onEnter}
            otherForms={otherFormsGerman}
            setOtherForms={setOtherFormsGerman}
            elRef={otherFormInputGerman}
          />
        </div>
      </div>

      <div
        className="divColumn"
        style={{
          width: "500px",
          marginTop: "10px",
          maxHeight: "500px",
          overflow: "auto",
        }}
      >
        {displayedWords.map((w) => (
          <TriggerWordHolder
            word={w}
            key={w.text.english}
            onWordClicked={onWordClicked}
          />
        ))}
      </div>
    </div>
  );
};

const OtherFormsInput = ({
  language,
  onEnter,
  otherForms,
  setOtherForms,
  elRef,
}) => {
  return (
    <div className="divColumn" style={{ width: "300px", marginLeft: "10px" }}>
      <div className="divRow" style={{ width: "100%" }}>
        <input
          style={{ width: "300px", textAlign: "center" }}
          onKeyDown={onEnter}
          value={otherForms}
          onChange={(e) => setOtherForms(e.target.value)}
          ref={elRef}
        />
        <img
          src={`/images/flags/flag_${language}.png`}
          className="icon20"
          style={{ marginLeft: "4px" }}
        />
      </div>
    </div>
  );
};

const LanguageInput = ({ language, text, setText, elRef, onEnter }) => {
  return (
    <div className="divRow">
      <input
        onKeyDown={onEnter}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={elRef}
        style={{ textAlign: "center" }}
      />
      <img
        src={`/images/flags/flag_${language}.png`}
        className="icon20"
        style={{ marginLeft: "4px" }}
      />
    </div>
  );
};

export default AdminTriggerWordListBar;
