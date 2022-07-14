import React, { useEffect, useRef, useState } from "react";
import useOnHover from "../../hooks/useOnHover";
import miscStore from "../../stores/miscStore";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";
import chatStore from "../../stores/chatStore";

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
              message={message}
              imgObj={imgUrl}
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

const ImageHolder = ({
  imageUrl,
  setClickedImages,
  imgUrls,
  imgObj,
  message,
}) => {
  const imgRef = useRef();
  const hiddenRef = useRef();
  const { updateDisplayedMessage } = chatStore();
  const [hiddenSize, setHiddenSize] = useState({ width: 0, height: 0 });
  const { info } = userStore();
  const { addMyMedia } = listsStore();

  useEffect(() => {
    if (imgRef.current != null) {
      setHiddenSize({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  }, [imgRef, hiddenRef]);
  const hover = useOnHover({
    item: imageUrl,
    hoverOptions: {
      inside: true,
      direction: "horizontal",
      options: [
        imgObj.author.id != (info ? info.uid : "")
          ? {
              description: "Add Image to your media",
              click: imgObj.favorite ? undoFavorite : makeFavorite,
              payload: imgObj,
              imgUrl: "/images/icons/icon_favorite.png",
              greyHover: imgObj.favorite ? false : true,
            }
          : null,
        {
          description: imgObj.hidden ? "Show Image" : "Hide Image",
          click: hideMedia,
          payload: imgObj,
          imgUrl: "/images/icons/icon_hide_selected.png",
          greyHover: imgObj.hidden ? false : true,
        },
      ],
      size: "icon20",
    },
  });

  function makeFavorite() {
    imgObj.favorite = true;
    console.log("message - ", message);
    updateDisplayedMessage(message);
    addMyMedia(info.uid, imgObj);
  }

  function undoFavorite() {
    imgObj.favorite = false;
    console.log("message - ", message);
    updateDisplayedMessage(message);
    addMyMedia(info.uid, imgObj);
  }

  function hideMedia() {
    imgObj.hidden = !imgObj.hidden;
    console.log("message - ", message);
    updateDisplayedMessage(message);
    addMyMedia(info.uid, imgObj);
  }
  return (
    <div
      {...hover.divProps}
      style={{ position: "relative" }}
      className="divColumn"
    >
      {hover.hoverMenu}
      {imgObj.hidden && (
        <img
          ref={hiddenRef}
          style={{
            position: "absolute",
            backgroundColor: "#4f4f4f",
            objectFit: "contain",
            width: hiddenSize.width + 1,
            height: hiddenSize.height,
            maxHeight: "250px",
            marginRight: "30px",
            zIndex: -1,
          }}
          src="/images/icons/icon_hide.png"
        />
      )}
      <img
        ref={imgRef}
        onClick={() => {
          setClickedImages(imgUrls, imgUrls.indexOf(imageUrl));
        }}
        src={imageUrl}
        style={{
          objectFit: "contain",
          maxHeight: "250px",
          marginRight: "30px",
          zIndex: imgObj.hidden ? -2 : null,
        }}
      />
    </div>
  );
};

export default MessageMediaField;
