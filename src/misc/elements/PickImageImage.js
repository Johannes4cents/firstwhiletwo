import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/fireInit";
import React, { useEffect, useRef, useState } from "react";
import { uploadImageToStorage } from "../handleFirestore";
import { showImagePreviewWithFileReader } from "../helperFuncs";

const PickImageImage = ({
  imgUrl,
  imgSize,
  storagePath,
  changeable = true,
  onImageChanged,
}) => {
  const image = useRef(null);
  const inputFile = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (imgUrl != "" && imgUrl != null) {
      getDownloadURL(ref(storage, imgUrl)).then((url) => {
        image.current.setAttribute("src", url);
      });
    }
  }, [image, imgUrl]);

  const onFileChange = (e) => {
    let file = e.target.files[0];
    setSelectedImage(file);
    showImagePreviewWithFileReader(file, image.current);
  };

  useEffect(() => {
    if (selectedImage != null) {
      uploadImageToStorage(storagePath, selectedImage, (path) => {
        onImageChanged(path);
      });
    }
  }, [selectedImage]);

  return (
    <div
      className="divRow"
      style={{
        marginLeft: "5px",
        marginRight: "5px",
        width: "100%",
        height: "100%",
      }}
    >
      <form className="imageForm">
        <input
          type="file"
          ref={inputFile}
          onChange={onFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
      </form>
      <img
        style={{ maxHeight: "25px", maxWidth: "25px" }}
        ref={image}
        id="target"
        onClick={() => {
          inputFile.current.click();
        }}
        src={"/images/drawable/icon_question_mark.png"}
        className="icon25"
      />
    </div>
  );
};

export default PickImageImage;
