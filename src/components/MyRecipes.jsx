import React, { useState, useEffect } from "react";
import { deleteRecipe, getMyRecipes } from "../DAL/RecipeAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useFetch from "../useFetch";
import "../styles/styles.scss";
import Image from "./Image";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [noRecipesMessage, setNoRecipesMessage] = useState(false);
  const [activeRow, setActiveRow] = useState(undefined);
  const { email } = useSelector((state) => state.activeUser);
  const history = useHistory();

  const { sendRequest, loading, Spinner, data } = useFetch();
  useEffect(() => {
    sendRequest(getMyRecipes, email);
  }, [email, sendRequest]);

  useEffect(() => {
    if (data?.payload?.length) {
      setRecipes(data.payload);
      setNoRecipesMessage(false);
    } else {
      setNoRecipesMessage(true);
    }
  }, [data?.payload]);

  return (
    <div className="my-recipes">
      <h3 className="text-center mb-4">My Recipes</h3>
      {loading && !activeRow ? (
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
                  {/* <img src={`${origin}/recipes/images/${recipe.urls}`} alt="" /> */}
                  <Image urls={recipe.urls} />
                </td>
                <td>{recipe.title}</td>
                <td className="col-1">
                  {loading && i + 1 === activeRow ? (
                    <Spinner />
                  ) : (
                    <i
                      className="far fa-trash-alt"
                      onClick={async (e) => {
                        e.stopPropagation();
                        setActiveRow(i + 1);
                        await sendRequest(deleteRecipe, recipe.id);
                        await sendRequest(getMyRecipes, email);
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
