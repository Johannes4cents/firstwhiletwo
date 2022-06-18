import { useState } from "react";
import PhraseLanguagebar from "./PhraseLanguageBar";

const PhrasesBar = ({
  phrases,
  onPhraseEntered,
  onRemovePhrase,
  startChance,
  changeChance,
}) => {
  const [phraseGerman, setPhraseGerman] = useState("");
  const [phraseEnglish, setPhraseEnglish] = useState("");
  let obj = {
    english: { string: phraseEnglish, set: setPhraseEnglish },
    german: { string: phraseGerman, set: setPhraseGerman },
  };

  const onEnter = (e, phrase, language) => {
    if (e.key == "Enter") {
      submitPhrase(phrase, startChance, false, language);
    }
  };

  const submitPhrase = (phrase, chance, isSpecial, language) => {
    if (phrase.length > 2) onPhraseEntered(phrase, chance, isSpecial, language);
    obj[language].set("");
  };
  return (
    <div
      className="divColumn"
      style={{
        width: "100%",
        height: "100%",
        borderBottom: "2px solid gray",
      }}
    >
      <div className="textBoldWhite">Phrases</div>
      <div
        className="divRow"
        style={{
          height: "100%",
          alignItems: "start",
        }}
      >
        <PhraseLanguagebar
          language={"german"}
          setPhrase={setPhraseGerman}
          phraseValue={phraseGerman}
          onEnter={onEnter}
          phrasesList={phrases.german}
          submitPhrase={submitPhrase}
          icon={"/images/flags/flag_german.png"}
          removePhrase={onRemovePhrase}
          changeChance={changeChance}
          startChance={startChance}
        />
        <div
          style={{ width: "2px", backgroundColor: "white", height: "100%" }}
        />
        <PhraseLanguagebar
          language={"english"}
          setPhrase={setPhraseEnglish}
          phraseValue={phraseEnglish}
          onEnter={onEnter}
          phrasesList={phrases.english}
          submitPhrase={submitPhrase}
          icon={"/images/flags/flag_us.png"}
          removePhrase={onRemovePhrase}
          changeChance={changeChance}
          startChance={startChance}
        />
      </div>
    </div>
  );
};

export default PhrasesBar;
