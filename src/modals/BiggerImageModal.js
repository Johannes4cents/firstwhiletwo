import React, { useState, useEffect, useRef } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/fireInit";
import { showImagePreviewWithFileReader } from "../misc/helperFuncs";
import PickImageImage from "../misc/elements/PickImageImage";
import userStore from "../stores/userStore";
import { setDocInFirestore } from "../misc/handleFirestore";

const BiggerImageModal = ({ storageUrl, setModalOpen }) => {
  const { info, setInfo } = userStore();
  const handleStorageUrl = (path) => {
    console.log("path is - ", path);
    let newInfo = { ...info, profilePicUrl: path };
    setDocInFirestore("users/", info.uid, newInfo);
    setInfo(newInfo);
  };
  return (
    <div>
      <div className="overlayClear" onClick={() => setModalOpen(false)} />
      <div className="modalContent">
        <PickImageImage
          imgUrl={storageUrl}
          imgSize={"icon40"}
          storagePath={"profilePictures"}
          onImageChanged={handleStorageUrl}
        />
      </div>
    </div>
  );
};

export default BiggerImageModal;
