import { capitalize } from "@mui/material";
import React from "react";

const SpecialConditionModal = ({
  mousePosition,
  setModalOpen,
  selectedConditions,
  setSelectedConditions,
}) => {
  const conditionList = ["love", "fear", "rage"];

  const onConditionClicked = (c) => {
    var newList = null;
    if (selectedConditions.includes(c))
      newList = selectedConditions.filter((s) => s != c);
    else newList = [...selectedConditions, c];
    setSelectedConditions(newList);
  };
  return (
    <div>
      <div className="overlayClear" onClick={() => setModalOpen(false)} />
      <div
        className="modalContent"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          zIndex: 1,
        }}
      >
        <div className="divColumn" style={{ width: "100%" }}>
          {conditionList.map((c) => (
            <ConditionHolder
              key={c}
              condition={c}
              onClick={onConditionClicked}
              selectedItems={selectedConditions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ConditionHolder = ({ condition, onClick, selectedItems }) => {
  return (
    <div
      className="divRowColored"
      onClick={() => onClick(condition)}
      style={{ width: "100px" }}
    >
      <img
        className="icon20"
        src={
          selectedItems.includes(condition)
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
      />
      <div className="textBoldWhite" style={{ flex: 1, textAlign: "center" }}>
        {capitalize(condition)}
      </div>
      <img src={`/images/ressources/res_${condition}.png`} className="icon20" />
    </div>
  );
};
export default SpecialConditionModal;
