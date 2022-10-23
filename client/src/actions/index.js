import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const FILTER_BY_NAME = "GET_ALL_RECIPES_FILTERBYNAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const ADD_RECIPE = "ADD_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_CREATED_DB = "FILTER_BY_CREATED_DB";
export const FILTER_BY_HEALTHSCORE = "FILTER_BY_HEALTHSCORE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const UPDATE_RECIPE = "UPDATE_RECIPE";

export function getAllRecipes() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/recipes");
    return dispatch({ type: GET_ALL_RECIPES, payload: response.data });
  };
}

export function getRecipeSearch(name) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/recipes?name=${name}`)
    .then(response => dispatch({ type: FILTER_BY_NAME, payload: response.data}))
    .catch(() => alert('Sorry, recipes not matching with this name.')) 
  };
}

export function getDiets() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/diets");
    return dispatch({ type: GET_DIETS, payload: response.data });
  }
}

export function filterByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload
  }
}

export function resetDetail(payload){
  return {
    type: 'RESET_DETAIL',
    payload: []
  }
}

export function filterByCreated(payload) {
  return {
    type: FILTER_BY_CREATED_DB,
    payload
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  };
}

export function orderByHealthScore(payload) {
  return {
    type: FILTER_BY_HEALTHSCORE,
    payload,
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/recipes`, payload);
    return response.data;
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: GET_RECIPE_DETAIL,
      payload: response.data,
    });
  };
}

export function removeRecipe(id) {
  return async function(dispatch){
    const response = await axios.delete(`http://localhost:3001/recipes/${id}`)
    return dispatch({
      type: 'REMOVE_RECIPEDB',
      payload: response.data
    })
  }
}

export function updateRecipe(id, input) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        'http://localhost:3001/recipes/update/' +id, input
      );
      dispatch({ type: UPDATE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

