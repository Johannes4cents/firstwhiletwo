import { useState } from "react";
import HintHolder from "./HintHolder";

const HintLanguageBar = ({ language, hints, setHints, flag }) => {
  const [phrase, setPhrase] = useState("");
  const [hint, setHint] = useState("");
  const onNewHint = () => {
    let newHint = { phrase, hint };
    setHints({ ...hints, [language]: [...hints[language], newHint] });
    setPhrase("");
    setHint("");
  };

  return (
    <div
      className="divColumn"
      style={{ width: "100%", alignItems: "baseline", height: "100%" }}
    >
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <div className="textBoldWhite">Hints</div>
        <img src={flag} className="icon20" />
      </div>
      <div className="divRow" style={{ width: "100%", marginLeft: "5px" }}>
        <div className="textBoldWhite">phrase</div>
        <div style={{ flex: 1 }} />
        <input
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          style={{ width: "240px", textAlign: "center" }}
        />
        <div style={{ flex: 1 }} />
        <img
          style={{ marginRight: "5px" }}
          src="/images/drawable/btn_save.png"
          className="icon25"
          onClick={onNewHint}
        />
      </div>
      <div className="divRow" style={{ width: "100%", marginLeft: "5px" }}>
        <div className="textBoldWhite">Hint</div>
        <div style={{ flex: 1 }} />
        <input
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          style={{ width: "260px", textAlign: "center" }}
        />
        <div style={{ flex: 1 }} />
      </div>
      <div
        className="divColumn"
        style={{ width: "100%", maxHeight: "100px", overflow: "auto" }}
      >
        {hints[language].map((h) => {
          return (
            <HintHolder
              language={language}
              hint={h}
              key={h.phrase}
              hints={hints}
              setHints={setHints}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HintLanguageBar;
