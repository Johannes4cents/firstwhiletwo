import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { storage } from "../firebase/fireInit";
import LoadingSpinner from "../misc/elements/LoadingSpinner";
import { uploadImageToStorage } from "../misc/handleFirestore";
import { showImagePreviewWithFileReader } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import miscStore from "../stores/miscStore";

const AttachedImagesField = () => {
  const { currentMessage } = chatStore();
  const { setAttachedImagesHeight } = miscStore();
  const fieldDiv = useRef();

  useEffect(() => {
    if (fieldDiv != null) {
      if (currentMessage.attachedImages.length > 0)
        setAttachedImagesHeight(fieldDiv.current.offsetHeight);
      else setAttachedImagesHeight(0);
    } else setAttachedImagesHeight(0);
  }, [fieldDiv]);

  return (
    <div ref={fieldDiv} className="divRow" style={{ width: "100%" }}>
      {currentMessage.attachedImages.map((i) => {
        return <AttachedImageHolder pcImage={i} key={i.name} />;
      })}
    </div>
  );
};

const AttachedImageHolder = ({ pcImage }) => {
  const { currentMessage, addImgUrlToMsg } = chatStore();
  const image = useRef();
  const [uploadingImage, setUploadingImage] = useState(true);

  useEffect(() => {
    if (image) {
      uploadImageToStorage(
        `msgImages/${currentMessage.id}`,
        pcImage,
        (path) => {
          getDownloadURL(ref(storage, path)).then((url) => {
            addImgUrlToMsg(url);
            setUploadingImage(false);
          });
        }
      );
      showImagePreviewWithFileReader(pcImage, image.current);
    }
  }, [image, pcImage]);

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

export default AttachedImagesField;
