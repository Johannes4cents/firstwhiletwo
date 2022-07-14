import { useEffect } from "react";
import useOnHover from "../../hooks/useOnHover";
import fieldBg from "../../images/bg_section_title.png";

const FieldHolder = ({
  fieldName,
  value,
  image,
  textColor,
  alternativeValue,
  hoverChange,
}) => {
  const hover = useOnHover({
    item: fieldName,
    unselectedTextColor: value == null ? "lightgray" : "white",
    hoverChange,
  });

  useEffect(() => {
    console.log("hoverChange - ", hoverChange);
  }, []);
  return (
    <div
      className="divRow"
      style={{
        flex: 1,
        justifyContent: "center",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    >
      <div className="textBoldWhite" style={{ flex: 1, textAlign: "end" }}>
        {fieldName}
      </div>
      <div
        {...hover.divProps}
        className="textBoldWhite"
        style={{
          color: hover.textColor,
          fontSize: value == null ? "12px" : "16px",
          background: `url(${fieldBg})`,
          padding: "3px",
          minWidth: "40px",
          textAlign: "center",
          borderRadius: "0.7rem/1rem",
          marginLeft: "7px",
          marginRight: "7px",
        }}
      >
        {value ?? alternativeValue}
      </div>
      <div className="divRow" style={{ flex: 1 }}>
        <img src={image} className="icon25" />
      </div>
    </div>
  );
};

export default FieldHolder;
