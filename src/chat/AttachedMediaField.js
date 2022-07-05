import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { storage } from "../firebase/fireInit";
import LoadingSpinner from "../misc/elements/LoadingSpinner";
import { uploadImageToStorage } from "../misc/handleFirestore";
import { showImagePreviewWithFileReader } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import userStore from "../stores/userStore";

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
        return <AttachedMediaHolder media={media} key={media.file.name} />;
      })}
    </div>
  );
};

const AttachedMediaHolder = ({ media }) => {
  const { currentMessage, addMediaUrlToMsg } = chatStore();
  const { info } = userStore();
  const { addMyMedia } = listsStore();
  const image = useRef();
  const [uploadingImage, setUploadingImage] = useState(true);

  useEffect(() => {
    if (image) {
      uploadImageToStorage(
        `msgImages/${currentMessage.id}`,
        media.file,
        (path) => {
          getDownloadURL(ref(storage, path)).then((url) => {
            addMediaUrlToMsg({
              url,
              type: media.type,
              author: { id: info.uid, name: info.nickname },
            });
            addMyMedia(info.uid, {
              url,
              type: media.type,
              favorite: false,
              name: media.file.name,
              author: { id: info.uid, name: info.nickname },
            });
            setUploadingImage(false);
          });
        }
      );
      showImagePreviewWithFileReader(media.file, image.current);
    }
  }, [image, media]);

  return (
    <div
      className="divColumn"
      style={{ marginLeft: "10px", position: "relative" }}
    >
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

export default AttachedMediaField;
