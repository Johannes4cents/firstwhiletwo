import React, { useState, useRef, useEffect } from "react";

const SingleInputModal = ({ mousePosition, setModalOpen, onSave, title }) => {
  const [entered, setEntered] = useState("");
  const textInput = useRef(null);

  const saveClicked = () => {
    onSave(entered);
    setModalOpen(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      saveClicked();
    }
  };

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <div>
      <div className="overlayClear" onClick={() => setModalOpen(false)} />
      <div
        className="modalContent"
        style={{ left: `${mousePosition.x}px`, top: ` ${mousePosition.y}px` }}
      >
        <div
          className="divColumn"
          style={{
            width: "200px",
            justifyContent: "space-around",
            textAlign: "center",
          }}
        >
          <div className="textBoldWhite">{title}</div>
          <div className="divRow">
            <input
              onKeyPress={handleEnter}
              ref={textInput}
              value={entered}
              style={{ textAlign: "center" }}
              onChange={(e) => setEntered(e.target.value)}
            />
            {entered && (
              <img
                style={{ marginTop: "5px" }}
                src="/images/drawable/btn_save.png"
                className="icon25"
                onClick={() => saveClicked()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInputModal;
