import React, { useEffect, useState } from "react";
import PickImageImage from "../../misc/elements/PickImageImage";

const AddSpecialRessourceBar = ({
  statement,
  special,
  setSpecial,
  onSpecialAdded,
}) => {
  const [specialColor, setSpecialColor] = useState(false);
  const [hover, setHover] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);

  useEffect(() => {
    if (statement.specialRessources.length > 0 || hover) setSpecialColor(true);
    else setSpecialColor(false);
  }, [statement, hover]);
  const onInputEnter = (e) => {
    if (e.key == "Enter") onSpecialAdded();
  };
  return (
    <div className="divRow" style={{ marginTop: "2px" }}>
      <div
        className="divRow"
        onClick={() => {
          setInputOpen(!inputOpen);
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <img
          src={
            specialColor
              ? "/images/icons/icon_special.png"
              : "/images/icons/icon_special_unselected.png"
          }
          className="icon25"
          style={{ marginLeft: "10px", marginRight: "10px", cursor: "pointer" }}
        />
        <div
          className="textBlackBold"
          style={{ marginRight: "5px", cursor: "pointer" }}
        >
          Special Ressources:
        </div>
      </div>

      {inputOpen && (
        <div className="divRow">
          <input
            onKeyDown={(e) => onInputEnter(e)}
            style={{ textAlign: "center", marginRight: "5px" }}
            value={special.name}
            onChange={(e) => setSpecial({ ...special, name: e.target.value })}
          />
          <PickImageImage
            imgUrl={""}
            imgSize={"icon25"}
            storagePath={"specialRessources"}
            onImageChanged={(path) => {
              setSpecial({ ...special, imgUrl: path });
            }}
          />
          <img
            onClick={onSpecialAdded}
            src="/images/drawable/btn_save.png"
            className="icon20"
            style={{ marginLeft: "5px" }}
          />
        </div>
      )}
    </div>
  );
};

export default AddSpecialRessourceBar;
