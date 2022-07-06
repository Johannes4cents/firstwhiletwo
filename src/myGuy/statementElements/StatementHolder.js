import { useEffect } from "react";
import useOnHover from "../../hooks/useOnHover";
import userStore from "../../stores/userStore";

const StatementHolder = ({
  statement,
  onStatementClicked,
  language,
  index,
  answer,
}) => {
  const { myAnswers } = userStore();
  const hover = useOnHover({
    item: statement,
    inclusionList: myAnswers.map((a) => a.statement),
    identifier: "id",
    normalBgColor: index % 2 ? "#4f4f4f" : "gray",
    hoverBgColor: "#4f5f9f",
    hoverColor: "gold",
  });

  return (
    <div
      {...hover.divProps}
      className="divRow"
      style={{ width: "100%", backgroundColor: hover.bgColor }}
      onClick={() => onStatementClicked(statement)}
    >
      <div
        className="textBoldWhite"
        style={{
          color: hover.textColor,
          flex: 1,
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        {statement.text[language]}
      </div>
      <img src="/images/icons/icon_statement.png" className="icon20" />
    </div>
  );
};

export default StatementHolder;
