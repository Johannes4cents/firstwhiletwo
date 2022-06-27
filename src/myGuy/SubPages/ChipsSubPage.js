import React, { useState } from "react";
import { useEffect } from "react";
import useOnHover from "../../hooks/useOnHover";
import { makeDescriptionField, objectToArray } from "../../misc/helperFuncs";
import userStore from "../../stores/userStore";
import DescriptionsBar from "../DescriptionsBar";

const ChipsSubPage = () => {
  const [displayedChips, setDisplayedChips] = useState([]);
  const { info } = userStore();
  useEffect(() => {
    if (info != null) {
      setDisplayedChips(objectToArray(info.chips));
    }
  }, [info]);
  return (
    <div
      className="divColumn"
      style={{ height: "100%", weight: "100%", marginTop: "5px" }}
    >
      <DescriptionsBar
        fields={[
          makeDescriptionField("empty", "", "25px", null, "", true),
          makeDescriptionField("Name", "11px", null, 1),
          makeDescriptionField("amount", "9px", "42px"),
        ]}
        sortingList={displayedChips}
        setSortingList={setDisplayedChips}
        startIdentifier={"name"}
      />
      <div style={{ height: "5px" }} />
      {displayedChips.map((kv) => {
        return <ChipHolder chip={kv} key={kv.key} />;
      })}
    </div>
  );
};

const ChipHolder = ({ chip }) => {
  const hover = useOnHover({ item: chip });
  return (
    <div
      {...hover.divProps}
      className="divRow"
      style={{ width: "100%", maxWidth: "580px", marginLeft: "5px" }}
    >
      <img src={`/images/icons/icon_${chip.key}.png`} className="icon20" />
      <div
        className="textBoldWhite"
        style={{ flex: 1, textAlign: "center", color: hover.textColor }}
      >
        {chip.key}
      </div>
      <div className="textBoldWhite" style={{ marginRight: "5px" }}>
        {chip.value}
      </div>
    </div>
  );
};

export default ChipsSubPage;
