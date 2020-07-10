import React, { useState } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import { Grid } from "./Budget.css";
import { Modal, Button, SuspenseErrorBoundary } from "components";
import BudgetContext from 'data/context/budget.context.js';

const BudgetCategoryList = React.lazy(() => import('pages/Budget/components/BudgetCategoryList'));
const BudgetTransactionList = React.lazy(() => import('pages/Budget/components/BudgetTransactionList'));
const AddTransactionView = React.lazy(() => import('pages/Budget/components/AddTransactionForm'));

function Budget({
  fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction,
}) {
  const [showTransactions, setShowTransaction] = useState();
  return (
    <BudgetContext.Provider>
      <Grid>
        <section>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
        </section>

        <section>
          <SuspenseErrorBoundary>
            <Button to="/budget/transactions/new">Add new transaction</Button>
            <Button onClick={() => setShowTransaction(!showTransactions)}>
              {showTransactions ? 'Hide Transaction' : 'Show Transactions'}
            </Button>
            {showTransactions && (
              <BudgetTransactionList />
            )}

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
    </BudgetContext.Provider>
  )
}

export default Budget;
