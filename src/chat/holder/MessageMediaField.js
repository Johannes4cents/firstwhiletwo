import React, { useEffect } from "react";
import miscStore from "../../stores/miscStore";

const MessageMediaField = ({ message, upvoteAreaWidth }) => {
  const { inputWidth, setClickedImages } = miscStore();

  return (
    <div
      className="divRow"
      style={{
        minHeight: "100px",
        maxWidth: `${inputWidth - upvoteAreaWidth}px`,
        overflow: "auto",
      }}
    >
      {message.imgUrls.map((imgUrl) => {
        if (imgUrl.type == "image") {
          return (
            <ImageHolder
              key={imgUrl.url}
              imageUrl={imgUrl.url}
              setClickedImages={setClickedImages}
              imgUrls={message.imgUrls.map((obj) => obj.url)}
            />
          );
        }
      })}
    </div>
  );
};

const ImageHolder = ({ imageUrl, setClickedImages, imgUrls }) => {
  return (
    <img
      onClick={() => {
        setClickedImages(imgUrls, imgUrls.indexOf(imageUrl));
      }}
      src={imageUrl}
      style={{
        objectFit: "contain",
        maxHeight: "250px",
        marginRight: "30px",
      }}
    />
  );
};

export default MessageMediaField;
