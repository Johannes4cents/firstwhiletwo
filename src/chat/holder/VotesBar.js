import React from "react";
import { objectToArray } from "../../misc/helperFuncs";
import VoteRessourceArrows from "../VoteRessourceArrows";

const VotesBar = ({ message }) => {
  return (
    <div
      className="divRow"
      style={{
        justifyContent: "end",
        position: "absolute",
        backgroundColor: "#4f4f4f",
        right: "0px",
        bottom: "0px",
        zIndex: 9999999999,
      }}
    >
      {objectToArray(message.ressources).map((r) => {
        return (
          <VoteRessourceArrows
            key={r.key}
            dbVotes={r.value}
            ressource={r.key}
            message={message}
          />
        );
      })}
    </div>
  );
};

export default VotesBar;
