import React from "react";
import useMouseHandling from "../../hooks/useMouseHandling";
import useOnHover from "../../hooks/useOnHover";

const DisplayedMediaHolder = ({ media }) => {
  const HoverImage = ({ url }) => {
    return (
      <img src={url} style={{ objectFit: "contain", maxHeight: "150px" }} />
    );
  };
  const hover = useOnHover({
    item: media,
    hoverElement: <HoverImage url={media.url} />,
    hoverTimer: 1000,
  });
  const handleMouse = useMouseHandling({ item: media, type: "media" });
  const typeObj = {
    image: "/images/icons/icon_image.png",
    video: "/images/icons/icon_scene.png",
    audio: "images/icons/icon_audio.png",
  };
  return (
    <div
      className="divRow"
      style={{ width: "100%", backgroundColor: hover.bgColor }}
      {...handleMouse}
      {...hover.divProps}
    >
      <img src={media.url} className="icon40" style={{ width: "100px" }} />
      <div
        className="textBoldWhite"
        style={{ flex: 1, textAlign: "center", color: hover.textColor }}
      >
        {media.name}
      </div>
      <img
        src={typeObj[media.type]}
        className="icon20"
        style={{ marginRight: "5px" }}
      />
      {hover.infoBox}
    </div>
  );
};

export default DisplayedMediaHolder;
