import React, { useEffect, useRef, useState } from "react";
import chatStore from "../stores/chatStore";
import listsStore from "../stores/listsStore";
import { storage } from "../firebase/fireInit";
import LoadingSpinner from "../misc/elements/LoadingSpinner";
import { uploadImageToStorage } from "../misc/handleFirestore";
import {
  getRandomId,
  showImagePreviewWithFileReader,
} from "../misc/helperFuncs";
import { getDownloadURL, ref } from "firebase/storage";
import userStore from "../stores/userStore";
import useOnHover from "../hooks/useOnHover";

const AttachedMediaHolder = ({ media }) => {
  const { currentMessage, addMediaUrlToMsg, removeAttachedMedia } = chatStore();
  const { info } = userStore();
  const { addMyMedia } = listsStore();
  const image = useRef();
  const [uploadingImage, setUploadingImage] = useState(true);

  const hover = useOnHover({
    item: media,
    hoverOptions: {
      direction: "horizontal",
      options: [
        {
          description: "Remove Image from message",
          click: removeImage,
          payload: media,
          imgUrl: "/images/icons/icon_cancel.png",
        },
      ],
      size: "icon20",
    },
  });

  function removeImage() {
    removeAttachedMedia(media);
  }

  useEffect(() => {
    if (image && media.firstDrop) {
      uploadImageToStorage(
        `msgImages/${currentMessage.id}`,
        media.file,
        (path) => {
          getDownloadURL(ref(storage, path)).then((url) => {
            addMediaUrlToMsg({
              url,
              type: media.type,
              author: { id: info.uid, name: info.nickname },
              id: url,
              hidden: false,
              favorite: false,
            });
            addMyMedia(info.uid, {
              url,
              type: media.type,
              favorite: false,
              name: media.file.name,
              author: { id: info.uid, name: info.nickname },
              folder: [],
              id: url,
              firstDrop: false,
              hidden: false,
            });
            setUploadingImage(false);
          });
        }
      );
      showImagePreviewWithFileReader(media.file, image.current);
    } else {
      if (image.current != null) {
        image.current.setAttribute("src", media.url);
        setUploadingImage(false);
        addMediaUrlToMsg({
          url: media.url,
          type: media.type,
          author: media.author,
          id: media.id,
        });
      }
    }
  }, [image, media]);

  return (
    <div
      {...hover.divProps}
      className="divColumn"
      style={{ marginLeft: "10px", position: "relative" }}
    >
      {hover.hoverMenu}
      {uploadingImage && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#4f4f4f99",
            zIndex: 9999,
          }}
        >
          <LoadingSpinner />
        </div>
      )}
      <div className="divRow" style={{ width: "100%" }}></div>
      <img ref={image} className="image90" />
    </div>
  );
};

export default AttachedMediaHolder;
