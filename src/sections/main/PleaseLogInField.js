import React from "react";

const PleaseLogInField = ({ message }) => {
  return (
    <div
      className="divColumn"
      style={{
        flex: 1,
        width: "100%",
        overflow: "auto",
        overflowX: "hidden",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          color: "lightgray",
          fontFamily: "Roboto-Bold",
          fontSize: "20px",
        }}
      >
        Sign In To Participate
      </div>
    </div>
  );
};

export default PleaseLogInField;
