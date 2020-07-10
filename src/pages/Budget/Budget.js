import React, { Fragment } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import { Grid } from "./Budget.css";
import { Modal, Button, SuspenseErrorBoundary } from "components";

import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from 'pages/Budget/components/BudgetTransactionList';
import AddTransactionView from 'pages/Budget/components/AddTransactionForm';


function Budget({
  fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction,
}) {

  return (
    <Fragment>
      <Grid>
        <section>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
        </section>

        <section>
          <SuspenseErrorBoundary>
            <Button to='/budget/transactions/new'>Add new transaction</Button>
            <BudgetTransactionList />
          </SuspenseErrorBoundary>
        </section>
      </Grid>

      <Switch>
        <Route exact path="/budget/transactions/new">
          <Modal>
            <AddTransactionView />
          </Modal>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default Budget;
