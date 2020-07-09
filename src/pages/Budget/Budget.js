import React, { Fragment, useMemo } from 'react';
import { connect } from "react-redux";

import { addTransaction } from 'data/actions/budget.actions';

import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import { Grid } from "./Budget.css";
import { Modal, Button, LoadingIndicator } from "components";

import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from 'pages/Budget/components/BudgetTransactionList';
import AddTransactionForm from 'pages/Budget/components/AddTransactionForm';


function Budget({
  commonState, budgetState, allCategories, budget,
  fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction,
}) {

  const history = useHistory();
  const isLoaded = useMemo(
    () => (!!commonState && Object.keys(commonState).length === 0)
      && (!!budgetState && Object.keys(budgetState).length === 0),
    [commonState, budgetState]
  );

  console.log({ isLoaded })
  const handleSubmitAddTransaction = (values) => {
    addTransaction({
      budgetId: budget.id,
      data: values
    }).then(() => {
      history.goBack()
    })
  }

  return (
    <Fragment>
      <Grid>
        <section>
          <React.Suspense fallback={<LoadingIndicator />}>
            <BudgetCategoryList />
          </React.Suspense>
        </section>

        <section>
          <React.Suspense fallback={<LoadingIndicator />}>
            <Button to='/budget/transactions/new'>Add new transaction</Button>
            <BudgetTransactionList />
          </React.Suspense>
        </section>
      </Grid>

      <Switch>
        <Route exact path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm
              categories={allCategories}
              groupCategoriesBy="parentCategory.name"
              onSubmit={handleSubmitAddTransaction}
            />
          </Modal>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default connect((state) => {
  return {
    budget: state.budget.budget,
    commonState: state.common.loadingState,
    budgetState: state.budget.loadingState,
    allCategories: state.common.allCategories,
  }
},
  {
    addTransaction,
  }
)(Budget);
