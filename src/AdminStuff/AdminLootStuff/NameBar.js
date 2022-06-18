const NameBar = ({ nameEntered, onName }) => {
  return (
    <div className="divRow">
      <div className="divColumn">
        <div
          className="divRow"
          style={{ width: "100%", justifyContent: "space-around" }}
        >
          <div className="textBoldWhite">Name</div>
          <img src="/images/flags/flag_german.png" className="icon20" alt="" />
        </div>
        <input
          onChange={(e) => onName(e.target.value, "german")}
          style={{ textAlign: "center" }}
          value={nameEntered.german}
        />
      </div>

      <div className="divColumn">
        <div
          className="divRow"
          style={{ width: "100%", justifyContent: "space-around" }}
        >
          <div className="textBoldWhite">Name</div>
          <img src="/images/flags/flag_us.png" className="icon20" alt="" />
        </div>
        <input
          style={{ textAlign: "center" }}
          onChange={(e) => onName(e.target.value, "english")}
          value={nameEntered.english}
        />
      </div>
    </div>
  );
};

export default NameBar;
