import React from "react";
import SearchBar from "../components/bars/SearchBar";
import WordSubItem from "../components/parts/WordSubItem";
import AdminWordSubItem from "./AdminWordSubItem";

const AdminWordsList = ({
  selectedWord,
  words,
  setSelectedWord,
  setDisplayedWords,
  displayedWords,
}) => {
  const onWordClicked = (word) => {
    setSelectedWord(word);
  };
  const onSearchFunc = (search) => {
    if (search.length > 0) {
      setDisplayedWords(
        words.filter(
          (w) =>
            w.text.toLowerCase().startsWith(search.toLowerCase()) ||
            w.id.toString().startsWith(search)
        )
      );
    } else setDisplayedWords(words);
  };
  return (
    <div className="divColumn" style={{ color: "black" }}>
      Words
      <SearchBar
        onSearchFunc={onSearchFunc}
        showButton={false}
        onlyTitle
        setOnlyTitle
      />
      <div
        style={{
          maxHeight: "300px",
          minHeight: "300px",
          overflow: "auto",
          width: "250px",
        }}
      >
        {displayedWords.map((w) => (
          <AdminWordSubItem
            word={w}
            key={w.id}
            onWordClicked={onWordClicked}
            selectedWord={selectedWord}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminWordsList;
