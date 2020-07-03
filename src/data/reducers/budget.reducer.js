import {
  BUDGET_GET,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
  BUDGETED_CATEGORIES_GET_REQUEST,
  BUDGETED_CATEGORIES_GET_SUCCESS,
  BUDGETED_CATEGORIES_GET_FAILURE,
  LOADING_STATES,
} from "data/constants";

const initialState = {
  loadingState: {},
  budget: {},
  budgetCategories: [],
};

function budget(state = initialState, action) {
  const newLoadingState = { ...state.loadingState };

  switch (action.type) {
    case "BUGDET_GET_REQUEST":
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING,
        },
      };
    case "BUGDET_GET_SUCCESS":
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        budget: action.payload,
        loadingState: newLoadingState,
      };

    case "BUGDET_GET_FAILURE":
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        budget: {},
        loadingState: newLoadingState,
      };

    case "BUGDETED_CATEGORIES_GET_REQUEST":
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING,
        },
      };
    case "BUGDETED_CATEGORIES_GET_SUCCESS":
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        budget: action.payload,
        loadingState: newLoadingState,
      };

    case "BUGDETED_CATEGORIES_GET_FAILURE":
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        budgetedCategories: {},
        loadingState: newLoadingState,
      };

    default:
      return state;
  }
}

export default budget;
