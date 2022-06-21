import { getDownloadURL, ref } from "firebase/storage";
import React, { useRef } from "react";
import { useEffect } from "react";
import { storage } from "../../firebase/fireInit";

const FireImage = ({ size, imgUrl }) => {
  const image = useRef();

  useEffect(() => {
    if (image != null) {
      getDownloadURL(ref(storage, imgUrl)).then((url) => {
        image.current.setAttribute("src", url);
      });
    }
  }, [imgUrl, image]);
  return (
    <img
      ref={image}
      className={size ?? "icon20"}
      src="/images/drawable/icon_unknown.png"
    />
  );
};

export default FireImage;
