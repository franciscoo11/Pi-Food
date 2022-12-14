import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const FILTER_BY_NAME = "GET_ALL_RECIPES_FILTERBYNAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const ADD_RECIPE = "ADD_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_CREATED_DB = "FILTER_BY_CREATED_DB";
export const FILTER_BY_HEALTHSCORE = "FILTER_BY_HEALTHSCORE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const RESET_DETAIL = 'RESET_DETAIL';

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
    type: RESET_DETAIL,
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

export function getRecipeDetail(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/recipes/${id}`).then(response =>  dispatch({
      type: GET_RECIPE_DETAIL,
      payload: response.data,
    })).catch(() => {
      alert("The recipe ID is not valid.");
      window.location.replace("http://localhost:3000/home/recipes");
    })
    
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

