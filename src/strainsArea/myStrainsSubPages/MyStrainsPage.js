import React, { useEffect, useState } from "react";
import listsStore from "../../stores/listsStore";
import StrainListHolder from "../holder/StrainListHolder";

const MyStrainsPage = () => {
  const [displayedStrains, setDisplayedStrains] = useState([]);
  const { myStrains } = listsStore();

  useEffect(() => {
    if (myStrains != null) setDisplayedStrains(myStrains);
  }, [myStrains]);
  return (
    <div
      className="divColumn"
      style={{
        width: "100%",
        maxHeight: "360px",
        overflow: "auto",
        height: "100%",
        flex: 1,
      }}
    >
      {displayedStrains.map((s) => {
        return <StrainListHolder key={s.id} strain={s} />;
      })}
    </div>
  );
};

export default MyStrainsPage;
