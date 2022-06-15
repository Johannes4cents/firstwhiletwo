import React from "react";
import ChatArea from "../../chat/ChatArea";
import TurfSection from "../../Turf/TurfSection";
import StrainsArea from "../../strainsArea/StrainsArea";

const MainPage = () => {
  return (
    <div
      className="divRowColored"
      style={{
        flex: "1",
        height: "94vh",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "15%",
          height: "100%",
          justifyContent: "center",
          minWidth: "250px",
        }}
      >
        <StrainsArea />
      </div>
      <div style={{ width: "55%", height: "100%", justifyContent: "center" }}>
        <ChatArea />
      </div>
      <div style={{ width: "30%", justifyContent: "center" }}>
        <TurfSection />
      </div>
    </div>
  );
};

export default MainPage;
