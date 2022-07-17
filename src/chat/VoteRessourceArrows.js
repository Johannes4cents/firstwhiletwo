import React, { useEffect, useState } from "react";
import { incrementField } from "../misc/handleFirestore";
import miscStore from "../stores/miscStore";
import userStore from "../stores/userStore";

const VoteRessourceArrows = ({ ressource, hover, message, dbVotes }) => {
  const [voteHover, setVoteHover] = useState({ up: false, down: false });
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [firevotes, setFireVotes] = useState({ upvotes: 0, downvotes: 0 });

  const { updateLastActive } = miscStore();
  const { info, changeRessources } = userStore();

  useEffect(() => {
    setFireVotes(dbVotes);
  }, [message]);

  const onIconClicked = () => {
    console.log("ressource - ", ressource);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setVotes((votes) => {
        if (votes.downvotes != 0) {
          incrementField(
            `turfChats/${message.postedIn}/messages`,
            message.id,
            `ressources.${ressource}.downvotes`,
            votes.downvotes
          );
        }
        if (votes.upvotes != 0) {
          incrementField(
            `turfChats/${message.postedIn}/messages`,
            message.id,
            `ressources.${ressource}.upvotes`,
            votes.upvotes
          );
        }
        return { upvotes: 0, downvotes: 0 };
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function vote(vote) {
    updateLastActive();
    if (info.ressources[ressource].amount > 0) {
      setVotes((state) => {
        return { ...state, [vote]: state[vote] + 1 };
      });
      changeRessources(ressource, -1);
    }
  }
  return (
    <div className="divColumn" style={{ backgroundColor: "#4f4f4f" }}>
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
          onClick={() => vote("downvotes")}
          onMouseEnter={() => {
            setVoteHover({ down: true, up: false });
          }}
          onMouseLeave={() => {
            setVoteHover({ down: false, up: false });
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
          onClick={onIconClicked}
          style={{
            marginLeft: "5px",
            marginRight: "5px",
            maxWidth: "30px",
            height: "30px",
          }}
        />
        <div
          onClick={() => vote("upvotes")}
          onMouseEnter={() => {
            setVoteHover({ down: false, up: true });
          }}
          onMouseLeave={() => {
            setVoteHover({ down: false, up: false });
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
