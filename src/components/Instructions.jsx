import React from "react";

const Instructions = ({ instructions=[], removeItem, partOfForm = false }) => {
  return (
    <>
      <ol>
        {instructions.map((instruction, i) => (
          <div key={`${instruction.id}-${i}`} className="d-flex align-items-baseline justify-content-between">
            <li className="py-2 px-2">{instruction.text ?? instruction}</li>

            {partOfForm && (
              <i
                className="far fa-trash-alt"
                onClick={removeItem}
                title="instructions"
                id={instruction.id}
                text={instruction.text}
              ></i>
            )}
          </div>
        ))}
      </ol>
    </>
  );
};

export default Instructions;
