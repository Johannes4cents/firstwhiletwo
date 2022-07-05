import React, { useEffect } from "react";
import miscStore from "../../stores/miscStore";

const MessageImageField = ({ message, upvoteAreaWidth }) => {
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
        return (
          <ImageHolder
            key={imgUrl}
            imageUrl={imgUrl}
            setClickedImages={setClickedImages}
            imgUrls={message.imgUrls}
          />
        );
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

export default MessageImageField;
