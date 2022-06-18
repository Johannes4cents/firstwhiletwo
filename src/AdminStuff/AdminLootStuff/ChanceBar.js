const ChanceBar = ({ setChance, chance }) => {
  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        justifyContent: "space-around",
        marginTop: "5px",
      }}
    >
      <div className="textBoldWhite">Chance</div>
      <input
        type="number"
        style={{ textAlign: "center", width: "50px" }}
        value={chance}
        onChange={(e) => setChance(e.target.value)}
      />
      <img src="/images/loot/icon_chance.png" className="icon20" alt="" />
    </div>
  );
};

export default ChanceBar;
