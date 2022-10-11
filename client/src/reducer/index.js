import {
  GET_ALL_RECIPES,
  GET_ALL_RECIPES_NAME,
  GET_DIETS,
  ADD_RECIPE,
} from "../actions/index";

const initialState = {
  recipes: [],
  recipe: {},
  typeDiets: [],
  recipesByName: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_ALL_RECIPES_NAME:
      return {
        ...state,
        recipesByName: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        typeDiets: action.payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
      };
    case "FILTER_BY_TYPEDIET":
      const allRec = state.recipes;
      const typeDietFiltered =
        action.payload === "All"
          ? allRec
          : allRec.filter((el) =>
              el.typeDiets.find((e) => e.name === action.payload)
            );
      console.log(typeDietFiltered);
      return {
        ...state,
        recipes: typeDietFiltered,
      };

    case "FILTER_BY_CREATED_RECIPE":
      const createdFilter =
        action.payload === "created"
          ? state.recipes.filter((e) => e.createdInDb)
          : state.recipes.filter((e) => !e.createdInDb);
      return {
        ...state,
        recipes: action.payload === "All" ? state.recipes : createdFilter,
      };
    case "ORDER_BY_NAME":
      let order =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              // accede a el estado de las recetas y hacele un sort que compara 2 valores y va poniendo a la derecha o izq antes o despues en un array si son iguales (return 0 lo deja igual)

              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: order,
      };

    case "GET_DETAIL":
      return {
        ...state,
        recipe: action.payload,
      };
    case "RESET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}
