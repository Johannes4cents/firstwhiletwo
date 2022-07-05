import React, { useState } from "react";
import MediaSubPage from "./MediaSubPages/MediaSubPage";
import SubOptionsBar from "./SubOptionsBar";

const MediaPage = () => {
  const catList = ["All Posted", "Favorites"];
  const [selectedCat, setSelectedCat] = useState("All Posted");
  return (
    <div className="sectionBg">
      <SubOptionsBar
        catList={catList}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
      />
      <MediaSubPage from={selectedCat} />
    </div>
  );
};

export default MediaPage;
