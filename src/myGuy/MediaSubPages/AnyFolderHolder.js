import useOnHover from "../../hooks/useOnHover";

const AnyFolderHolder = ({ onAnyClicked, text }) => {
  const hover = useOnHover({
    item: "any",
    active: text,
    checkboxSize: "icon15",
    imageSelected: "/images/icons/icon_folder.png",
    imageUnselected: "/images/icons/icon_folder_unselected.png",
  });
  return (
    <div
      className="divRow"
      {...hover.divProps}
      onClick={() => {
        onAnyClicked();
      }}
    >
      {hover.checkbox}
      <div
        className="textWhiteSmall"
        style={{ minWidth: "35px", textAlign: "center" }}
      >
        {text}
      </div>
      <img src={hover.activeImage} className="icon15" />
    </div>
  );
};

export default AnyFolderHolder;
