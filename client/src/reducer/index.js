import { GET_ALL_RECIPES, GET_DIETS, GET_RECIPE_DETAIL, 
  POST_RECIPE,
  FILTER_BY_HEALTHSCORE, FILTER_BY_DIET, ORDER_BY_NAME, FILTER_BY_NAME, FILTER_BY_CREATED_DB } from "../actions";

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
        return e.diets.includes(action.payload) || e[action.payload] || e.diets.map((e) => e.name ).includes(action.payload)
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
      return {
        ...state,
        allRecipes: state.recipes.sort((a,b) => {
          if(action.payload === 'asc'){
            if(a.healthScore < b.healthScore) return -1
            if(b.healthScore < a.healthScore) return 1
            return 0
          } else {
            if(b.healthScore < a.healthScore) return -1
            if(a.healthScore < b.healthScore) return 1
            return 0
          }
        })
      }; 
      
    case FILTER_BY_CREATED_DB:
      const dbSorted = action.payload === 'db' ? state.recipes.filter(recipe => recipe.fromDb) : state.recipes.filter(recipe => !recipe.fromDb);
      return {
        ...state,
        allRecipes: dbSorted
      }
    case ORDER_BY_NAME:
      return {
        ...state,
        allRecipes: state.recipes.sort((a,b) => {
          if(action.payload === 'asc'){
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
            if(b.name.toLowerCase() < a.name.toLowerCase()) return 1
            return 0
          } else {
            if(b.name.toLowerCase() < a.name.toLowerCase()) return -1
            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
            return 0
          }
        })
      };

    case GET_RECIPE_DETAIL:
      return {
        ...state,
        detail: action.payload
      };
    
    case 'RESET_DETAIL':
      return {
        ...state,
        detail: action.payload
      }

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
