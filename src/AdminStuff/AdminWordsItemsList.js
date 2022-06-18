import React, { useState, useEffect } from "react";
import SearchBar from "../components/bars/SearchBar";
import { updateListFireDocument } from "../misc/getFireStoreDataOneTime";
import { getItemById } from "../misc/helperFuncs";

const AdminWordsItemsList = ({
  globalItems,
  setSelectedWord,
  globalWords,
  textOrName,
  iconUrl,
  name,
  setState,
  language,
}) => {
  const [displayList, setDisplayList] = useState(globalItems);

  const onItemClicked = (item) => {
    let word = getItemById(item.word, globalWords);
    if (word != null) setSelectedWord(word);
  };

  useEffect(() => {
    setDisplayList(globalItems);
  }, [globalItems]);

  const onSearchFunc = (search) => {
    if (search.length > 0)
      setDisplayList(
        globalItems.filter(
          (i) =>
            i[textOrName].toLowerCase().startsWith(search.toLowerCase()) ||
            i.id.toString().startsWith(search)
        )
      );
    else setDisplayList(globalItems);
  };

  const deleteItem = (item) => {
    const word = getItemById(item.word, globalWords);
    // delete reference in words.items list
    if (word != null) {
      word[name].pop(item.id);
      //updateListFireDocument("globalWords", word.language, word.globalCat);
    }
    // delete item in fireDocuments list
    updateListFireDocument();
  };
  return (
    <div
      style={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {name}
      <div
        className="divColumnColored"
        style={{
          borderTop: "2px white solid",
          width: "220px",
          maxHeight: "300px",
          overflow: "auto",
        }}
      >
        <SearchBar onSearchFunc={onSearchFunc} />
        {displayList
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((i) => (
            <div
              className="divRowColored"
              style={{ width: "100%" }}
              key={i.id}
              onClick={() => onItemClicked(i)}
            >
              <img
                className="icon20"
                src="/images/drawable/icon_delete.png"
                onClick={() => deleteItem(i)}
              />
              <div style={{ color: "white", flex: 2, textAlign: "center" }}>
                {i[textOrName]}
              </div>
              <img className="icon20" src={iconUrl} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminWordsItemsList;
