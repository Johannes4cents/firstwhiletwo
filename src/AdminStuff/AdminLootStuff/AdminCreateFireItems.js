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
import UpvotesBar from "./UpvotesBar";
import FireItemsMap from "./FireItemsMap";
import fireItem from "./fireItem";
import HintsBar from "./HintsBar";
import StealProtectionBar from "./StealProtectionBar";
import ImgUrlBar from "./ImgUrlBar";
import ChanceBar from "./ChanceBar";
import NameBar from "./NameBar";
import AdminFireItemAttributesBar, {
  AdminLootSpecialAttributesBar,
} from "./AdminFireItemAttributesBar";
import SteppingStonesBar from "./SteppingStonesBar";
import MultiPhraseBar from "./MultiPhraseBar";
import userStore from "../../stores/userStore";
import AddTriggerWordsSection from "./adminAddTriggerWords/AddTriggerWordsSection";

const AdminCreateFireItems = () => {
  const { info } = userStore();
  const [kingdomItems, setKingdomItems] = useState([]);
  const [id, setId] = useState(null);
  const [currentFireItem, setCurrentFireItem] = useState(fireItem());
  const [nameEntered, setNameEntered] = useState({ german: "", english: "" });
  const [oldType, setOldType] = useState("items");
  const [triggerWords, setTriggerWords] = useState([]);
  const [multiPhrases, setMultiPhrases] = useState({ german: [], english: [] });
  const [chance, setChance] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [enoughFilled, setEnoughFilled] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [stealProtection, setStealProtection] = useState({ from: 0, till: 0 });
  const [type, setType] = useState("items");
  const [hints, setHints] = useState({ german: [], english: [] });
  const [upvotes, setUpvotes] = useState([]);
  const [changed, setChanged] = useState(false);
  const [steppingStones, setSteppingStones] = useState([]);
  const [firstSetTriggerWords, setFirstSetTriggerWords] = useState(true);
  const [baseItem, setBaseItem] = useState(null);

  useEffect(() => {
    getPureFirestoreFireItems(info, (list) => {
      setKingdomItems(list);
    });
  }, []);

  const onSteppingStoneSelected = (list) => {
    setSteppingStones(list);
  };

  const switchItem = (item) => {
    setFirstSetTriggerWords(true);
    setCurrentFireItem(item);
  };

  // check if values have changed
  useEffect(() => {
    if (
      nameEntered.german != currentFireItem.name.german ||
      nameEntered.english != currentFireItem.name.english ||
      currentFireItem.chance != chance ||
      currentFireItem.imgUrl != imgUrl ||
      type != currentFireItem.type ||
      stealProtection.from != currentFireItem.stealProtection.from ||
      stealProtection.till != currentFireItem.stealProtection.till ||
      !checkIfListsTheSame(hints.german, currentFireItem.hints.german) ||
      !checkIfListsTheSame(hints.english, currentFireItem.hints.english) ||
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
    hints,
    type,
    stealProtection,
    attributes,
    upvotes,
    steppingStones,
    multiPhrases,
  ]);

  const onUpvoteClicked = (obj) => {
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

  const createKingdomItem = () => {
    let ssIds = steppingStones.map((i) => i.id);

    const item = fireItem(
      id ?? getRandomId(),
      nameEntered,
      triggerWords,
      chance,
      imgUrl,
      attributes,
      stealProtection,
      type,
      hints,
      upvotes,
      ssIds,
      multiPhrases,
      baseItem
    );

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

    setFirstSetTriggerWords(true);
    setCurrentFireItem(fireItem());
  };

  function clearItem() {
    setFirstSetTriggerWords(true);
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
      setTriggerWords(currentFireItem.triggerWords ?? []);
      setChance(currentFireItem.chance);
      setImgUrl(currentFireItem.imgUrl);
      setAttributes(currentFireItem.attributes);
      setStealProtection(currentFireItem.stealProtection);
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
      triggerWords.length > 0 &&
      attributes.length > 0 &&
      chance > 0 &&
      imgUrl &&
      type
    )
      setEnoughFilled(true);
    else setEnoughFilled(false);
  }, [nameEntered, triggerWords, chance, imgUrl, attributes, multiPhrases]);

  const onName = (name, language) => {
    setNameEntered({ ...nameEntered, [language]: name });
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
            onItemClicked={switchItem}
            selectedItem={currentFireItem}
          />
          <FireItemsMap
            collection={"spells"}
            onItemClicked={switchItem}
            selectedItem={currentFireItem}
          />
          <FireItemsMap
            collection={"creatures"}
            onItemClicked={switchItem}
            selectedItem={currentFireItem}
          />
          <FireItemsMap
            collection={"buildings"}
            onItemClicked={switchItem}
            selectedItem={currentFireItem}
          />
          <FireItemsMap
            collection={"events"}
            onItemClicked={switchItem}
            selectedItem={currentFireItem}
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
              <AddTriggerWordsSection
                itemChance={chance}
                setFirstSetTriggerWords={setFirstSetTriggerWords}
                firstSetTriggerWords={firstSetTriggerWords}
                triggerWords={triggerWords}
                setTriggerWords={setTriggerWords}
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

        <AdminFireItemAttributesBar
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
    </div>
  );
};

export default AdminCreateFireItems;
