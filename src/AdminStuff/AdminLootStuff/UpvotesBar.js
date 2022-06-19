import React, { useEffect, useState } from "react";
import SearchBar from "../../misc/elements/SearchBar";
import { makeMousePositionObj } from "../../misc/helperFuncs";
import SpecialConditionModal from "./SpecialConditionModal";

const UpvotesBar = ({ pickedUpvotes, onUpvoteClicked, fireItem }) => {
  const upvotes = [
    "mana",
    "cash",
    "diplomacy",
    "energy",
    "fear",
    "food",
    "happiness",
    "health",
    "knowledge",
    "love",
    "oil",
    "rage",
    "religion",
    "science",
    "weapons",
    "diamonds",
  ];
  const [displayedUpvotes, setDisplayedUpvotes] = useState(upvotes);

  const onSearchFunc = (search) => {
    if (search.length > 0) {
      setDisplayedUpvotes(
        upvotes.filter((u) => u.toLowerCase().startsWith(search.toLowerCase()))
      );
    } else setDisplayedUpvotes(upvotes);
  };
  return (
    <div className="divColumn" style={{ width: "100%", marginTop: "20px" }}>
      <div className="textBoldWhite" style={{ marginBottom: "5px" }}>
        Conditions
      </div>
      <SearchBar onSearchFunc={onSearchFunc} />
      <div
        className="divColumn"
        style={{
          width: "100%",
          overflow: "auto",
          maxHeight: "100px",
          marginTop: "10px",
        }}
      >
        {displayedUpvotes.map((u) => {
          return (
            <UpvoteHolder
              key={u}
              upvote={u}
              pickedUpvotes={pickedUpvotes}
              onClick={onUpvoteClicked}
              fireItem={fireItem}
            />
          );
        })}
      </div>
    </div>
  );
};

const UpvoteHolder = ({ fireItem, pickedUpvotes, upvote, onClick }) => {
  const [payload, setPayload] = useState(0);
  const [firstLoadSafety, setFirstLoadSafety] = useState("");

  useEffect(() => {
    if (!firstLoadSafety) {
      onClick({ id: upvote, payload, update: true });
    } else setFirstLoadSafety(false);
  }, [payload]);

  useEffect(() => {
    setFirstLoadSafety(true);
  }, [fireItem]);

  useEffect(() => {
    if (fireItem != null) {
      if (fireItem.upvotes != null) {
        let foundUpvote = fireItem.upvotes.find((u) => u.id == upvote);

        if (foundUpvote != null) {
          setPayload(foundUpvote.payload);
        } else setPayload(0);
      } else setPayload(0);
    }
  }, [fireItem]);

  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        justifyContent: "space-between",
        borderBottom: "1px solid white",
      }}
    >
      <img
        onClick={() =>
          onClick({
            id: upvote,
            payload,
            update: false,
          })
        }
        className="icon25"
        src={
          pickedUpvotes.map((u) => u.id).includes(upvote)
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
      />
      <div
        className="textBoldWhite"
        style={{ flex: 1, textAlign: "center" }}
        onClick={() =>
          onClick({
            id: upvote,
            payload,
            update: false,
          })
        }
      >
        {upvote}
      </div>
      <div className="divRow">
        <img
          src={`/images/ressources/res_${upvote}.png`}
          className="icon20"
          style={{ maxWidth: "25px", marginRight: "15px" }}
        />
      </div>

      <input
        value={payload}
        style={{ width: "40px", textAlign: "center", marginRight: "5px" }}
        onChange={(e) => {
          setPayload(e.target.value);
        }}
      />
    </div>
  );
};

export default UpvotesBar;
