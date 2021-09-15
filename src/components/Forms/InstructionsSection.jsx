import React, { useState } from "react";

import InputField from "./InputField";
import Instructions from "../Instructions";
import "../../styles/styles.scss";

const InstructionsSection = ({ instructions = [], addItem, removeItem, submitError }) => {
  const [instruction, setInstruction] = useState({
    text: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ target: { value } }) => {
    setInstruction({ text: value });
  };

  const addInstruction = (e) => {
    e.preventDefault();
    if (instruction.text.length) {
      addItem(instruction, "instructions");
      setInstruction({ text: "" });
      if (error) setError("");
    } else {
      setError("Required");
    }
  };

  return (
    <div className="recipe-form-instructions my-4">
      <div className="row align-items-center">
        <div className="flex-grow-1 col">
          <InputField
            label="* Instructions"
            type="text"
            placeholder="What should be done next"
            value={instruction.text ?? instruction}
            required={false}
            shrinkLabel={false}
            classes="font-bolder pl-0 "
            handleChange={handleChange}
          />
        </div>
        <i className="pr-3 fas fa-plus" onClick={addInstruction}></i>
      </div>

      <Instructions instructions={instructions} removeItem={removeItem} partOfForm={true} />

      <small>{error || (!instructions.length && submitError)}</small>
    </div>
  );
};

export default InstructionsSection;
