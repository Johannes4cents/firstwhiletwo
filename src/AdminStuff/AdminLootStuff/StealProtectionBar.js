const StealProtectionBar = ({ setStealProtection, stealProtection }) => {
  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        justifyContent: "space-around",
        marginTop: "5px",
      }}
    >
      <div className="textBoldWhite">Steal Protection</div>
      <input
        type="text"
        style={{ textAlign: "center", width: "40px" }}
        value={stealProtection.from}
        onChange={(e) =>
          setStealProtection({ ...stealProtection, from: e.target.value })
        }
      />
      <div className="textBoldWhite">-</div>
      <input
        type="text"
        style={{ textAlign: "center", width: "40px" }}
        value={stealProtection.till}
        onChange={(e) =>
          setStealProtection({ ...stealProtection, till: e.target.value })
        }
      />
      <img
        src="/images/loot/icon_steal_protection.png"
        className="icon20"
        alt=""
      />
    </div>
  );
};

export default StealProtectionBar;
