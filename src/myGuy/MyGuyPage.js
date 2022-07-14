import React from "react";

import FieldHolder from "../misc/elements/FieldHolder";
import { genderObj } from "../misc/objects";
import userStore from "../stores/userStore";
import ItemSubPage from "./SubPages/ItemSubPage";

const MyGuyPage = () => {
  const path = "/images/icons/icon_";
  const { myGuy } = userStore();

  function makeField(
    name,
    value,
    image,
    textColor,
    alternativeValue,
    hoverChange
  ) {
    return { name, value, image, textColor, alternativeValue, hoverChange };
  }
  const fieldArrays = [
    [
      makeField(
        "Name",
        myGuy.name ?? null,
        path + "user.png",
        myGuy.name ? "white" : "lightgray",
        "Give your guy a name",
        true
      ),
    ],
    [
      makeField(
        "Constitution",
        `${myGuy.constitution.health}/${myGuy.constitution.max}`,
        path + "constitution.png",
        "white",
        null,
        false
      ),
      makeField("Energy", 0, path + "energy.png", "white", null, false),
    ],
    [
      makeField(
        "Gender",
        myGuy.gender,
        genderObj[myGuy.gender],
        myGuy.gender ? "white" : "lightgray",
        "Pick Gender",
        true
      ),
    ],
  ];
  return (
    <div className="sectionBg">
      <div
        className="divColumn"
        style={{ width: "100%", marginTop: "10px", justifyContent: "center" }}
      >
        {fieldArrays.map((fa) => (
          <div className="divRow" style={{ width: "100%" }}>
            {fa.map((f) => (
              <FieldHolder
                fieldName={f.name}
                value={f.value}
                image={f.image}
                key={f.name}
                textColor={f.textColor}
                alternativeValue={f.alternativeValue}
                hoverChange={f.hoverChange}
              />
            ))}
          </div>
        ))}
      </div>
      <ItemSubPage />
    </div>
  );
};

export default MyGuyPage;
