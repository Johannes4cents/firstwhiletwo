import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { storage } from "../../firebase/fireInit";

const MessageImageField = ({ message }) => {
  return (
    <div className="divRow" style={{ minHeight: "100px" }}>
      {message.imgUrls.map((imgUrl) => {
        return <ImageHolder key={imgUrl} imageUrl={imgUrl} />;
      })}
    </div>
  );
};

const ImageHolder = ({ imageUrl }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef) {
      getDownloadURL(ref(storage, imageUrl)).then((url) => {
        imageRef.current.setAttribute("src", url);
      });
    }
  }, [imageUrl, imageRef]);

  return (
    <img ref={imageRef} style={{ objectFit: "contain", maxHeight: "200px" }} />
  );
};

export default MessageImageField;
