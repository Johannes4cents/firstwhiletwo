import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import BiggerImageModal from "../../modals/BiggerImageModal";
import { storage } from "../../firebase/fireInit";
import userStore from "../../stores/userStore";

const ProfilePictureImage = () => {
  const { info } = userStore();
  const [modalOpen, setModalOpen] = useState(false);
  const image = useRef();

  useEffect(() => {
    if (image != null) {
      // gets and sets image of snippetPart from firebase storage
      if (info.profilePicUrl != "" && info.profilePicUrl != null) {
        getDownloadURL(ref(storage, info.profilePicUrl)).then((url) => {
          image.current.setAttribute("src", url);
        });
      }
    }
  }, [image, info]);
  return (
    <div className="divRow">
      <img
        className="icon40"
        ref={image}
        src={"/images/drawable/icon_unknown.png"}
        onClick={() => setModalOpen(true)}
      />
      {modalOpen && (
        <BiggerImageModal
          storageUrl={info.profilePicUrl}
          setModalOpen={setModalOpen}
          detailedImage={image}
        />
      )}
    </div>
  );
};

export default ProfilePictureImage;
