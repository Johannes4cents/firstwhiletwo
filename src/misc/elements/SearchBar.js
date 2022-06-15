import React, { useState, useEffect } from "react";

const SearchBar = ({
  onSearchFunc,
  showButton,
  onlyTitle,
  setOnlyTitle,
  resetSearchTrigger,
  onEnter = () => {},
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (resetSearchTrigger != null) setSearch("");
  }, [resetSearchTrigger]);

  useEffect(() => {
    onSearchFunc(search);
  }, [search]);
  return (
    <div className="containerFlexRowDark">
      {showButton && (
        <img
          src={
            onlyTitle
              ? "/images/drawable/icon_title.png"
              : "/images/drawable/icon_title_unselected.png"
          }
          className="icon25"
          style={{ margin: 2 }}
          onClick={() => setOnlyTitle(!onlyTitle)}
        />
      )}
      <input
        onKeyDown={onEnter}
        autoComplete="off"
        className="textBlackCenter"
        value={search}
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <img src="/images/drawable/icon_search.png" className="icon25" />
    </div>
  );
};

export default SearchBar;
