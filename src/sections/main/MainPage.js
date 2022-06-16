import React from "react";
import ChatArea from "../../chat/ChatArea";
import StrainsArea from "../../strainsArea/StrainsArea";
import SignInBar from "../topBar/SignInBar";
import MyGuySection from "../../myGuy/MyGuySection";
import TurfSection from "../../turfStuff/TurfSection";

//doof

const MainPage = () => {
  return (
    <div
      className="divRowColored"
      style={{
        flex: "1",
        height: "100vh",
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
          marginTop: "5px",
        }}
      >
        <StrainsArea />
      </div>
      <div
        className="divColumn"
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <div
          className="divRow"
          style={{
            width: "100%",
            justifyContent: "end",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <SignInBar />
        </div>

        <div className="divRow" style={{ width: "100%", height: "100%" }}>
          <div
            style={{
              width: "63%",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <ChatArea />
          </div>
          <div
            className="divColumn"
            style={{
              width: "37%",
              justifyContent: "baseline",
              height: "100%",
              marginRight: "10px",
              marginBottom: "15px",
              paddingLeft: "10px",
            }}
          >
            <MyGuySection />
            <TurfSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
