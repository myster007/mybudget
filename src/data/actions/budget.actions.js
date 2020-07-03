import { BUDGET_GET, BUDGETED_CATEGORIES_GET } from "data/constants";

import API from "data/fetch";

export const fetchBudget = (id) => (dispatch) => {
  const promise = API.budget.fetchBudget(id);

  return {
    type: BUDGET_GET,
    promise,
  };
};

export const fetchBudgetedCategories = (id) => (dispatch) => {
  const promise = API.budget.fetchBudgetedCategories(id);

  return {
    type: BUDGETED_CATEGORIES_GET,
    promise,
  };
};
