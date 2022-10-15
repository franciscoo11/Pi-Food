import { GET_ALL_RECIPES } from "../actions/index";

const initialState = {
  recipes: [],
  detail: [],
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
    case "RECIPE_SEARCH":
      return {
        ...state,
        allRecipes: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload
      };
    case "RESET_DETAIL":
      return {
        ...state,
        detail: []
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        allRecipes: sortedArr,
      };
    case "FILTER_BY_DIET":
      const filterByDiet =
        action.payload === "todas"
          ? state.recipes.filter((e) => e.name)
          : state.recipes.filter(
              (e) =>
                e.diets.includes(action.payload) ||
                e.diets.map((d) => d.name).includes(action.payload)
            );
      return {
        ...state,
        allRecipes: filterByDiet,
      };
    case "ORDER_BY_HEALTH_SCORE":
      let score =
        action.payload === "min"
          ? state.allRecipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allRecipes: score,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "FILTER_BY_DB":
      const filterRecipes = state.allRecipes.filter(
        (recipe) => recipe.fromDb === true
      );
      return {
        ...state,
        allRecipes: filterRecipes,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      }
    default:
      return state;
  }
}
