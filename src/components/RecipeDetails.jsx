import React from "react";
import "../styles/styles.scss";

const RecipeDetails = ({
  title,
  description,
  source,
  sourceUrl,
  cook,
  servings,
  dietsSelected,
  categoriesSelected,
}) => {
  return (
    <div className="recipe-details ">
      <h3>{title}</h3>

      <div className="col">
        <p className="mt-4">
          <a href={sourceUrl} target="_blank" rel="noreferrer noopener ">
            {source}
          </a>
        </p>

        <span className="text-capitalize font-smaller">
          {categoriesSelected.map((category) => category).join(",  ")}
        </span>
        <br />
        <span className="text-capitalize font-smaller">{dietsSelected.map((diet) => diet).join(",  ")}</span>

        <p className="mt-3">
          <span>{description} </span>
        </p>

        <div className="bottom-line-icons">
          <i className="far fa-clock "></i>
          <span className="">{cook}</span>
          <i className="far fa-utensils ml-4 mr-1"></i>
          <span className="">{servings}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
