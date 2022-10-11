import axios from 'axios';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_ALL_RECIPES_NAME = 'GET_ALL_RECIPES_NAME';
export const GET_RECIPE = 'GET_RECIPE';
export const ADD_RECIPE = 'ADD_RECIPE';
export const GET_DIETS = 'GET_DIETS';

export function getRecipes(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/recipes');
        dispatch({ type: GET_ALL_RECIPES, payload: response.data })
    }
}

export function getNameRecipes(name){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        dispatch({ type: GET_ALL_RECIPES_NAME, payload: response.data})
    }
}

export function getTypeDiets (){
    return async function(dispatch){
       const response = await axios.get('http://localhost:3001/types');
       return dispatch( {
           type : 'GET_DIETS',
           payload: response.data
       })
   }
}

export function postRecipes (payload){
    return async function(dispatch){
            var response = await axios.post(`http://localhost:3001/recipe`,payload);
            return response
    }
    
}


export function filterRecipesByTypeDiet(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_TYPEDIET',
        payload
    }
}

export function filterRecipesByCreated(payload){
    return{
        type: 'FILTER_BY_CREATED_RECIPE',
        payload
        }        
}

export function resetDetail(payload){
    return{
        type:"RESET_DETAIL",
        payload:[]
    }
}


export function orderByName (payload){
    return {
        type : 'ORDER_BY_NAME',
        payload
    }
}



export function orderByPuntuation (payload){
    return {
        type : 'ORDER_BY_PUNTUATION',
        payload
    }
}



export function getDetail(id) {
    return async function (dispatch) {
        try {
           var json = await axios.get("http://localhost:3001/recipes/" + id);
           return dispatch({
             type: "GET_DETAIL",
             payload: json.data,
           });
        } catch (error){
            console.log(error)
        }
}           


  
};   

