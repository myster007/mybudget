import {
  // eslint-disable-next-line
  BUDGET_GET_REQUEST,
  // eslint-disable-next-line
  BUDGET_GET_SUCCESS,
  // eslint-disable-next-line
  BUDGET_GET_FAILURE,
  // eslint-disable-next-line
  BUDGETED_CATEGORIES_GET_REQUEST,
  // eslint-disable-next-line
  BUDGETED_CATEGORIES_GET_SUCCESS,
  // eslint-disable-next-line
  BUDGETED_CATEGORIES_GET_FAILURE,
  // eslint-disable-next-line

  SET_SELECTED_PARENT_CATEGORY_ID,
  LOADING_STATES,
} from "data/constants";

const initialState = {
  loadingState: null,
  budget: {},
  budgetCategories: [],
  selectedParentCategoryId: undefined,
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

    case SET_SELECTED_PARENT_CATEGORY_ID:
      return {
        ...state,
        selectedParentCategoryId: action.payload
      }

    default:
      return state;
  }
}

export default budget;
