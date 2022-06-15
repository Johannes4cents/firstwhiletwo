import React from "react";

const PickFlagColorBar = ({ fireFlag, setFireFlag }) => {
  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        justifyContent: "space-around",
        marginBottom: "30px",
      }}
    >
      <FlagColorHolder
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        color={"blue"}
      />
      <FlagColorHolder
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        color={"brown"}
      />
      <FlagColorHolder
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        color={"gold"}
      />
      <FlagColorHolder
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        color={"green"}
      />
      <FlagColorHolder
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        color={"pink"}
      />
      <FlagColorHolder
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        color={"purple"}
      />
      <FlagColorHolder
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        color={"red"}
      />
      <FlagColorHolder
        fireFlag={fireFlag}
        setFireFlag={setFireFlag}
        color={"teal"}
      />
    </div>
  );
};

const FlagColorHolder = ({ color, fireFlag, setFireFlag }) => {
  const imgs = {
    selected: `/images/pageFlags/page_flag_${color}.png`,
    unselected: `/images/pageFlags/page_flag_unselected.png`,
  };

  return (
    <div
      className="divColumn"
      onClick={() => setFireFlag({ ...fireFlag, color: color })}
    >
      <img
        src={color == fireFlag.color ? imgs.selected : imgs.unselected}
        className="icon25"
      />
      <div
        className="textBlack"
        style={{ color: color == fireFlag.color ? color : "black" }}
      >
        {color}
      </div>
    </div>
  );
};

export default PickFlagColorBar;
