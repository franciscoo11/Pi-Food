import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_RECIPES_NAME = "GET_ALL_RECIPES_NAME";
export const GET_RECIPE = "GET_RECIPE";
export const ADD_RECIPE = "ADD_RECIPE";
export const GET_DIETS = "GET_DIETS";

export function getAllRecipes() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/recipes");
    dispatch({ type: GET_ALL_RECIPES, payload: response.data });
  };
}

export function getRecipeSearch(name) {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/recipes?name=${name}`
    );
    dispatch({ type: "RECIPE_SEARCH", payload: response.data });
  };
}

export function getDiets() {
  return async function (dispatch) {
    const info = await axios("http://localhost:3001/diets", {});
    const response = info.data.map((e) => {
      return e.name;
    });
    return dispatch({ type: "GET_TYPES", payload: response });
  };
}

export function filterByDiet(payload) {
  return {
    type: "FILTER_BY_DIET",
    payload,
  };
}

export function resetDetail(){
  return {
    type: 'RESET_DETAIL',
    payload: []
  }
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED_RECIPE",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByHealthScore(payload) {
  return {
    type: "ORDER_BY_HEALTH_SCORE",
    payload,
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/recipes`, payload);
    return response;
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: "GET_DETAIL",
      payload: response.data,
    });
  };

  
}
