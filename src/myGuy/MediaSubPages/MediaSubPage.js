import React, { useEffect, useState } from "react";
import { makeDescriptionField } from "../../misc/helperFuncs";
import listsStore from "../../stores/listsStore";
import DescriptionsBar from "../DescriptionsBar";
import DisplayedMediaHolder from "./DisplayedMediaHolder";
import FilterMediaDiv from "./FilterMediaDiv";
import MediaFolderDiv from "./MediaFolderDiv";

const MediaSubPage = ({ from }) => {
  const { myMedia } = listsStore();
  const [displayedMedia, setDisplayedMedia] = useState([]);
  const [any, setAny] = useState("any");
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [selectedTypes, setSelectedTyped] = useState([
    "video",
    "image",
    "audio",
  ]);
  const filterOptions = [
    { name: "video", imgUrl: "/images/icons/icon_scene.png" },
    { name: "image", imgUrl: "/images/icons/icon_image.png" },
    { name: "audio", imgUrl: "/images/icons/icon_audio.png" },
  ];

  useEffect(() => {
    const filteredMedia = myMedia
      .filter((m) => filterMediaByFolder(m))
      .filter((m) => filterMediaByType(m))
      .filter((m) => filterByFavorites(m));

    setDisplayedMedia(filteredMedia);
  }, [myMedia, selectedFolder, selectedTypes, from, any]);

  function filterMediaByFolder(media) {
    if (any == "any") {
      return true;
    }
    return media.folder.some((f) => selectedFolder.includes(f));
  }

  function filterMediaByType(media) {
    return selectedTypes.includes(media.type);
  }

  function onTypeClicked(type) {
    if (selectedTypes.includes(type.name))
      setSelectedTyped(selectedTypes.filter((o) => o != type.name));
    else setSelectedTyped([...selectedTypes, type.name]);
  }

  function filterByFavorites(media) {
    if (from != "Favorites") return true;
    else return media.favorite;
  }

  const descFields = [
    makeDescriptionField("none", 10, 100, null, "none", true),
    makeDescriptionField("name", 15, null, 1, "name"),
    makeDescriptionField("type", 11, 50, null, "type", false),
  ];
  return (
    <div className="divColumn" style={{ width: "100%", height: "100%" }}>
      <FilterMediaDiv
        filterOptions={filterOptions}
        onTypeClicked={onTypeClicked}
        selectedTypes={selectedTypes}
      />
      <MediaFolderDiv
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        any={any}
        setAny={setAny}
      />
      <DescriptionsBar
        fields={descFields}
        sortingList={displayedMedia}
        setSortingList={setDisplayedMedia}
        startIdentifier={"name"}
      />
      <div className="divColumn" style={{ width: "100%", overflow: "auto" }}>
        {displayedMedia.map((m) => {
          return <DisplayedMediaHolder media={m} key={m.name} />;
        })}
      </div>
    </div>
  );
};

export default MediaSubPage;
