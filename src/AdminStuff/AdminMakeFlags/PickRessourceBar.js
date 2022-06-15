import React from "react";

const PickRessourceBar = ({ statement, fireFlag, setFireFlag, id }) => {
  const ressources = [
    "cash",
    "diplomacy",
    "energy",
    "fear",
    "food",
    "happiness",
    "health",
    "knowledge",
    "love",
    "mana",
    "oil",
    "rage",
    "science",
    "weapons",
    "religion",
  ];
  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        justifyContent: "space-around",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      {ressources.map((r) => {
        return (
          <RessourceHolder
            fireFlag={fireFlag}
            setFireFlag={setFireFlag}
            name={r}
            key={r}
            cat={id}
            statement={statement}
          />
        );
      })}
    </div>
  );
};

const RessourceHolder = ({ statement, name, fireFlag, setFireFlag }) => {
  function ressourceClicked() {
    var list = [];
    if (statement.ressources.includes(name)) {
      list = statement.ressources.filter((r) => r != name);
    } else {
      list = [...statement.ressources, name];
    }
    statement.ressources = list;

    setFireFlag({ ...fireFlag, statements: fireFlag.statements });
  }
  const imgs = {
    selected: `/images/ressources/res_${name}.png`,
    unselected: `/images/ressources/res_${name}_unselected.png`,
  };
  return (
    <img
      src={
        statement.ressources.includes(name) ? imgs.selected : imgs.unselected
      }
      className="icon30"
      onClick={ressourceClicked}
    />
  );
};

export default PickRessourceBar;
