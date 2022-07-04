import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { storage } from "../firebase/fireInit";
import { uploadImageToStorage } from "../misc/handleFirestore";
import { showImagePreviewWithFileReader } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";

const AttachedImagesField = () => {
  const { attachedImages, removeAttachedImage } = chatStore();
  return (
    <div className="divRow">
      {attachedImages.map((i) => {
        return <AttachedImageHolder pcImage={i} />;
      })}
    </div>
  );
};

const AttachedImageHolder = ({ pcImage, message }) => {
  const image = useRef();
  const [uploadingImage, setUploadingImage] = useState();

  useEffect(() => {
    if (image) {
      uploadImageToStorage("", pcImage, (path) => {
        //onImageUploaded(path);
      });
      showImagePreviewWithFileReader(pcImage, image.current);
    }
  }, [image, pcImage]);

  return (
    <div className="divColumn">
      <div className="divRow"></div>
      <img ref={image} />
    </div>
  );
};

export default AttachedImagesField;
