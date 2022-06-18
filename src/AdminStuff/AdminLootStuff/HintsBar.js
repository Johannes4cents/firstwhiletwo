import HintLanguageBar from "./HintsLanguageBar";

const HintsBar = ({ hints, setHints }) => {
  return (
    <div className="divColumn" style={{ marginTop: "5px" }}>
      <HintLanguageBar
        language={"german"}
        hints={hints}
        setHints={setHints}
        flag="/images/flags/flag_german.png"
      />
      <HintLanguageBar
        language={"english"}
        hints={hints}
        setHints={setHints}
        flag="/images/flags/flag_us.png"
      />
    </div>
  );
};

export default HintsBar;
