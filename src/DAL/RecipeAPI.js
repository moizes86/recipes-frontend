import { httpDelete, httpGet, httpPost, httpPut } from "./CRUD_Service";
import { origin } from "./http_Service";

let url = origin + "/recipes";

export const getRecipes = async () => {
  return await httpGet(url);
};

export const getRecipe = async (recipeId) => {
  return await httpGet(`${url}/recipe?recipeId=${recipeId}`);
};

export const getMeasuringUnits = async () => {
  return await httpGet(`${url}/measuring-units`);
};

export const getDiets = async () => {
  return await httpGet(`${url}/diets`);
};

export const getCategories = async () => {
  return await httpGet(`${url}/categories`);
};

export const getOptions = async () => {
  return await httpGet(`${url}/options`);
};

export const getDiffictultyLevels = async () => {
  return await httpGet(`${url}/difficulty-levels`);
};

export const addRecipe = async (data) => {
  const token = sessionStorage.getItem("token");
  return await httpPost(`${url}/add-recipe`, data, token);
};

export const editRecipe = async (data) => {
  return await httpPut(`${url}/edit-recipe`, data);
};

export const addImages = async (images) => {
  return await httpPost(`${url}/add-images`, images);
};

export const searchRecipe = async (data) => {
  return await httpGet(`${url}/search?q=${data}`);
};

export const getMyRecipes = async (email) => {
  return await httpGet(`${url}/my-recipes?email=${email}`);
};

export const getImages = async (recipe_id) => {
  return httpGet(`${url}/images?recipe_id=${recipe_id}`);
};

export const uploadImage = async (image) => {
  return httpPost(`${url}/images`, image);
};

export const deleteRecipe = async (recipeId) => {
  return await httpDelete(`${url}/recipe?recipeId=${recipeId}`);
};

export const getImage = async (imageName) =>{
  return await httpGet(`${url}/images/${imageName}`)
}

// / / / / / / / / / / / / / / / / //
// / / / / / / / / / / / / / / / / //
// FLASK
// / / / / / / / / / / / / / / / / //

// FLASK

// const url_flask = "http://localhost:5000/recipes";
// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     "Access-Control-Allow-Credentials": true,
//   },
// };

// export const getRecipe = async (recipeId) => {
//   try{
//     return await axios.get(`${url_flask}/recipe?recipeId=${recipeId}`, config)
//   }catch(e){
//     return {data:{message:'Error: could not get recipe', status:400}}
//   }
// };

// export const getRecipes = async () => {
//   try {
//     return await axios.get(url_flask);
//   } catch (e) {
//     return { data: { message: "Error: could not get recipes", status: 400 } };
//   }
// };

// export const getDiets = async () => {
//   return await axios.get(`${url_flask}/diets`);
// };

// export const getMeasuringUnits = async () => {
//   return await axios.get(`${url_flask}/measuring-units`);
// };

// export const getCategories = async () => {
//   return await axios.get(`${url_flask}/categories`);
// };

// export const addRecipe = async (data) => {
//   return await axios.post(`${url_flask}/add-recipe`, data, config);
// };

// export const getMyRecipes = async (id) => {
//   return await axios.get(`${url_flask}/my-recipes?userId=${id}`);
// };

// export const editRecipe = async (data) => {
//   return await axios.put(`${url_flask}/edit-recipe`, data, config);
// };

// export const searchRecipe = async (data) => {
//   return await axios.get(`${url_flask}/search?q=${data}`);
// };

// export const deleteRecipe = async(recipeId)=>{
//   return axios.delete(`${url_flask}/delete?recipeId=${recipeId}`)
// }
