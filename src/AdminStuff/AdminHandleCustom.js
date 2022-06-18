import React, { useState, useEffect } from "react";
import SearchBar from "../components/bars/SearchBar";
import useGetStates from "../hooks/useGetStates";
import { deleteCustomItem, getCustomList } from "../misc/handleFirestore";

const CustomHolder = ({
  customItem,
  nameOrText,
  onItemClicked,
  selectedItem,
  multiPick = false,
  collection,
}) => {
  return (
    <div
      className="divRowColored"
      style={{ width: "200px" }}
      onClick={() =>
        onItemClicked({ item: customItem, collection: collection })
      }
    >
      {multiPick && (
        <img
          className="icon15"
          src={
            selectedItem.id == customItem
              ? "/images/drawable/checked_box.png"
              : "/images/drawable/checkbox_unchecked.png"
          }
        />
      )}
      <div
        className="textBoldWhite"
        style={{
          flex: 1,
          textAlign: "center",
          color: customItem.id == selectedItem.item.id ? "gold" : "white",
        }}
      >
        {nameOrText == "name" ? customItem.name : customItem.text}
      </div>
      <img className="icon20" src="/images/icons/icon_custom.png" />
    </div>
  );
};

const CustomBar = ({
  barName,
  originalList,
  displayedList,
  setDisplayedList,
  nameOrText,
  onItemClicked,
  selectedItem,
  multiPick = false,
}) => {
  const onSearchFunc = (search) => {
    if (search.length > 0)
      setDisplayedList(
        originalList.filter((i) =>
          nameOrText == "name"
            ? i.name.toLowerCase() == search.toLowerCase()
            : i.text.toLowerCase() == search.toLowerCase()
        )
      );
    else setDisplayedList(originalList);
  };

  return (
    <div className="divColumn">
      <div style={{ width: "100%", textAlign: "center", fontWeight: "600" }}>
        {barName}
      </div>
      <SearchBar onSearchFunc={onSearchFunc} />
      {displayedList.map((i) => {
        return (
          <CustomHolder
            collection={barName}
            key={i.id}
            customItem={i}
            nameOrText={nameOrText}
            onItemClicked={onItemClicked}
            selectedItem={selectedItem}
            multiPick={multiPick}
          />
        );
      })}
    </div>
  );
};

const OptionsButton = ({ name, onOptionClicked, image }) => {
  return (
    <div
      className="divRowColored"
      style={{ width: "200px", borderBottom: "1px solid white" }}
      onClick={onOptionClicked}
    >
      <div className="textBoldWhite" style={{ flex: 1, textAlign: "center" }}>
        {name}
      </div>
      <img className="icon25" src={image} />
    </div>
  );
};

const AdminHandleCustom = () => {
  const d = useGetStates();
  const [customWords, setCustomWords] = useState([]);
  const [customWordCats, setCustomWordCats] = useState([]);
  const [customFams, setCustomFams] = useState([]);
  const [customStems, setCustomStems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    item: { id: "" },
    collection: "",
  });

  const deleteSelectedItem = () => {
    const setObject = {
      wordCats: setDisplayedWordCats,
      words: setDisplayedWords,
      fams: setDisplayedFams,
      stems: setDisplayedStems,
    };

    const customNames = {
      wordCats: "customWordCats",
      words: "customWords",
      fams: "customFams",
      stems: "customStems",
    };
    deleteCustomItem(
      d,
      selectedItem.item,
      customNames[selectedItem.collection]
    );
    setObject[selectedItem.collection]((state) =>
      state.filter((i) => i.id != selectedItem.item.id)
    );
  };

  useEffect(() => {
    getCustomList(d.info.object, "customWords").then((words) => {
      setDisplayedWords(words);
      setCustomWords(words);
    });

    getCustomList(d.info.object, "customWordCats").then((wcs) => {
      setDisplayedWordCats(wcs);
      setCustomWordCats(wcs);
    });

    getCustomList(d.info.object, "customFams").then((fams) => {
      setDisplayedFams(fams);
      setCustomFams(fams);
    });

    getCustomList(d.info.object, "customStems").then((stems) => {
      setCustomStems(stems);
      setDisplayedStems(stems);
    });
  }, []);

  const [displayedWordCats, setDisplayedWordCats] = useState([]);
  const [displayedWords, setDisplayedWords] = useState([]);
  const [displayedFams, setDisplayedFams] = useState([]);
  const [displayedStems, setDisplayedStems] = useState([]);
  return (
    <div className="divRow">
      <div className="divRow" style={{ alignItems: "baseline" }}>
        <CustomBar
          barName={"wordCats"}
          originalList={customWordCats}
          displayedList={displayedWordCats}
          setDisplayedList={setDisplayedWordCats}
          nameOrText={"name"}
          onItemClicked={setSelectedItem}
          selectedItem={selectedItem}
          multiPick={false}
        />
        <CustomBar
          barName={"words"}
          originalList={customWords}
          displayedList={displayedWords}
          setDisplayedList={setDisplayedWords}
          nameOrText={"text"}
          onItemClicked={setSelectedItem}
          selectedItem={selectedItem}
          multiPick={false}
        />
        <CustomBar
          barName={"fams"}
          originalList={customFams}
          displayedList={displayedFams}
          setDisplayedList={setDisplayedFams}
          nameOrText={"text"}
          onItemClicked={setSelectedItem}
          selectedItem={selectedItem}
          multiPick={false}
        />
        <CustomBar
          barName={"stems"}
          originalList={customStems}
          displayedList={displayedStems}
          setDisplayedList={setDisplayedStems}
          nameOrText={"name"}
          onItemClicked={setSelectedItem}
          selectedItem={selectedItem}
          multiPick={false}
        />
      </div>
      <div className="divColumn" style={{ marginLeft: "20px" }}>
        <OptionsButton
          name="Delet Item"
          onOptionClicked={deleteSelectedItem}
          image={"/images/drawable/icon_delete.png"}
        />
      </div>
    </div>
  );
};

export default AdminHandleCustom;
