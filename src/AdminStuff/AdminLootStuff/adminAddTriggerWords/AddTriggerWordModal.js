import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getGeneralList } from "../../../misc/handleFirestore";
import adminStore from "../../../stores/adminStore";
import miscStore from "../../../stores/miscStore";
import WcHolder from "./WcHolder";

const AddTriggerWordModal = ({ wordText }) => {
  const inputGerman = useRef();
  const [selectedWcs, setSelectedWcs] = useState([]);
  const [textGerman, setTextgerman] = useState("");
  const [wcs, setWcs] = useState([]);
  const { closeModal } = miscStore();
  const { addTriggerWord } = adminStore();
  const clickWc = (wc) => {
    setSelectedWcs(
      selectedWcs.includes(wc.id)
        ? selectedWcs.filter((id) => id != wc.id)
        : [...selectedWcs, wc.id]
    );
  };

  useEffect(() => {
    getGeneralList("triggerWordCats", (list) => {
      setWcs(list);
    });
  }, []);

  useEffect(() => {
    if (inputGerman) inputGerman.current.focus();
  }, [inputGerman]);

  const saveWord = () => {
    addTriggerWord(wordText.toLowerCase(), textGerman, {
      english: [wordText.toLowerCase()],
      german: [textGerman.toLowerCase()],
    });
    closeModal();
  };

  const onEnter = (e) => {
    if (e.key == "Enter") saveWord();
  };

  return (
    <div
      className="divColumn"
      style={{ width: "200px", border: "1px solid white" }}
    >
      <div className="textWhite">{wordText}</div>
      <div className="divRow">
        <input
          ref={inputGerman}
          onKeyDown={onEnter}
          value={textGerman}
          onChange={(e) => {
            setTextgerman(e.target.value);
          }}
        />
        <img src="/images/flags/flag_german.png" className="icon20" />
      </div>
      <div
        className="divColumn"
        style={{
          maxHeight: "300px",
          overflow: "auto",
          width: "100%",
          marginTop: "5px",
        }}
      >
        {wcs.map((wc) => {
          return (
            <WcHolder
              key={wc.id}
              wordCat={wc}
              selectedWordCats={selectedWcs}
              click={clickWc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddTriggerWordModal;
