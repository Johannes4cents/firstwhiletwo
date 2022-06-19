import { useEffect, useState } from "react";
import { idListToOjectsList } from "../../misc/helperFuncs";
import adminStore from "../../stores/adminStore";

const TriggerWordHolder = ({ word, onWordClicked }) => {
  const { selectedTriggerWordCats, triggerWordCats } = adminStore();
  const [wcs, setWcs] = useState([]);

  useEffect(() => {
    setWcs(idListToOjectsList(word.cats, triggerWordCats));
  }, [word]);
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
      onClick={() => onWordClicked(word)}
    >
      <img
        src={
          word.cats.some((cat) =>
            selectedTriggerWordCats.map((wc) => wc.id).includes(cat)
          )
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
        className="icon20"
      />
      <div className="textBoldWhite" style={{ width: "120px" }}>
        {word.text.english}
      </div>
      <img
        src="/images/drawable/icon_word.png"
        className="icon20"
        style={{ marginRight: "5px" }}
      />
      <div className="divRow" style={{ flex: 1 }}>
        {(word.words ? word.words.english : []).map((s) => {
          return (
            <div
              key={s}
              style={{
                color: "lightGrey",
                marginLeft: "3px",
                fontSize: "10px",
              }}
            >
              {s}
            </div>
          );
        })}
      </div>
      <div className="divRow" style={{ marginLeft: "2px" }}>
        {wcs.map((wc) => {
          return (
            <div className="divRow" key={wc.id}>
              <div className="textWhite" style={{ fontSize: "12px" }}>
                {wc.text}{" "}
              </div>
              <img src="/images/icons/icon_word_cat.png" className="icon10" />
              <div className="textWhite"> |</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TriggerWordHolder;
