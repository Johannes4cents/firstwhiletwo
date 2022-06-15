import { makeSpecialRessource } from "../../fire_classes/Flag";
import {
  addItemToGeneralList,
  updateItemInGeneralList,
} from "../../misc/handleFirestore";
import { getItemFromList } from "../../misc/helperFuncs";
import AddSpecialRessourceBar from "./AddSpecialRessourceBar";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../../firebase/fireInit";
import SpecialRessourceHolder from "./SpecialRessourceHolder";

const SpecialRessourcesBar = ({
  statement,
  onSpecialClicked,
  onSpecialAdded,
  special,
  setSpecial,
}) => {
  return (
    <div className="divRow" style={{ width: "100%", justifyContent: "start" }}>
      <AddSpecialRessourceBar
        statement={statement}
        special={special}
        setSpecial={setSpecial}
        onSpecialAdded={() => onSpecialAdded(special)}
      />
      <div className="divRow" style={{ marginLeft: "5px" }}>
        {statement.specialRessources.map((special) => {
          return (
            <div className="divRow" style={{ marginRight: "5px" }}>
              <SpecialRessourceHolder
                key={special.id}
                special={special}
                onSpecialClicked={onSpecialClicked}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialRessourcesBar;
