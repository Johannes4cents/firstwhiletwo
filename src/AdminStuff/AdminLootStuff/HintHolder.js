const HintHolder = ({ hint, hints, setHints, language }) => {
  const onHintClicked = () => {
    setHints({
      ...hints,
      [language]: hints[language].filter((h) => h != hint),
    });
  };
  return (
    <div
      className="divRowColored"
      style={{
        width: "100%",
        justifyContent: "space-around",
        borderBottom: "1px solid white",
      }}
      onClick={onHintClicked}
    >
      <div
        className="textWhite"
        style={{ maxWidth: "100px", overflow: "auto" }}
      >
        {hint.phrase}
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "4px",
        }}
      />
      <div
        className="textWhite"
        style={{ maxWidth: "250px", maxHeight: "40px", overflow: "auto" }}
      >
        {hint.hint}
      </div>
    </div>
  );
};

export default HintHolder;
