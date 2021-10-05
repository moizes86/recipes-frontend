import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/styles.scss";
import Image from "./Image";

const RecipePreview = ({ data: { id, title, urls, description } }) => {
  const history = useHistory();
  const previewImage = urls? urls[0] : null;

  return (
    <div className="recipe-preview">
      <div className="thumb-box">
        <span className="link" onClick={() => history.push(`/recipes/${id}/${title}`)}>
          <Image urls={previewImage}/>
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
