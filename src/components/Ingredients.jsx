import React from "react";

const Ingredients = ({ ingredients = [], removeItem, partOfForm = false }) => {
  return (
    <div className="recipe-ingredients">
      {!ingredients.length ? (
        <p className="text-center p-4">No Ingredients</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Unit</th>
              <th scope="col">Ingredient</th>
              {partOfForm && <th scope="col"></th>}
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, i) => (
              <tr key={`${ingredient.text}-${i}`}>
                <td className="col-1">{ingredient.amount}</td>
                <td className="col-1">{ingredient.unit}</td>
                <td>{ingredient.text}</td>
                {partOfForm && (
                  <td className="remove-item text-right pl-2">
                    <i
                      className="far fa-trash-alt"
                      id={ingredient.id}
                      title="ingredients"
                      onClick={removeItem}
                      text={ingredient.text}
                    ></i>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Ingredients;
