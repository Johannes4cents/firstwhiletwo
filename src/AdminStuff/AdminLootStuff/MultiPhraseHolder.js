import React from "react";

const MultiPhraseHolder = ({ multiPhrase, onMClicked }) => {
  return (
    <div
      className="divRowColored"
      style={{ width: "100%", justifyContent: "space-around" }}
    >
      {multiPhrase.strings.map((string) => {
        return (
          <div
            key={string}
            style={{ flex: 1, maxHeight: "40px", overflowY: "auto" }}
            onClick={() => onMClicked(multiPhrase)}
          >
            <div className="textBoldWhite">{string}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MultiPhraseHolder;
