import React, { useEffect, useState } from "react";
import { incrementField } from "../misc/handleFirestore";
import miscStore from "../stores/miscStore";
import userStore from "../stores/userStore";

const VoteRessourceArrows = ({
  ressource,
  hover,
  setHover,
  message,
  dbVotes,
}) => {
  const [voteHover, setVoteHover] = useState({ up: false, down: false });
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [firevotes, setFireVotes] = useState({ upvotes: 0, downvotes: 0 });

  const { updateLastActive, addToUpdateList } = miscStore();
  const { info } = userStore();

  useEffect(() => {
    setFireVotes(dbVotes);
  }, [message]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (votes.upvotes != 0 || votes.downvotes != 0) {
        incrementField();
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function vote(vote) {
    updateLastActive();
    setVotes((state) => {
      let newVotes = { ...votes, [vote]: votes[vote] + 1 };
      addToUpdateList(info.uid, {
        id: message.id,
        path: message.path,
        votes: newVotes,
        ressource,
      });
    });
  }
  return (
    <div className="divColumn">
      <div className="divRow" style={{ justifyContent: "center" }}>
        <div
          className="textBoldWhite"
          style={{ borderBottom: "1px solid grey" }}
        >
          {(
            firevotes.upvotes -
            firevotes.downvotes -
            votes.downvotes +
            votes.upvotes
          ).toString()}
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
            {ressource && (firevotes.downvotes + votes.downvotes).toString()}
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
            {ressource && (firevotes.upvotes + votes.upvotes).toString()}
          </div>
          <img src="/images/icons/icon_upvote.png" className="icon20" />
        </div>
      </div>
    </div>
  );
};

export default VoteRessourceArrows;
