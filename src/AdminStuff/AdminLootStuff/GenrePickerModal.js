import React from "react";
import GenreHolderList from "./GenreHolderList";
import { genres } from "./Genre";

const GenrePickerModal = ({
  mousePosition,
  setModalOpen,
  selectedGenres,
  setSelectedGenres,
}) => {
  return (
    <div>
      <div className="overlayClear" onClick={() => setModalOpen(false)} />
      <div
        className="modalContent"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          zIndex: 1,
        }}
      >
        <div className="divColumn">
          {genres.map((genre) => {
            return (
              <GenreHolderList
                key={genre.id}
                genre={genre}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenrePickerModal;
