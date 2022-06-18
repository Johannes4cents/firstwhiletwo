import { Input } from "@mui/material";
import React, { useState } from "react";
import { checkIfListsTheSame } from "../../misc/helperFuncs";
import MultiPhraseHolder from "./MultiPhraseHolder";

const MultiPhraseBar = ({ language, multiPhrases, setMultiPhrases, flag }) => {
  const [strings, setStrings] = useState([]);
  const [currentString, setCurrentString] = useState("");
  const onMultiPhraseClicked = (m) => {
    const newList = multiPhrases[language].filter(
      (mp) => !checkIfListsTheSame(mp.strings, m.strings)
    );
    const newObj = { ...multiPhrases, [language]: newList };
    setMultiPhrases(newObj);
  };
  const addString = () => {
    if (
      !strings.includes(currentString.toLocaleLowerCase()) &&
      currentString.length > 1
    )
      setStrings([...strings, currentString.toLocaleLowerCase()]);
    setCurrentString("");
  };

  const onEnter = (e) => {
    if (e.key == "Enter") addString();
  };

  const submitMultiPhrase = () => {
    const newObj = {
      ...multiPhrases,
      [language]: [...multiPhrases[language], { strings, lastFound: null }],
    };
    setMultiPhrases(newObj);
    setStrings([]);
  };

  const onStringClicked = (string) => {
    setStrings(strings.filter((s) => s != string));
  };
  return (
    <div
      className="divColumnColored"
      style={{ width: "350px", borderRight: "5px solid white" }}
    >
      <div className="divRow">
        <div className="textBoldWhite">MultiPhrases</div>
        <img
          src={flag}
          className="icon25"
          style={{ marginLeft: "5px", marginBottom: "10px" }}
        />
      </div>
      <div className="divColumn" style={{ width: "100%" }}>
        <div className="divRow" style={{ width: "100%" }}>
          <input
            onKeyDown={onEnter}
            style={{ textAlign: "center", flex: 1, marginLeft: "10px" }}
            value={currentString}
            onChange={(e) => setCurrentString(e.target.value)}
          />
          <img
            style={{
              marginRight: "10px",
              marginLeft: "5px",
            }}
            src="/images/drawable/btn_plus_symbol.png"
            className="icon20"
            onClick={addString}
          />
        </div>
        <div
          className="divRow"
          style={{
            width: "100%",
            overflow: "auto",
            minHeight: "20px",
            borderBottom: "4px solid darkgrey",
          }}
        >
          {strings.map((s) => {
            return (
              <div
                onClick={() => onStringClicked(s)}
                key={s}
                className="textWhite"
                style={{
                  flex: 1,
                  marginRight: "2px",
                  borderRight: "2px solid grey",
                }}
              >
                {s}
              </div>
            );
          })}
          {strings.length > 1 && (
            <img
              src="/images/icons/icon_thumbs_up.png"
              className="icon20"
              onClick={submitMultiPhrase}
            />
          )}
        </div>
      </div>
      <div className="divColumn" style={{ width: "100%" }}>
        {multiPhrases[language].map((m) => {
          return (
            <MultiPhraseHolder
              key={m[0]}
              multiPhrase={m}
              onMClicked={onMultiPhraseClicked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MultiPhraseBar;
