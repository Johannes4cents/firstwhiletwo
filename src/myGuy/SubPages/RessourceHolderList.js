import React from "react";
import useOnHover from "../../hooks/useOnHover";

const RessourceHolderList = ({ ressource, index }) => {
  const hover = useOnHover({ item: ressource });
  return (
    <div
      {...hover.divProps}
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
          style={{ width: "50px", textAlign: "center", color: hover.textColor }}
        >
          {ressource.amount}
        </div>
        <div className="divRow" style={{ flex: 1, justifyContent: "center" }}>
          <div className="textBoldWhite" style={{ color: hover.textColor }}>
            {ressource.name}
          </div>
          <img
            src={`/images/ressources/res_${ressource.name}.png`}
            className="icon20"
          />
        </div>
        <div
          className="textBoldWhite"
          style={{
            width: "100px",
            textAlign: "center",
            color: hover.textColor,
          }}
        >
          {1000 / ressource.dropChance}
        </div>
      </div>
    </div>
  );
};

export default RessourceHolderList;
