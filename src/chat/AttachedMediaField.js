import React, { useEffect, useRef } from "react";

import chatStore from "../stores/chatStore";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import AttachedMediaHolder from "./AttachedMediaHolder";

const AttachedMediaField = () => {
  const { currentMessage } = chatStore();
  const { addMyMedia } = listsStore();
  const { setAttachedImagesHeight } = miscStore();
  const fieldDiv = useRef();

  useEffect(() => {
    if (fieldDiv != null) {
      if (currentMessage.attachedMedia.length > 0)
        setAttachedImagesHeight(fieldDiv.current.offsetHeight);
      else setAttachedImagesHeight(0);
    } else setAttachedImagesHeight(0);
  }, [fieldDiv]);

  return (
    <div ref={fieldDiv} className="divRow" style={{ width: "100%" }}>
      {currentMessage.attachedMedia.map((media) => {
        return (
          <AttachedMediaHolder
            media={media}
            key={media.firstDrop ? media.file.name : media.name}
          />
        );
      })}
    </div>
  );
};

export default AttachedMediaField;
