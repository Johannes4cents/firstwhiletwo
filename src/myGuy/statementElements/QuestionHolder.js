import { useEffect } from "react";

const QuestionHolder = ({ fireFlag, language }) => {
  const onClick = () => {
    console.log("fireFlag - ", fireFlag);
  };
  return (
    <div className="divColumn" onClick={onClick}>
      <img
        src={`/images/pageFlags/page_flag_${fireFlag.color}.png`}
        className="icon25"
      />
      <div className="textWhite">
        {fireFlag ? fireFlag.question[language] : ""}
      </div>
    </div>
  );
};

export default QuestionHolder;
