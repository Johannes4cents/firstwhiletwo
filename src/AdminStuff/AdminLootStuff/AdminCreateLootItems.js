import React, { useEffect, useState } from "react";
import {
  checkIfListsTheSame,
  getItemById,
  getRandomId,
  idListToOjectsList,
  makeMousePositionObj,
} from "../../misc/helperFuncs";
import {
  addItemToFireItemsList,
  deleteItemInFireItemsList,
  getPureFirestoreFireItems,
  updateItemInFireItemsList,
} from "./handleLoot";
import PickTypeButton from "./PickTypeButton";
import { genres } from "./Genre";
import GenrePickerModal from "./GenrePickerModal";
import UpvotesBar from "./UpvotesBar";
import FireItemsMap from "./FireItemsMap";
import fireItem from "./fireItem";
import HintsBar from "./HintsBar";
import PhrasesBar from "./PhraseBar";
import StealProtectionBar from "./StealProtectionBar";
import ImgUrlBar from "./ImgUrlBar";
import ChanceBar from "./ChanceBar";
import NameBar from "./NameBar";
import AdminLootAttributesBar, {
  AdminLootSpecialAttributesBar,
} from "./AdminLootAttributesBar";
import SteppingStonesBar from "./SteppingStonesBar";
import MultiPhraseBar from "./MultiPhraseBar";
import userStore from "../../stores/userStore";

