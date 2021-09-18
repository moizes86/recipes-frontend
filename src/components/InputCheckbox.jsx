import React from "react";
import "../styles/styles.scss";

const InputCheckbox = ({ checkboxGroupTitle, inputName, items = [], itemsSelected = [], handleCheck }) => {
  return (
    <div className="input-checkbox ml-1 ">
      <div id="checkbox-group" className="font-bolder">
        {checkboxGroupTitle}
      </div>
      <div role="group" aria-labelledby="checkbox-group">
        {items.map((item, i) => (
          <label className="mr-3 mt-2 " key={`${item}-${i}`}>
            <input
              className="mr-2"
              type="checkbox"
              name={inputName}
              value={item}
              onChange={handleCheck}
              checked={itemsSelected.includes(item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default InputCheckbox;
