import { Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import settingsStore from "../stores/settingsStore";
import PeopleFilterHolder from "./holder/PeopleFilterHolder";

const MessageFilterSection = () => {
  const { minMaxMsgUpvotes, setMinMaxUpvotes } = settingsStore();

  const handleUpvotesChange = (e) => {
    setMinMaxUpvotes(e.target.value);
    console.log("e.target.value ", e.target.value);
  };

  function valuetext(value) {
    return `${value}%`;
  }

  return (
    <div
      className="divColumn"
      style={{
        border: "1px solid grey",
        borderRadius: "1rem/1rem",
        flex: 1,
        maxHeight: "150px",
        overflowY: "auto",
        width: "90%",
        overflow: "hidden",
        marginBottom: "10px",
        backgroundColor: "#676867",
      }}
    >
      <div
        className="divColumn"
        style={{ width: "100%", flex: 1, marginTop: "5px" }}
      >
        <PeopleFilterHolder people={"allies"} />
        <PeopleFilterHolder people={"alike"} />
        <PeopleFilterHolder people={"foes"} />
        <PeopleFilterHolder people={"celebs"} />
      </div>

      <div className="divRow">
        <div
          className="textBoldWhite"
          style={{ fontSize: "12px", color: "lightgray" }}
        >
          min/max upvotes
        </div>
        <img src="/images/icons/icon_upvote.png" className="icon15" />
      </div>

      <Box
        style={{
          width: "100%",
          maxWidth: "200px",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        <Slider
          getAriaLabel={() => "Upvotes Range"}
          value={minMaxMsgUpvotes}
          onChange={handleUpvotesChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </div>
  );
};

export default MessageFilterSection;
