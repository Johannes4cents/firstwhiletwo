import React, { useEffect, useState } from "react";
const PhraseHolder = ({ p, removePhrase, language, changeChance }) => {
  const [chance, setChance] = useState(p.chance);
  const [specialPhrase, setSpecialPhrase] = useState(false);

  useEffect(() => {
    changeChance(p, chance, specialPhrase, language);
  }, [chance, specialPhrase]);

  return (
    <div
      className="divRow"
      style={{
        minHeight: "20px",
        width: "250px",
        overflow: "auto",
        maxHeight: "40px",
        borderBottom: "1px solid white",
      }}
    >
      <img
        onClick={() => setSpecialPhrase(!specialPhrase)}
        src={
          specialPhrase
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
        className="icon15"
      />
      <img
        src="/images/loot/effects/icon_is_special.png"
        className="icon15"
        onClick={() => setSpecialPhrase(!specialPhrase)}
      />
      <div
        className="textBoldWhite"
        onClick={() => removePhrase(p, language)}
        style={{ textAlign: "center", flex: 1 }}
      >
        {p.phrase}
      </div>
      <input
        style={{ width: "30px" }}
        value={chance}
        onChange={(e) => setChance(e.target.value)}
      />
      <img src="/images/loot/icon_chance.png" className="icon15" />
    </div>
  );
};

export default PhraseHolder;
