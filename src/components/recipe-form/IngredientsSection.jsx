import React, { useState } from "react";

import InputField from "../InputField";
import Ingredients from "../Ingredients";
import "../../styles/styles.scss";

const IngredientsSection = ({
  measuringUnits = [],
  ingredients = [],
  addItem: addItemToFormState,
  removeItem: removeItemFromFormState,
  submitError,
}) => {
  const [ingredient, setIngredient] = useState({
    amount: 1,
    unit: "",
    text: "",
  });

  const [addIngredientError, setAddIngredientError] = useState("");

  const handleIngredient = (e) => {
    e.preventDefault();

    const { amount, unit, text } = ingredient;
    if (amount && text) {
      addItemToFormState({ amount, text, unit }, "ingredients");
      setIngredient({ amount: 1, unit: "", text: "" });
      if (addIngredientError) setAddIngredientError("");
    } else {
      setAddIngredientError("All fields are required");
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setIngredient({ ...ingredient, [name]: value });
  };

  return (
    <div className="recipe-form-ingredients my-4">
      <div className="font-smaller row align-items-center pr-3">
        <InputField
          label="Amount"
          name="amount"
          type="number"
          value={ingredient.amount}
          shrinkLabel={false}
          classes="font-bolder"
          cols="col col-sm-3"
          handleChange={handleChange}
        />

        <div className="form-group mr-2" controlid="measurement">
          <label className="form-label font-bolder"> Units</label>
          <select className="form-control " value={ingredient.unit} name="unit" onChange={handleChange}>
            {measuringUnits.map((unit, i) => (
              <option key={`${unit}-${i}`} value={unit} label={unit}>
                {unit || "--"}
              </option>
            ))}
          </select>
        </div>

        <div className=" flex-grow-1" controlid="text">
          <InputField
            label="Notes"
            type="text"
            name="text"
            placeholder="Example: soaked in vinegar"
            value={ingredient.text}
            cols="col"
            shrinkLabel={false}
            classes="form-label font-bolder"
            handleChange={handleChange}
          />
        </div>
        <i className="fas fa-plus" onClick={handleIngredient}></i>
      </div>

      <Ingredients ingredients={ingredients} removeItem={removeItemFromFormState} partOfForm={true} />

      <small>{submitError || addIngredientError}</small>
    </div>
  );
};

export default IngredientsSection;
