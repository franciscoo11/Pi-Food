import { GET_ALL_RECIPES, GET_DIETS, GET_RECIPE_DETAIL, 
  POST_RECIPE,
  FILTER_BY_HEALTHSCORE, FILTER_BY_DIET, ORDER_BY_NAME, FILTER_BY_NAME } from "../actions";

const initialState = {
  recipes: [],
  detail: [],
  diets: [],
  allRecipes: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
      };
    
    case FILTER_BY_DIET:
      const fin = action.payload === 'all' ? state.recipes : state.recipes.filter((e) => {
        return e.diets.includes(action.payload) || e.diets.map((e) => e.name ).includes(action.payload)
      })
      return {
        ...state,
        allRecipes: fin
      };

    case FILTER_BY_NAME:
      return {
        ...state,
        allRecipes: action.payload
      };

    case FILTER_BY_HEALTHSCORE:
      const healthScoreSorted = action.payload === 'asc' ? 
      state.recipes.sort(function(a,b) {
        return a.healthScore > b.healthScore ? 1 : b.healthScore > a.healthScore ? -1 : 0
      }) : 
      state.recipes.sort(function(a,b) {
        return a.healthScore > b.healthScore ? -1 : b.healthScore > a.healthScore ? 1 : 0
      });
      return {
        ...state,
        allRecipes: healthScoreSorted
      };

    case ORDER_BY_NAME:
      const nameSorted = action.payload === 'asc' ?
      state.recipes.sort(function(a,b) {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0
      }) :
      state.recipes.sort(function(a,b) {
        return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : b.name.toLowerCase() > a.name.toLowerCase() ? 1 : 0
      });
      return {
        ...state,
        allRecipes: nameSorted
      };

    case GET_RECIPE_DETAIL:
      return {
        ...state,
        detail: action.payload
      };
    
    case POST_RECIPE:
      return {
        ...state
      };

    default:
      return {
        ...state
      }
  }
}
