import React from "react";

const FlagsBar = ({ activeFlag, setActiveFlag }) => {
  return (
    <div className="divRow" style={{ width: "100%", marginTop: "2px" }}>
      <div
        className="divRow"
        style={{
          flex: 3,
          justifyContent: "space-around",
        }}
      >
        <img
          onClick={() => setActiveFlag(1)}
          src={`/images/buttons/button_podium_1${
            activeFlag != 1 ? "_unselected" : ""
          }.png`}
          style={{ objectFit: "contain", width: "52px" }}
        />
        <img
          onClick={() => setActiveFlag(2)}
          src={`/images/buttons/button_podium_2${
            activeFlag != 2 ? "_unselected" : ""
          }.png`}
          style={{ objectFit: "contain", width: "40px" }}
        />
        <img
          onClick={() => setActiveFlag(3)}
          src={`/images/buttons/button_podium_3${
            activeFlag != 3 ? "_unselected" : ""
          }.png`}
          style={{ objectFit: "contain", width: "40px" }}
        />
      </div>
      <img
        onClick={() => {
          setActiveFlag(4);
        }}
        src={
          activeFlag == 4
            ? "images/icons/icon_other_flags.png"
            : "images/icons/icon_other_flags_unselected.png"
        }
        style={{ flex: 2, objectFit: "contain", width: "30px", height: "30px" }}
      />
    </div>
  );
};

export default FlagsBar;
