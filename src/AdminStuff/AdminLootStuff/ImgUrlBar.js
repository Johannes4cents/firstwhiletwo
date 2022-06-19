import { getDownloadURL, ref } from "firebase/storage";
import { useEffect } from "react";
import { useRef } from "react";
import { storage } from "../../firebase/fireInit";
import { uploadImageToStorage } from "../../misc/handleFirestore";

const ImgUrlBar = ({ setImgUrl, imgUrl }) => {
  const file = useRef();
  const previewImage = useRef();

  const showImagePreview = () => {
    var fr = new FileReader();
    fr.onload = function (e) {
      previewImage.current.src = this.result;
    };
    file.current.addEventListener("change", () => {
      fr.readAsDataURL(file.current.files[0]);
    });
  };

  useEffect(() => {
    if (previewImage != null && imgUrl != "") {
      // gets and sets image of snippetPart from firebase storage
      getDownloadURL(ref(storage, imgUrl)).then((url) => {
        previewImage.current.setAttribute("src", url);
      });
    }
  }, [previewImage]);

  useEffect(() => {
    if (file != null) showImagePreview();
  }, [file]);

  const onFileChange = (e) => {
    uploadImageToStorage("fireItems", e.target.files[0], (url) => {
      setImgUrl(url);
    });
  };

  const onImageClicked = () => {
    file.current.click();
  };
  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        justifyContent: "space-around",
        marginTop: "5px",
      }}
    >
      <div className="textBoldWhite">Image</div>
      <input
        type="file"
        ref={file}
        onChange={onFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      <img
        ref={previewImage}
        src={"/images/loot/icon_image.png"}
        className="icon20"
        onClick={onImageClicked}
      />
    </div>
  );
};

export default ImgUrlBar;
