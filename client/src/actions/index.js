import axios from 'axios';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPE = 'GET_RECIPE';
export const ADD_RECIPE = 'ADD_RECIPE';
export const GET_DIETS = 'GET_DIETS';

export function getRecipes(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/recipes');
        dispatch({ type: GET_ALL_RECIPES, payload: response.data })
    }
}