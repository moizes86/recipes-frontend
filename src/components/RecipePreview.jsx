import React from "react";
import { useHistory } from "react-router-dom";
import { imageSrc } from "../App";
import "../styles/styles.scss";

const RecipePreview = ({ data: { id, title, urls, description } }) => {
  const history = useHistory();

  return (
    <div className="recipe-preview">
      <div className="thumb-box">
        <span className="link" onClick={() => history.push(`/recipes/${id}/${title}`)}>
          <img src={`${imageSrc}/${urls[0]}`} alt="" />
          <span className="overlay-box">
            <span className="title">{title}</span>
            <span className="description">{description}</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default RecipePreview;
