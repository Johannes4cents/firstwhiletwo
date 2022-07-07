import React, { useEffect } from "react";

const ComparedQuestionHolder = ({ flag }) => {
  useEffect(() => {
    console.log("flag - ", flag);
  }, [flag]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {flag && (
        <div
          className="divColumn"
          style={{ width: "100%", height: "100%" }}
        ></div>
      )}
    </div>
  );
};

export default ComparedQuestionHolder;
