import useOnHover from "../../../hooks/useOnHover";

const WcHolder = ({ wordCat, selectedWordCats, click }) => {
  const hover = useOnHover({
    item: wordCat.id,
    imageSelected: "/images/drawable/checked_box.png",
    imageUnselected: "/images/drawable/checkbox_unchecked.png",
    inclusionList: selectedWordCats,
  });
  const clickWc = () => {
    click(wordCat);
  };
  return (
    <div
      className="divRow"
      {...hover.divProps}
      onClick={clickWc}
      style={{ width: "100%" }}
    >
      <img src={hover.activeImage} className="icon20" />
      <div
        className="textBoldWhite"
        style={{ color: hover.textColor, flex: 1, textAlign: "center" }}
      >
        {wordCat.text}
      </div>
    </div>
  );
};

export default WcHolder;