const AdminCreateLootItems = () => {
  const { info } = userStore();
  const [kingdomItems, setKingdomItems] = useState([]);
  const [id, setId] = useState(null);
  const [currentFireItem, setCurrentFireItem] = useState(fireItem());
  const [nameEntered, setNameEntered] = useState({ german: "", english: "" });
  const [oldType, setOldType] = useState("items");
  const [phrases, setPhrases] = useState({ german: [], english: [] });
  const [multiPhrases, setMultiPhrases] = useState({ german: [], english: [] });
  const [chance, setChance] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [genresIds, setGenresId] = useState(genres.map((g) => g.id));
  const [genreObjects, setGenreObjects] = useState(genres);
  const [enoughFilled, setEnoughFilled] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [genreModalOpen, setGenreModalOpen] = useState(false);
  const [stealProtection, setStealProtection] = useState({ from: 0, till: 0 });
  const [mousePosition, setMousePosition] = useState({});
  const [type, setType] = useState("items");
  const [hints, setHints] = useState({ german: [], english: [] });
  const [upvotes, setUpvotes] = useState([]);
  const [changed, setChanged] = useState(false);
  const [steppingStones, setSteppingStones] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confMousePos, setConfMousePos] = useState();

  useEffect(() => {
    getPureFirestoreFireItems(info, (list) => {
      setKingdomItems(list);
    });
  }, []);

  const onSteppingStoneSelected = (list) => {
    setSteppingStones(list);
  };

  // check if values have changed
  useEffect(() => {
    if (
      nameEntered.german != currentFireItem.name.german ||
      nameEntered.english != currentFireItem.name.english ||
      currentFireItem.chance != chance ||
      currentFireItem.imgUrl != imgUrl ||
      !checkIfListsTheSame(genresIds, currentFireItem.genres) ||
      type != currentFireItem.type ||
      stealProtection.from != currentFireItem.stealProtection.from ||
      stealProtection.till != currentFireItem.stealProtection.till ||
      !checkIfListsTheSame(hints.german, currentFireItem.hints.german) ||
      !checkIfListsTheSame(hints.english, currentFireItem.hints.english) ||
      !checkIfListsTheSame(phrases.german, currentFireItem.phrases.german) ||
      !checkIfListsTheSame(phrases.english, currentFireItem.phrases.english) ||
      !checkIfListsTheSame(attributes, currentFireItem.attributes) ||
      !checkIfListsTheSame(upvotes, currentFireItem.upvotes) ||
      !checkIfListsTheSame(
        steppingStones.map((i) => i.id) ?? [],
        currentFireItem.steppingStones ?? []
      ) ||
      !checkIfListsTheSame(
        multiPhrases.german,
        currentFireItem.multiPhrases.german
      ) ||
      !checkIfListsTheSame(
        multiPhrases.english,
        currentFireItem.multiPhrases.english
      )
    ) {
      setChanged(true);
    } else setChanged(false);
  }, [
    nameEntered,
    chance,
    imgUrl,
    genresIds,
    hints,
    type,
    stealProtection,
    phrases,
    attributes,
    upvotes,
    steppingStones,
    multiPhrases,
  ]);

  const onUpvoteClicked = (obj) => {
    console.log("obj is -", obj);
    if (!obj.update) {
      if (upvotes.map((o) => o.id).includes(obj.id)) {
        setUpvotes(upvotes.filter((o) => o.id != obj.id));
      } else {
        setUpvotes([
          ...upvotes,
          {
            id: obj.id,
            payload: obj.payload,
          },
        ]);
      }
    } else {
      let filterList = upvotes.filter((o) => o.id != obj.id);
      setUpvotes([
        ...filterList,
        {
          id: obj.id,
          payload: obj.payload,
        },
      ]);
    }
  };

  const openGenreModal = (e) => {
    setMousePosition(makeMousePositionObj(e));
    setGenreModalOpen(true);
  };

  const onGenrePicked = (genre) => {
    if (genresIds.includes(genre.id)) {
      setGenreObjects(genreObjects.filter((g) => g.id != genre.id));
      setGenresId(genresIds.filter((id) => id != genre.id));
    } else {
      setGenreObjects([...genreObjects, genre]);
      setGenresId([...genresIds, genre.id]);
    }
  };

  const createKingdomItem = () => {
    let ssIds = steppingStones.map((i) => i.id);

    const item = fireItem(
      id ?? getRandomId(),
      nameEntered,
      phrases,
      chance,
      imgUrl,
      attributes,
      stealProtection,
      type,
      hints,
      genresIds,
      upvotes,
      ssIds,
      multiPhrases
    );

    console.log("created item is = ", item);
    if (id == null) {
      addItemToFireItemsList(item, type);
    } else {
      if (oldType == type) {
        updateItemInFireItemsList(item, type);
      } else {
        deleteItemInFireItemsList(id, oldType);
        addItemToFireItemsList(item, type);
      }
    }

    setCurrentFireItem(fireItem());
  };

  function clearItem() {
    setCurrentFireItem(fireItem());
  }

  function deleteItem() {
    deleteItemInFireItemsList(id, oldType);
    clearItem();
  }

  // populate the value fields on new Item selected
  useEffect(() => {
    if (currentFireItem != null) {
      setNameEntered(currentFireItem.name);
      setPhrases(currentFireItem.phrases);
      setChance(currentFireItem.chance);
      setImgUrl(currentFireItem.imgUrl);
      setAttributes(currentFireItem.attributes);
      setStealProtection(currentFireItem.stealProtection);
      setGenresId(currentFireItem.genres);
      setGenreObjects(idListToOjectsList(currentFireItem.genres, genres));
      setUpvotes(currentFireItem.upvotes);
      setType(currentFireItem.type);
      setHints(currentFireItem.hints);
      setId(currentFireItem.id);
      setOldType(currentFireItem.type);
      setSteppingStones(
        currentFireItem.steppingStones.map(
          (id) => getItemById(id, kingdomItems) ?? []
        )
      );
      setMultiPhrases(
        currentFireItem.multiPhrases ?? { german: [], english: [] }
      );
    }
  }, [currentFireItem]);

  useEffect(() => {
    if (
      nameEntered.german &&
      nameEntered.english &&
      ((phrases.german.length > 0 && phrases.english.length > 0) ||
        (multiPhrases.german.length > 0 && multiPhrases.english.length > 0)) &&
      attributes.length > 0 &&
      chance > 0 &&
      imgUrl &&
      type
    )
      setEnoughFilled(true);
    else setEnoughFilled(false);
  }, [nameEntered, phrases, chance, imgUrl, attributes, multiPhrases]);

  const onName = (name, language) => {
    setNameEntered({ ...nameEntered, [language]: name });
  };

  const changeChance = (phrase, chance, isSpecial, language) => {
    setChanged(true);
    const index = phrases[language]
      .map((obj) => obj.phrase)
      .indexOf(phrase.phrase);
    const filteredList = phrases[language];
    const newObj = { ...phrase, chance: chance, isSpecial: isSpecial };
    filteredList[index] = newObj;
    const newPhrases = { ...phrases, [language]: filteredList };
    setPhrases(newPhrases);
  };

  const onPhraseEntered = (phraseText, chance, isSpecial, language) => {
    if (
      !phrases[language]
        .map((obj) => obj.phrase.toLowerCase())
        .includes(phraseText.toLowerCase())
    )
      setPhrases({
        ...phrases,
        [language]: [
          ...phrases[language],
          {
            phrase: phraseText.toLowerCase(),
            firstFound: null,
            lastFound: null,
            firstTry: null,
            chance,
            isSpecial: false,
          },
        ],
      });
  };

  const onRemovePhrase = (phrase, language) => {
    setPhrases({
      ...phrases,
      [language]: phrases[language].filter((p) => p.phrase != phrase.phrase),
    });
  };

  return (
    <div
      className="divColumn"
      style={{ height: "100%", alignItems: "baseline" }}
    >
      <div
        className="textBoldWhite"
        style={{ width: "100%", textAlign: "center" }}
      >
        CREATE FIRE ITEMS
      </div>
      <div
        className="divRowColored"
        style={{ height: "100%", borderTop: "10px solid white" }}
      >
        <div
          className="divColumn"
          style={{
            height: "100%",
            minWidth: "220px",
            borderLeft: "3px solid white",
          }}
        >
          <FireItemsMap
            collection={"items"}
            onItemClicked={setCurrentFireItem}
            selectedItem={currentFireItem}
            setSelectedItem={setCurrentFireItem}
          />
          <FireItemsMap
            collection={"spells"}
            onItemClicked={setCurrentFireItem}
            selectedItem={currentFireItem}
            setSelectedItem={setCurrentFireItem}
          />
          <FireItemsMap
            collection={"creatures"}
            onItemClicked={setCurrentFireItem}
            selectedItem={currentFireItem}
            setSelectedItem={setCurrentFireItem}
          />
          <FireItemsMap
            collection={"buildings"}
            onItemClicked={setCurrentFireItem}
            selectedItem={currentFireItem}
            setSelectedItem={setCurrentFireItem}
          />
          <FireItemsMap
            collection={"events"}
            onItemClicked={setCurrentFireItem}
            selectedItem={currentFireItem}
            setSelectedItem={setCurrentFireItem}
          />
        </div>
        <div
          style={{ backgroundColor: "white", width: "5px", height: "100%" }}
        />
        <div className="divRow" style={{ height: "100%" }}>
          <div className="divColumn" style={{ height: "100%" }}>
            {enoughFilled && (
              <img
                src={
                  changed
                    ? "/images/drawable/btn_save.png"
                    : "/images/icons/icon_thumbs_up.png"
                }
                className="icon35"
                onClick={createKingdomItem}
              />
            )}
            <div className="divRow" style={{ width: "100%" }}>
              {id != null && (
                <div
                  className="divRow"
                  style={{
                    width: "100%",
                    justifyContent: "end",
                    marginTop: "5px",
                    marginRight: "10px",
                    marginBottom: "15px",
                  }}
                  onClick={deleteItem}
                >
                  <div className="textBoldWhite">Delete Item</div>
                  <img
                    src="/images/drawable/icon_delete.png"
                    className="icon20"
                  />
                </div>
              )}
              <div
                className="divRow"
                style={{
                  width: "100%",
                  justifyContent: "end",
                  marginTop: "5px",
                  marginRight: "10px",
                  marginBottom: "15px",
                }}
                onClick={clearItem}
              >
                <div className="textBoldWhite">New Item</div>
                <img
                  src="/images/drawable/icon_sponge.png"
                  className="icon20"
                />
              </div>
            </div>

            <NameBar nameEntered={nameEntered} onName={onName} />
            <ChanceBar chance={chance} setChance={setChance} />
            <ImgUrlBar imgUrl={imgUrl} setImgUrl={setImgUrl} />
            <div
              className="divRow"
              style={{ margin: "5px" }}
              onClick={openGenreModal}
            >
              <div className="textBoldWhite">Pick Genres</div>
              <img src="/images/loot/icon_genres.png" className="icon25" />
            </div>
            <PickTypeButton onTypePicked={setType} type={type} />
            <StealProtectionBar
              stealProtection={stealProtection}
              setStealProtection={setStealProtection}
            />
            <HintsBar hints={hints} setHints={setHints} />
          </div>
          <div
            style={{ width: "5px", height: "100%", backgroundColor: "white" }}
          />
          <div className="divColumn" style={{ height: "100%" }}>
            <div style={{ height: "50%" }}>
              <PhrasesBar
                changeChance={changeChance}
                phrases={phrases}
                onPhraseEntered={onPhraseEntered}
                onRemovePhrase={onRemovePhrase}
                startChance={chance}
              />
            </div>
            <div style={{ width: "100%" }}>
              <UpvotesBar
                onUpvoteClicked={onUpvoteClicked}
                pickedUpvotes={upvotes}
                fireItem={currentFireItem}
              />
            </div>
          </div>
        </div>

        <AdminLootAttributesBar
          fireItem={currentFireItem}
          attributes={attributes}
          setAttributes={setAttributes}
        />
        <div
          style={{ backgroundColor: "white", height: "100%", width: "5px" }}
        />

        <AdminLootSpecialAttributesBar
          fireItem={currentFireItem}
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </div>
      <div
        className="divRow"
        style={{ height: "100%", alignItems: "baseline" }}
      >
        <SteppingStonesBar
          startItems={steppingStones}
          onItemsSelected={onSteppingStoneSelected}
          fireItem={currentFireItem}
        />
        <div
          className="divRow"
          style={{
            borderLeft: "10px solid white",
            borderTop: "10px solid white",
            alignItems: "baseline",
          }}
        >
          <MultiPhraseBar
            language={"german"}
            multiPhrases={multiPhrases}
            setMultiPhrases={setMultiPhrases}
            flag="/images/flags/flag_german.png"
          />
          <MultiPhraseBar
            language={"english"}
            multiPhrases={multiPhrases}
            setMultiPhrases={setMultiPhrases}
            flag="/images/flags/flag_us.png"
          />
        </div>
      </div>

      {genreModalOpen && (
        <GenrePickerModal
          mousePosition={mousePosition}
          setModalOpen={setGenreModalOpen}
          selectedGenres={genreObjects}
          setSelectedGenres={onGenrePicked}
        />
      )}
    </div>
  );
};

export default AdminCreateLootItems;
