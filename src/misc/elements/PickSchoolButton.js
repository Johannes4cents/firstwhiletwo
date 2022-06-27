import React, { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import useOnHover from "../../hooks/useOnHover";
import miscStore from "../../stores/miscStore";
import { getRandomItem } from "../helperFuncs";
import { schools } from "../lists/otherLists";

const PickSchoolButton = ({
  size = "icon20",
  pickedSchool,
  setPickedSchool,
}) => {
  useEffect(() => {
    let randomSchool = getRandomItem(schools);
    setPickedSchool(randomSchool);
  }, []);
  const modal = useModal({
    modalContent: <PickSchoolModal setPickedSchool={setPickedSchool} />,
  });
  return (
    <div className="divRow" style={{ justifyContent: "center" }}>
      <img
        src={`/images/icons/icon_level_${
          pickedSchool ? pickedSchool.id : ""
        }.png`}
        className={size}
        onClick={() => {
          modal.open();
        }}
      />
      {modal.element}
    </div>
  );
};

const PickSchoolModal = ({ setPickedSchool }) => {
  return (
    <div
      className="divRow"
      style={{
        flexWrap: "wrap",
        maxWidth: "80px",
        border: "2px solid grey",
        borderRadius: "1rem/1rem",
        backgroundColor: "#6f6f6f",
        padding: "2px",
      }}
    >
      {schools.map((s) => {
        return (
          <SchoolImage
            key={s.id}
            school={s}
            setPickedSchool={setPickedSchool}
          />
        );
      })}
    </div>
  );
};

const SchoolImage = ({ school, setPickedSchool }) => {
  const { closeModal } = miscStore();

  const pickAndClose = () => {
    closeModal();
    setPickedSchool(school);
  };
  const hover = useOnHover({
    item: school,
    normalBgColor: "#6f6f6f",
    hoverBgColor: "#8f8f8f",
  });
  return (
    <div
      {...hover.divProps}
      style={{
        margin: "5px",
        backgroundColor: hover.bgColor,
      }}
    >
      <img
        key={school.id}
        src={`/images/icons/icon_level_${school.id}.png`}
        className="icon30"
        onClick={() => {
          pickAndClose();
        }}
      />
    </div>
  );
};

export default PickSchoolButton;
