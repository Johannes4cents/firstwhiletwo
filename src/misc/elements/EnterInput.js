import React, { useEffect, useState } from "react";

const EnterInput = ({ onInput, resetTrigger, onSubmit, type = "text" }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (resetTrigger) setInput("");
  }, [resetTrigger]);

  const onChange = (e) => {
    setInput(e.target.value);
    if (onInput) onInput(e.target.value);
  };

  const onEnter = (e) => {
    if (e.key == "Enter") {
      onSubmit(input);
      setInput("");
    }
  };
  return (
    <input
      type={type}
      value={input}
      style={{ textAlign: "center" }}
      onChange={onChange}
      onKeyDown={onEnter}
    />
  );
};

export default EnterInput;
