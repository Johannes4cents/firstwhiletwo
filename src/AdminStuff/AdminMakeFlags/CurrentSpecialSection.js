import React from "react";
import { makeSpecialRessource } from "../../fire_classes/Flag";
import PickImageImage from "../../misc/elements/PickImageImage";
import {
  deleteItemInGeneralList,
  updateDocInFirestore,
  updateItemInGeneralList,
} from "../../misc/handleFirestore";
import { getItemFromList } from "../../misc/helperFuncs";
import listsStore from "../../stores/listsStore";

const CurrentSpecialSection = ({ currentSpecial, setCurrentSpecial }) => {
  const { flags } = listsStore();
  const changeSpecial = (value, prop) => {
    const newSpecial = { ...currentSpecial, [prop]: value };
    setCurrentSpecial(newSpecial);
  };

  const deleteSpecial = () => {
    for (let i = 0; i < currentSpecial.statements.length; i++) {
      const statement = currentSpecial.statements[i];

      statement.specialRessources = statement.specialRessources.filter(
        (s) => s.id != currentSpecial.id
      );

      const fireFlag = getItemFromList(flags, "id", statement.fireFlag, false);
      const newStatements = [
        ...fireFlag.statements.filter((s) => s.id != statement.id),
        statement,
      ];

      fireFlag.statements = newStatements;

      updateDocInFirestore(
        "fireFlags/",
        fireFlag.id,
        "statements",
        newStatements
      );
    }
    deleteItemInGeneralList(
      "specialRessources",
      "id",
      currentSpecial.id,
      false
    );

    setCurrentSpecial(makeSpecialRessource());
  };

  return (
    <div className="divColumn" style={{ marginBottom: "10px" }}>
      <div
        className="divRowColored"
        style={{ width: "100%", textAlign: "center" }}
      >
        <div
          className="textBoldWhite"
          style={{ flex: 1, borderBottom: "5px solid white" }}
        >
          Selected Special
        </div>
      </div>
      <div className="divRow">
        <input
          style={{ textAlign: "center", fontFamily: "Roboto-Bold" }}
          value={currentSpecial.name}
          onChange={(e) => changeSpecial(e.target.value, "name")}
        />
        <PickImageImage
          imgUrl={currentSpecial.imgUrl}
          imgSize={"icon30"}
          storagePath={"specialRessources"}
          onImageChanged={(fullPath) => {
            changeSpecial(fullPath, "imgUrl");
          }}
        />
        <img
          src="/images/drawable/icon_trashcan.png"
          className="icon30"
          onClick={deleteSpecial}
        />
      </div>
    </div>
  );
};

export default CurrentSpecialSection;
