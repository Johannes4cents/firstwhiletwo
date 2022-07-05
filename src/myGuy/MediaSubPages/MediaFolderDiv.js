import React, { useEffect } from "react";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import { addRemoveItem } from "../../misc/helperFuncs";
import SingleInputModal from "../../modals/SingleInputModal";
import userStore from "../../stores/userStore";
import AnyFolderHolder from "./AnyFolderHolder";
import FolderHolder from "./FolderHolder";

const MediaFolderDiv = () => {
  const { mediaFolder, addMediaFolder, info } = userStore();
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [any, setAny] = useState("any");
  const modal = useModal({
    modalContent: (
      <SingleInputModal onSave={addFolder} title={"Enter Folder Name"} />
    ),
  });

  function addFolder(name) {
    addMediaFolder(info.uid, name);
  }

  const onAnyClicked = () => {
    if (any == "any") {
      setAny("none");
      setSelectedFolder(mediaFolder);
    } else {
      setAny("any");
      setSelectedFolder([]);
    }
  };

  const onFolderClicked = (folder) => {
    addRemoveItem(folder, selectedFolder, setSelectedFolder);
  };

  useEffect(() => {
    console.log("mediaFolder - ", mediaFolder);
    setSelectedFolder(mediaFolder);
  }, []);
  return (
    <div
      className="divRow"
      style={{ width: "100%", backgroundColor: "#5f5f4f", marginTop: "2px" }}
    >
      <AnyFolderHolder text={any} onAnyClicked={onAnyClicked} />
      <div className="divRow" style={{ flex: 1, overflow: "auto" }}>
        {mediaFolder.map((f) => {
          return (
            <FolderHolder
              key={f}
              folder={f}
              selectedFolder={selectedFolder}
              onFolderClicked={onFolderClicked}
            />
          );
        })}
      </div>
      <img
        src="/images/drawable/btn_plus_symbol.png"
        onClick={() => {
          modal.open();
        }}
        className="icon15"
        style={{ marginRight: "5px" }}
      />
      {modal.element}
    </div>
  );
};

export default MediaFolderDiv;
