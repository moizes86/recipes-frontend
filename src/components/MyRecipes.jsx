import React, { useState, useEffect } from "react";
import { deleteRecipe, getMyRecipes } from "../DAL/RecipeAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useFetch from "../useFetch";
import { imageSrc } from "../App";
import "../styles/styles.scss";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [noRecipesMessage, setNoRecipesMessage] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const { id } = useSelector((state) => state.activeUser);
  const history = useHistory();

  const { sendRequest, loading, Spinner, data } = useFetch();
  useEffect(() => {
    sendRequest(getMyRecipes, id);
  }, [id, sendRequest]);

  useEffect(() => {
    if (data) {
      setRecipes(data.payload);
      setNoRecipesMessage(false);
    } else {
      setNoRecipesMessage(true);
    }
  }, [data]);

  return (
    <div className="my-recipes">
      <h3 className="text-center mb-4">My Recipes</h3>
      {loading ? (
        <Spinner />
      ) : noRecipesMessage ? (
        <p className="text-center">No recipes yet</p>
      ) : (
        <table className="table">
          <tbody>
            {recipes.map((recipe, i) => (
              <tr
                key={`${recipe.title}-${i}`}
                id={recipe.id}
                onClick={() => history.push(`edit-recipe/${recipe.id}`)}
              >
                <td className="col-1">
                  <img src={`${imageSrc}/${recipe.urls}`} alt="" />
                </td>
                <td>{recipe.title}</td>
                <td className="col-1">
                  {loading && i === activeRow ? (
                    <i class="fa fa-circle-o-notch fa-spin"></i>
                  ) : (
                    <i
                      className="far fa-trash-alt"
                      onClick={async (e) => {
                        e.stopPropagation();
                        setActiveRow(i);
                        await sendRequest(deleteRecipe, recipe.id);
                        await sendRequest(getMyRecipes, id);
                        setActiveRow(null);
                      }}
                    ></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRecipes;
