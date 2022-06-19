import adminStore from "../../stores/adminStore";

const TriggerWordCatHolder = ({ wc, onWcClicked }) => {
  const { selectedTriggerWordCats } = adminStore();
  return (
    <div
      className="divRowColored"
      style={{ width: "100%", borderBottom: "1px solid white" }}
      onClick={() => onWcClicked(wc)}
    >
      <img
        src={
          selectedTriggerWordCats.map((c) => c.id).includes(wc.id)
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
        className="icon15"
      />
      <div className="textBoldWhite" style={{ flex: 1, textAlign: "center" }}>
        {wc.text}
      </div>
      <img src="/images/icons/icon_word_cat.png" className="icon20" />
    </div>
  );
};

export default TriggerWordCatHolder;
