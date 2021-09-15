import React, { useState, useEffect } from "react";
import { deleteRecipe, getMyRecipes } from "../services/API_Services/RecipeAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useFetch from "../useFetch";
import "../styles/styles.scss";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const { id } = useSelector((state) => state.activeUser);
  const history = useHistory();

  const { sendRequest, loading, Spinner } = useFetch();

  const getMyRecipesAsync = async () => {
    const result = await getMyRecipes(id);
    return setRecipes(result.data.payload);
  };

  useEffect(() => {
    getMyRecipesAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="my-recipes">
      <h3 className="text-center mb-4">My Recipes</h3>
      {
        <table className="table">
          <tbody>
            {recipes.length ? (
              recipes.map((recipe, i) => (
                <tr
                  key={`${recipe.title}-${i}`}
                  id={recipe.id}
                  onClick={() => history.push(`edit-recipe/${recipe.id}`)}
                >
                  <td className="col-1">
                    <img src={`${process.env.REACT_APP_SERVER_PATH}/${recipe.urls}`} alt="" />
                  </td>
                  <td>{recipe.title}</td>
                  <td className="col-1">
                    {loading && i === activeRow ? (
                      <Spinner />
                    ) : (
                      <i
                        className="far fa-trash-alt"
                        onClick={async (e) => {
                          e.stopPropagation();
                          setActiveRow(i);
                          await sendRequest(deleteRecipe, recipe.id);
                          await getMyRecipesAsync();
                          setActiveRow(null);
                        }}
                      ></i>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td className="text-center" colSpan="4">
                  No recipes yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  );
};

export default MyRecipes;
