import { async } from "@firebase/util";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import useMouseHandling from "../../hooks/useMouseHandling";
import useOnHover from "../../hooks/useOnHover";
import bgImg from "../../images/bg_strain.png";
import listsStore from "../../stores/listsStore";
import { forArrayLength, getComparissonScore } from "../../misc/helperFuncs";
import userStore from "../../stores/userStore";

const ChatListHolder = ({ chat, comparissons }) => {
  const { info } = userStore();
  const hover = useOnHover({ item: chat.key, active: info.activeChat });
  const { setActiveStrains, allStrains } = listsStore();

  const [loadingScore, setLoadingScore] = useState(true);
  const [averageScore, setAverageScore] = useState(null);

  const clickChat = useCallback(() => {
    console.log("chat.key - ", chat.key, "info.activechat - ", info.activeChat);
    if (info) {
      console.log("chat - ", chat);
      let strainList = [];
      let strains = chat.key.split("|");
      forArrayLength(strains, (string) => {
        let foundStrain = allStrains.find((s) => s.id == string);
        if (foundStrain) strainList.push(foundStrain);
      });
      console.log("strainList - ", strainList);
      if (strainList.length == strains.length)
        setActiveStrains(info.uid, strainList);
    }
  }, [info]);

  const mouseHandling = useMouseHandling({ onOneClick: clickChat });

  async function calculateScore(userList) {
    const score = { score: 0, user: 0 };
    forArrayLength(userList, (user) => {
      let compScore = getComparissonScore(user.id, comparissons);
      if (compScore) {
        score.score += compScore.user.percentage;
        score.user += 1;
      }
    });
    if (score.user > 0) setAverageScore(Math.round(score.score / score.user));

    setLoadingScore(false);
  }

  useEffect(() => {
    if (chat) calculateScore(chat.value);
  }, [chat]);

  return (
    <div
      {...hover.divProps}
      {...mouseHandling}
      className="divRow"
      style={{
        backgroundImage: `url(${bgImg})`,
        maxHeight: "29px",
        height: "29px",
        width: "100%",
        minHeight: "29px",
      }}
    >
      <div className="divRow" style={{ marginLeft: "5px" }}>
        <div className="textWhiteSmall">{chat.value.length}</div>
        <img src="/images/icons/icon_other_user.png" className="icon15" />
      </div>
      <div
        className="textWhite"
        style={{ flex: 1, textAlign: "center", color: hover.textColor }}
      >
        {chat.key}
      </div>
      {!loadingScore && averageScore && (
        <div className="divRow">
          <div className="textWhiteSmall">{averageScore}</div>
          <img
            src="/images/icons/icon_compare_score_field.png"
            className="icon15"
            style={{ maxWidth: "20px", marginLeft: "2px", marginRight: "5px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatListHolder;
