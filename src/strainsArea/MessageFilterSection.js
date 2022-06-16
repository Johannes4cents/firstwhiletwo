import { Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import settingsStore from "../stores/settingsStore";
import PeopleFilterHolder from "./holder/PeopleFilterHolder";

const MessageFilterSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);
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
        maxHeight: "150px",
        overflowY: "auto",
        width: "90%",
        overflow: "hidden",
        marginBottom: "10px",
        backgroundColor: "#676867",
      }}
    >
      {expanded && (
        <div
          className="divColumn"
          style={{ width: "100%", flex: 1, marginTop: "5px" }}
        >
          <PeopleFilterHolder people={"allies"} />
          <PeopleFilterHolder people={"alike"} />
          <PeopleFilterHolder people={"foes"} />
          <PeopleFilterHolder people={"celebs"} />
        </div>
      )}

      <div className="divRow">
        <div
          className="textBoldWhite"
          style={{ fontSize: "12px", color: "lightgray" }}
        >
          min/max upvotes
        </div>
        <img src="/images/icons/icon_upvote.png" className="icon15" />
      </div>

      <div className="divRow" style={{ width: "100%" }}>
        <img
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          onClick={() => setExpanded(!expanded)}
          src={
            expanded
              ? hover
                ? "/images/icons/icon_contract.png"
                : "/images/icons/icon_contract_unselected.png"
              : hover
              ? "/images/icons/icon_expand.png"
              : "/images/icons/icon_expand_unselected.png"
          }
          className="icon20"
        />
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
    </div>
  );
};

export default MessageFilterSection;
