import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { makeSpecialRessource } from "../../fire_classes/Flag";
import PickImageImage from "../../misc/elements/PickImageImage";
import {
  addItemToGeneralList,
  deleteItemInGeneralList,
  updateItemInGeneralList,
} from "../../misc/handleFirestore";
import { getItemFromList } from "../../misc/helperFuncs";
import miscStore from "../../stores/miscStore";
import AddSpecialRessourceBar from "./AddSpecialRessourceBar";
import PickRessourceBar from "./PickRessourceBar";
import SpecialRessourcesBar from "./SpecialRessourcesBar";

const CreateStatementsBar = ({
  fireFlag,
  setFireFlag,
  specialRessources,
  removeStatement,
}) => {
  return (
    <div
      className="divColumn"
      style={{ maxHeight: "600px", overflowY: "auto" }}
    >
      {fireFlag.statements.map((s, index) => {
        return (
          <StatementHolder
            index={index}
            key={s.id}
            fireFlag={fireFlag}
            setFireFlag={setFireFlag}
            statement={s}
            specialRessources={specialRessources}
            removeStatement={removeStatement}
          />
        );
      })}
    </div>
  );
};

const StatementHolder = ({
  statement,
  fireFlag,
  setFireFlag,
  index,
  specialRessources,
  removeStatement,
}) => {
  const { dragCursor } = miscStore();
  const [special, setSpecial] = useState(makeSpecialRessource());
  const onChange = (text, language) => {
    const index = fireFlag.statements.indexOf(statement);
    const statements = fireFlag.statements.filter((s) => s.id != statement.id);
    statement.text[language] = text;
    statements.splice(index, 0, statement);
    setFireFlag({ ...fireFlag, statements });
  };

  const onRemoveSpecial = (special) => {
    const index = fireFlag.statements.indexOf(statement);
    const statements = fireFlag.statements.filter((s) => s.id != statement.id);
    let newStatement = {
      ...statement,
      specialRessources: statement.specialRessources.filter(
        (s) => s.id != special.id
      ),
    };
    statements.splice(index, 0, newStatement);

    let sr = getItemFromList(specialRessources, "id", special.id, false);

    if (sr != null) {
      sr.statements = sr.statements.filter((s) => s != statement.id);
      updateItemInGeneralList("specialRessources", sr, "id", sr.id, false);
    }

    setFireFlag({ ...fireFlag, statements });
  };

  const onSpecialAdded = (special) => {
    const sr = getItemFromList(specialRessources, "name", special.name, true);
    if (
      !statement.specialRessources.map((s) => s.name).includes(special.name)
    ) {
      if (sr == null) {
        special.statements = [statement.id];
        statement.specialRessources.push(special);
        addItemToGeneralList("specialRessources", special);
      } else {
        sr.statements.push(statement.id);
        statement.specialRessources.push(sr);
        updateItemInGeneralList("specialRessources", sr, "id", sr.id, false);
      }

      const index = fireFlag.statements.indexOf(statement);
      const statements = fireFlag.statements.filter(
        (s) => s.id != statement.id
      );
      statements.splice(index, 0, statement);
      setFireFlag({ ...fireFlag, statements });
    } else {
    }
    setSpecial(makeSpecialRessource());
  };

  const handleDropIn = () => {
    if (dragCursor != null) {
      const special = dragCursor.item;
      if (
        !statement.specialRessources.map((sr) => sr.id).includes(special.id)
      ) {
        onSpecialAdded(special);
      }
    }
  };

  return (
    <div
      onMouseUp={handleDropIn}
      className="divColumn"
      style={{ width: "100%", border: "2px solid black", marginBottom: "5px" }}
    >
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "center", marginBottom: "5px" }}
      >
        <div
          className="divRow"
          style={{ flex: 1, justifyContent: "center", marginLeft: "35px" }}
        >
          <img
            src="/images/icons/icon_statement.png"
            className="icon20"
            style={{ marginRight: "5px" }}
          />
          <div style={{ fontFamily: "Roboto-Bold" }}>Statement {index + 1}</div>
        </div>
        <img
          src="/images/icons/icon_statement_remove.png"
          className="icon25"
          style={{ marginRight: "10px" }}
          onClick={() => removeStatement(statement)}
        />
      </div>
      <div className="divRowColored">
        <div className="divColumn">
          <div className="textBoldWhite">Answer Eng</div>
          <input
            style={{
              textAlign: "center",
              width: "400px",
              fontFamily: "Roboto-Bold",
              fontSize: "15px",
            }}
            value={statement.text.english}
            onChange={(e) => onChange(e.target.value, "english")}
          />
        </div>
        <div className="divColumn">
          <div className="textBoldWhite">Answer Ger</div>
          <input
            style={{
              textAlign: "center",
              width: "400px",
              fontFamily: "Roboto-Bold",
              fontSize: "15px",
            }}
            value={statement.text.german}
            onChange={(e) => onChange(e.target.value, "german")}
          />
        </div>
      </div>
      <PickRessourceBar
        statement={statement}
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        id={statement.id}
      />
      <SpecialRessourcesBar
        statement={statement}
        onSpecialClicked={onRemoveSpecial}
        onSpecialAdded={onSpecialAdded}
        special={special}
        setSpecial={setSpecial}
      />
    </div>
  );
};

export default CreateStatementsBar;
