import { capitalize } from "@mui/material";
import React from "react";
import settingsStore from "../../stores/settingsStore";

const PeopleFilterHolder = ({ people }) => {
  const { showCelebs, showAllies, showFoes, showAlike, switchShowPeople } =
    settingsStore();

  const peopleObj = {
    celebs: showCelebs,
    allies: showAllies,
    foes: showFoes,
    alike: showAlike,
  };

  const onClick = () => {
    console.log("people are ", people);
    switchShowPeople(people);
  };

  return (
    <div
      className="divRow"
      style={{ width: "100%", marginLeft: "15px", marginBottom: "2px" }}
      onClick={onClick}
    >
      <img
        src={
          peopleObj[people]
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
        className="icon20"
      />
      <div className="textWhite" style={{ flex: 1, textAlign: "center" }}>
        Show {capitalize(people)}
      </div>
      <img
        style={{ marginRight: "12px", width: "25px" }}
        src={
          peopleObj[people]
            ? `/images/icons/icon_${people}.png`
            : `/images/icons/icon_${people}_unselected.png`
        }
        className="icon20"
      />
    </div>
  );
};

export default PeopleFilterHolder;
