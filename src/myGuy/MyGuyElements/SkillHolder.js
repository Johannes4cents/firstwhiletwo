import React from "react";

const SkillHolder = ({ skill }) => {
  return (
    <div className="divColumn">
      <div className="divRow">
        <div
          className="textBoldWhite"
          style={{ textSize: "14px", fontStyle: "italic", textAlign: "center" }}
        >
          {skill.name}
        </div>
        <img src={skill.image} className="icon25" />
      </div>
      <div className="divRow">
        <SkillAttributeHolder
          value={skill.cost}
          image={"images/icons/icon_energy.png"}
          description={{
            name: "Energy Costs",
            description: `consumes ${skill.cost} per usage`,
          }}
        />
      </div>
    </div>
  );
};

const SkillAttributeHolder = ({ value, image, description }) => {
  return (
    <div className="divColumn">
      <img src={image} className="icon15" />
      <div className="textWhiteSmall">{value}</div>
    </div>
  );
};

export default SkillHolder;
