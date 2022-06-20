import { useEffect, useRef, useState } from "react";

const TriggerWordHolder = ({
  itemChance,
  word,
  onWordClicked,
  selectedWords,
  firstSet,
  setFirstSetTriggerWords,
}) => {
  const [chance, setChance] = useState(0);
  const chanceInput = useRef(null);

  useEffect(() => {
    setChance(itemChance);
  }, [itemChance]);

  useEffect(() => {
    if (firstSet) {
      setTimeout(() => {
        setFirstSetTriggerWords(false);
        const foundWord = selectedWords.find(
          (w) => w.obj.text.english == word.obj.text.english
        );
        if (foundWord) setChance(foundWord.chance);
        else setChance(0);
      }, 100);
    }
  }, [selectedWords]);

  const changeChance = (number) => {
    setChance(number);
    onWordClicked(word.obj, number, true);
  };

  return (
    <div
      className="divRowColored"
      style={{
        width: "100%",
        borderBottom: "1px solid white",
        paddingBottom: "2px",
        marginTop: "2px",
        alignItems: "center",
      }}
    >
      <img
        onClick={() => onWordClicked(word.obj, chance ?? 0)}
        src={
          selectedWords
            .map((w) => w.obj.text.english)
            .includes(word.obj.text.english)
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
        className="icon20"
      />
      <div
        className="textBoldWhite"
        style={{ width: "120px" }}
        onClick={() => onWordClicked(word.obj, chance)}
      >
        {word.obj.text.english}
      </div>
      <img
        src="/images/drawable/icon_word.png"
        className="icon20"
        style={{ marginRight: "5px" }}
      />
      <div className="divRow" style={{ flex: 1 }}>
        <input
          style={{ width: "40px", textAlign: "center", appearance: "none" }}
          type="number"
          ref={chanceInput}
          value={chance}
          onFocus={(e) => {
            chanceInput.current.select();
          }}
          onChange={(e) => {
            changeChance(e.target.value);
          }}
        />
        <img src="/images/loot/icon_chance.png" className="icon20" alt="" />
      </div>
    </div>
  );
};

export default TriggerWordHolder;
