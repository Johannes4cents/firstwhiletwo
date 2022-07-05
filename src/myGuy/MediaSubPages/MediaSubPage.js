import React, { useState } from "react";
import listsStore from "../../stores/listsStore";
import FilterMediaDiv from "./FilterMediaDiv";
import MediaFolderDiv from "./MediaFolderDiv";

const MediaSubPage = ({ from }) => {
  const { myMedia } = listsStore();
  const [selectedOptions, setSelectedOptions] = useState([
    "videos",
    "images",
    "audio",
  ]);
  const filterOptions = [
    { name: "videos", imgUrl: "/images/icons/icon_scene.png" },
    { name: "images", imgUrl: "/images/icons/icon_image.png" },
    { name: "audio", imgUrl: "/images/icons/icon_audio.png" },
  ];

  function onOptionClicked(option) {
    if (selectedOptions.includes(option.name))
      setSelectedOptions(selectedOptions.filter((o) => o != option.name));
    else setSelectedOptions([...selectedOptions, option.name]);
  }
  return (
    <div className="divColumn" style={{ width: "100%", height: "100%" }}>
      <FilterMediaDiv
        filterOptions={filterOptions}
        onOptionClicked={onOptionClicked}
        selectedOptions={selectedOptions}
      />
      <MediaFolderDiv />
    </div>
  );
};

export default MediaSubPage;
