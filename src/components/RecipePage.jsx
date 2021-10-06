import React, { useState, useEffect } from "react";

import {origin} from '../DAL/http_Service'

// Components
import RecipeDetails from "./RecipeDetails";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

// STYLES
import "../styles/styles.scss";

import { useParams } from "react-router-dom";
import { getRecipe } from "../DAL/RecipeAPI";
import useFetch from "../useFetch";
import MyCarousel from "./MyCarousel";
import Image from "./Image";

const RecipePage = () => {
  const { id, title } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { sendRequest, loading, data, Spinner } = useFetch();
  useEffect(() => {
    sendRequest(getRecipe, id, title);
  }, [id, sendRequest, title]);

  useEffect(() => {
    if(data) setRecipe(data.payload);
  }, [data]);

  return (
    <div className="recipe-page">
      {loading || !data ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            <div className="col-sm-6">
              <Image urls={recipe.images[0]} />

              <MyCarousel urls={recipe.images} />
            </div>

            <div className="col-sm-6">
              <RecipeDetails
                title={recipe.title}
                description={recipe.description}
                source={recipe.source}
                sourceUrl={recipe.source_url}
                cook={recipe.cook}
                servings={recipe.servings}
                dietsSelected={recipe.dietsSelected}
                categoriesSelected={recipe.categoriesSelected}
              />
            </div>
          </div>

          <div className="px-3">
            <div className="mt-5">
              <Ingredients ingredients={recipe.ingredients} />
            </div>
            <div className="my-4" />
            <h5>Instructions</h5>

            <Instructions instructions={recipe.instructions} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipePage;
