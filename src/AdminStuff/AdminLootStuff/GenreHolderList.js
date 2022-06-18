import React from "react";
import userStore from "../../stores/userStore";

const GenreHolderList = ({ genre, selectedGenres, setSelectedGenres }) => {
  const { info } = userStore();
  const onGenreClicked = () => {
    setSelectedGenres(genre);
  };
  return (
    <div
      className="divRowColored"
      style={{ width: "180px" }}
      onClick={onGenreClicked}
    >
      <img
        className="icon20"
        src={
          selectedGenres.includes(genre)
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
      />
      <div className="textBoldWhite" style={{ flex: 1 }}>
        {genre.name[info.object.language]}
      </div>
      <img
        className="icon20"
        src={`/images/genres${genre.image}`}
        style={{ width: "30px" }}
      />
    </div>
  );
};

export default GenreHolderList;
