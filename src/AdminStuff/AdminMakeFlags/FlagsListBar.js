import React, { useEffect, useState } from "react";
import SearchBar from "../../misc/elements/SearchBar";
import { getCollectionListener } from "../../misc/handleFirestore";
import listsStore from "../../stores/listsStore";

const FlagsListBar = ({ fireFlag, setFireFlag, setNewFlag }) => {
  const [displayedFlags, setDisplayedFlags] = useState([]);
  const { flags, setFlags, statementFlags, setStatementFlags } = listsStore();

  const changeOpenFlag = (flag) => {
    setFireFlag(flag);
    setNewFlag(false);
  };

  function onSearchFunc(input) {
    if (input.length == 0) setDisplayedFlags(statementFlags);
    else
      setDisplayedFlags(
        statementFlags.filter((f) =>
          f.text.english.toLowerCase().includes(input.toLowerCase())
        )
      );
  }

  useEffect(() => {
    getCollectionListener("fireFlags", (flagList) => {
      let list = [];
      flagList.forEach((f) => {
        f.statements.forEach((s) => {
          if (f.specialRessources == null) f.specialRessources = [];
          list.push({
            statement: s.text.english,
            flag: f,
            id: s.id,
            ressources: s.ressources,
          });
        });
      });
      setFlags(flagList);
      setDisplayedFlags(list);
      setStatementFlags(list);
    });
  }, []);
  return (
    <div
      className="divColumn"
      style={{
        borderRight: "20px solid white",
        alignSelf: "baseline",
        minWidth: "500px",
      }}
    >
      <div
        className="divRowColored"
        style={{ width: "100%", textAlign: "center" }}
      >
        <div
          className="textBoldWhite"
          style={{ flex: 1, borderBottom: "5px solid white" }}
        >
          Created Flags
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <SearchBar onSearchFunc={onSearchFunc} />
      </div>
      {displayedFlags
        .sort((a, b) => (a.statement > b.statement ? 1 : -1))
        .map((f) => {
          return (
            <FlagHolder
              f={f}
              key={f.id}
              fireFlag={fireFlag}
              setFireFlag={changeOpenFlag}
            />
          );
        })}
    </div>
  );
};

const FlagHolder = ({ f, fireFlag, setFireFlag }) => {
  const [textColor, setTextColor] = useState("white");
  useEffect(() => {
    setTextColor(fireFlag.id == f.flag.id ? "gold" : "white");
  }, [fireFlag]);
  return (
    <div
      className="divRowColored"
      style={{
        width: "400px",
        textAlign: "center",
        borderBottom: "1px solid white",
      }}
      onMouseEnter={() => setTextColor("orange")}
      onMouseLeave={() =>
        setTextColor(fireFlag.id == f.flag.id ? "gold" : "white")
      }
      onClick={() => setFireFlag(f.flag)}
    >
      <div className="divRow" style={{ marginLeft: "5px" }}>
        {f.ressources.map((r) => {
          return (
            <img
              key={r}
              src={`/images/ressources/res_${r}.png`}
              className="icon20"
              style={{ marginRight: "5px" }}
            />
          );
        })}
      </div>
      <div className="textBoldWhite" style={{ flex: 1, color: textColor }}>
        {f.statement}
      </div>
      <img
        style={{ marginRight: "5px", marginTop: "2px" }}
        src={`/images/pageFlags/page_flag_${f.flag.color}.png`}
        className="icon20"
      />
    </div>
  );
};

export default FlagsListBar;
