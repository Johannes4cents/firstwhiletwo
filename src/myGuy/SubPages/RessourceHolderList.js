import React from "react";

const RessourceHolderList = ({ ressource, index }) => {
  return (
    <div
      className="divColumn"
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: index % 2 == 0 ? "#6f6f6f" : "#4f4f4f",
      }}
    >
      <div className="divRow" style={{ width: "100%" }}>
        <div
          className="textBoldWhite"
          style={{ width: "50px", textAlign: "center" }}
        >
          {ressource.amount}
        </div>
        <div className="divRow" style={{ flex: 1, justifyContent: "center" }}>
          <div className="textBoldWhite">{ressource.name}</div>
          <img
            src={`/images/ressources/res_${ressource.name}.png`}
            className="icon20"
          />
        </div>
        <div
          className="textBoldWhite"
          style={{ width: "100px", textAlign: "center" }}
        >
          {1000 / ressource.dropChance}
        </div>
      </div>
    </div>
  );
};

export default RessourceHolderList;
