import { useEffect, useState } from "react";
import PhraseHolder from "./PhraseHolder";

const PhraseLanguagebar = ({
  onEnter,
  language,
  setPhrase,
  phraseValue,
  phrasesList,
  submitPhrase,
  icon,
  removePhrase,
  changeChance,
  startChance,
}) => {
  return (
    <div
      className="divColumn"
      style={{
        height: "100%",
        justifyContent: "space-between",
        marginTop: "4px",
      }}
    >
      <div className="divRow" style={{ alignItems: "start" }}>
        <img src={icon} className="icon20" />
        <input
          value={phraseValue}
          onKeyDown={(e) => onEnter(e, phraseValue, language)}
          style={{ textAlign: "center" }}
          onChange={(e) => setPhrase(e.target.value)}
        />
        <img
          src="/images/drawable/btn_save.png"
          className="icon20"
          onClick={() =>
            submitPhrase(phraseValue, startChance, false, language)
          }
        />
      </div>
      <div
        className="divColumn"
        style={{ height: "100%", maxHeight: "200px", overflow: "auto" }}
      >
        {phrasesList.map((p) => {
          return (
            <PhraseHolder
              p={p}
              key={p.phrase}
              startChance={startChance}
              removePhrase={removePhrase}
              language={language}
              changeChance={changeChance}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PhraseLanguagebar;
