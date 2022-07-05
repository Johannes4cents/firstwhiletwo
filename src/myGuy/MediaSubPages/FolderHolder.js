import useMouseHandling from "../../hooks/useMouseHandling";
import useOnHover from "../../hooks/useOnHover";
import userStore from "../../stores/userStore";

const FolderHolder = ({ folder, selectedFolder, onFolderClicked }) => {
  const { removeMediaFolder, info } = userStore();

  const handleMouse = useMouseHandling({
    rightClickOptions: [
      {
        text: "Delete Folder",
        imgUrl: "/images/drawable/icon_trashcan.png",
        onClick: deleteFolder,
      },
    ],
  });
  const hover = useOnHover({
    item: folder,
    inclusionList: selectedFolder,
    checkboxSize: "icon15",
    imageSelected: "/images/icons/icon_folder.png",
    imageUnselected: "/images/icons/icon_folder_unselected.png",
  });

  function deleteFolder() {
    removeMediaFolder(info.uid, folder);
  }
  return (
    <div
      style={{ zIndex: 1, marginLeft: "5px" }}
      className="divRow"
      {...handleMouse}
      {...hover.divProps}
      onClick={() => {
        onFolderClicked(folder);
      }}
    >
      {hover.checkbox}
      <div className="textWhiteSmall">{folder}</div>
      <img src={hover.activeImage} className="icon15" />
    </div>
  );
};

export default FolderHolder;
