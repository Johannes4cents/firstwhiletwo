import React, { useEffect, useState } from "react";
import { makeFireFlag, makeStatement } from "../../fire_classes/Flag";

import {
  deleteDocInFirestore,
  getCollectionListener,
  getDocListener,
  setDocInFirestore,
  updateItemInGeneralList,
} from "../../misc/handleFirestore";

import CreateFlagQuestionBar from "./CreateFlagQuestionBar";
import CreateStatementsBar from "./CreateStatementsBar";
import FlagsListBar from "./FlagsListBar";
import PickFlagColorBar from "./PickFlagColorBar";
import SpecialRessourcesSection from "./SpecialRessourcesSection";

const MakeFlagsPage = () => {
  const [fireFlag, setFireFlag] = useState(makeFireFlag());
  const [newFlag, setNewFlag] = useState(true);
  const [specialRessources, setSpecialRessources] = useState([]);

  useEffect(() => {
    getDocListener("general/", "lists", (data) => {
      setSpecialRessources(data.specialRessources);
    });
  }, []);

  function resetFlag() {
    setFireFlag(makeFireFlag());
    setNewFlag(true);
  }

  function saveFlag() {
    setDocInFirestore("fireFlags", fireFlag.id, fireFlag);
    resetFlag();
  }

  function deleteFlag() {
    deleteDocInFirestore("fireFlags", fireFlag.id);
    resetFlag();
  }

  function addStatement() {
    let newFlag = { ...fireFlag };
    newFlag.statements.push(makeStatement(fireFlag.id));
    setFireFlag(newFlag);
  }

  function removeStatement(statement) {
    for (let i = 0; i < statement.specialRessources.length; i++) {
      const special = statement.specialRessources[i];
      special.statements = special.statements.filter((s) => s != statement.id);
      updateItemInGeneralList(
        "specialRessources",
        special,
        "id",
        special.id,
        false
      );
    }
    let newFlag = {
      ...fireFlag,
      statements: fireFlag.statements.filter((s) => s.id != statement.id),
    };
    setFireFlag(newFlag);
  }
  return (
    <div
      className="divColumn"
      style={{
        marginTop: "20px",
        width: "100%",
        marginRight: "15%",
        backgroundColor: "white",
      }}
    >
      <div
        className="divRowColored"
        style={{
          width: "100%",
          justifyContent: "center",
          borderBottom: "5px solid white",
        }}
      >
        <div className="textBoldWhite" style={{ fontSize: "25px" }}>
          Create Flags
        </div>
      </div>

      <div className="divRow">
        <FlagsListBar
          setFireFlag={setFireFlag}
          fireFlag={fireFlag}
          setNewFlag={setNewFlag}
        />
        <div className="divColumn">
          <PickFlagColorBar fireFlag={fireFlag} setFireFlag={setFireFlag} />

          <CreateFlagQuestionBar
            fireFlag={fireFlag}
            setFireFlag={setFireFlag}
          />
          <CreateStatementsBar
            fireFlag={fireFlag}
            setFireFlag={setFireFlag}
            specialRessources={specialRessources}
            removeStatement={removeStatement}
          />

          <SaveBar
            fireFlag={fireFlag}
            saveFlag={saveFlag}
            resetFlag={resetFlag}
            newFlag={newFlag}
            deleteFlag={deleteFlag}
            addStatement={addStatement}
            removeStatement={removeStatement}
          />
        </div>
        <div style={{ alignSelf: "start" }}>
          <SpecialRessourcesSection />
        </div>
      </div>
    </div>
  );
};

const SaveBar = ({
  fireFlag,
  saveFlag,
  resetFlag,
  newFlag,
  deleteFlag,
  addStatement,
}) => {
  return (
    <div
      className="divRow"
      style={{ width: "100%", justifyContent: "center", marginTop: "40px" }}
    >
      <img
        src="/images/drawable/btn_save.png"
        className="icon35"
        onClick={saveFlag}
      />
      <img
        src="/images/drawable/icon_sponge.png"
        className="icon35"
        style={{ marginLeft: "50px" }}
        onClick={resetFlag}
      />
      <img
        src="/images/icons/icon_statement.png"
        className="icon35"
        style={{ marginLeft: "50px", marginRight: "50px" }}
        onClick={addStatement}
      />
      {!newFlag && (
        <img
          src="/images/drawable/icon_trashcan.png"
          className="icon35"
          onClick={deleteFlag}
        />
      )}
    </div>
  );
};

export default MakeFlagsPage;
