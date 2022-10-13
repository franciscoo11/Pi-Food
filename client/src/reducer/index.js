import { GET_ALL_RECIPES, GET_DIETS } from "../actions/index";

const initialState = {
  recipes: [],
  detail: {},
  diets: [],
  allRecipes: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_ALL_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTER_BY_DIET":
      const recipes = state.allRecipes;
      const recipesFiltered =
        action.payload === "all"
          ? recipes
          : recipes.filter((el) => el.dietTypes.includes(action.payload));
      return {
        ...state,
        recipes: recipesFiltered,
      };
    case "ORDER_BY_HEALTH_SCORE":
      let recipesOrder1 = [];
      if (action.payload === "default") recipesOrder1 = state.recipes;
      else {
        var ascending = state.recipes.sort((a, b) => {
          if (a.healthScore > b.healthScore) return 1;
          if (a.healthScore < b.healthScore) return -1;
          return 0;
        });

        if (action.payload === "asc") recipesOrder1 = ascending;
        else if (action.payload === "desc") recipesOrder1 = ascending.reverse();
      }

      return {
        ...state,
        recipes: recipesOrder1,
      };
    case "ORDER_BY_NAME":
      let recipesOrder2 = [];
      if (action.payload === "default") recipesOrder2 = state.recipes;
      else {
        var ascending2 = state.recipes.sort((a, b) => {
          if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
          if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
          return 0;
        });

        if (action.payload === "asc") recipesOrder2 = ascending2;
        else if (action.payload === "desc") recipesOrder2 = ascending2.reverse();
      }
      return {
        ...state,
        recipes: recipesOrder2,
      };
    case "RECIPE_SEARCH":
      console.log(action.payload);
      if (action.payload.length < 1) return alert("Recipe not found :(");
      return {
        ...state,
        recipes: action.payload,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case 'FILTER_BY_DB':
      const filterRecipes = state.allRecipes.filter(recipe => recipe.fromDb === true)
      return {
        ...state,
        recipes: filterRecipes
      }
    
    case 'RESET_DETAIL':
      return {
        ...state,
        detail: action.payload
      }
    default:
      return state;
  }
}
