import React, { useEffect, useState } from "react";
import { incrementField } from "../misc/handleFirestore";

const VoteRessourceArrows = ({
  ressource,
  hover,
  setHover,
  message,
  index,
}) => {
  const indexObj = {
    0: "First",
    1: "Second",
    2: "Third",
  };
  const [voteHover, setVoteHover] = useState({ up: false, down: false });
  const [votes, setVotes] = useState({ up: 0, down: 0 });
  const [fireUpvotes, setFireUpvotes] = useState();
  const [fireDownvotes, setFireDownvotes] = useState();

  useEffect(() => {
    setFireUpvotes(message[`upvotes${indexObj[index]}`]);
    setFireDownvotes(message[`downvotes${indexObj[index]}`]);
  }, [message]);

  function vote(vote) {
    setVotes({ ...votes, [vote]: votes[vote] + 1 });
    let key = `${vote}vote${indexObj[index]}`;
    incrementField(message.collection, message.id, key, 1);
  }
  return (
    <div className="divColumn">
      <div className="divRow" style={{ justifyContent: "center" }}>
        <div
          className="textBoldWhite"
          style={{ borderBottom: "1px solid grey" }}
        >
          {(fireUpvotes - fireDownvotes - votes.down + votes.up).toString()}
        </div>
      </div>
      <div className="divRow">
        <div
          onClick={() => vote("down")}
          onMouseEnter={() => {
            setVoteHover({ down: true, up: false });
            setHover(false);
          }}
          onMouseLeave={() => {
            setVoteHover({ down: false, up: false });
            setHover(true);
          }}
          onMouseDown={() => {
            setVoteHover({ down: false, up: false });
          }}
          onMouseUp={() => {
            setVoteHover({ down: true, up: false });
          }}
          className="divRow"
          style={{
            backgroundColor: hover ? "darkgray" : voteHover.down && "grey",
            borderRadius: "2px",
            border: "1px solid grey",
            padding: "5px",
            borderRadius: "15%",
          }}
        >
          <img src="/images/icons/icon_downvote.png" className="icon20" />
          <div className="textBoldWhite">
            {ressource && (fireDownvotes + votes.down).toString()}
          </div>
        </div>
        <img
          src={`/images/ressources/res_${ressource}.png`}
          className="icon30"
          style={{
            marginLeft: "5px",
            marginRight: "5px",
            maxWidth: "30px",
            height: "30px",
          }}
        />
        <div
          onClick={() => vote("up")}
          onMouseEnter={() => {
            setVoteHover({ down: false, up: true });
            setHover(false);
          }}
          onMouseLeave={() => {
            setVoteHover({ down: false, up: false });
            setHover(true);
          }}
          onMouseDown={() => {
            setVoteHover({ down: false, up: false });
          }}
          onMouseUp={() => {
            setVoteHover({ down: false, up: true });
          }}
          className="divRow"
          style={{
            backgroundColor: hover ? "darkgray" : voteHover.up && "grey",
            borderRadius: "2px",
            border: "1px solid grey",
            padding: "5px",
            borderRadius: "15%",
          }}
        >
          <div
            className="textBoldWhite"
            style={{ backgroundColor: "4f4f4f", borderRadius: "2px" }}
          >
            {ressource && (fireUpvotes + votes.up).toString()}
          </div>
          <img src="/images/icons/icon_upvote.png" className="icon20" />
        </div>
      </div>
    </div>
  );
};

export default VoteRessourceArrows;
