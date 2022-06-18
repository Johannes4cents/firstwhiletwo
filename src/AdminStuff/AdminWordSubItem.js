import React from "react";

const AdminWordSubItem = ({ selectedWord, word, onWordClicked }) => {
  return (
    <div
      onClick={() => onWordClicked(word)}
      className="divRowColored"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        className="textWhite"
        style={{
          flex: "1",
          textAlign: "center",
          color: selectedWord == word ? "orange" : "white",
          cursor: "pointer",
        }}
      >
        {word.text}
      </div>
      <img className="icon20" src="/images/drawable/icon_word.png" />
    </div>
  );
};

export default AdminWordSubItem;
