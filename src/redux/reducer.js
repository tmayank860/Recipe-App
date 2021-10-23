import * as type from "./actionType";

const initialState = {
  recipes: [],
  error: null,
  loading: false,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_RECIPE_START:
      return {
        ...state,
        loading: true,
      };
    case type.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
    case type.FETCH_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
        return state;
  }
};

export default recipeReducer;
