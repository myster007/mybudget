// import React, { lazy } from 'react';
// import {
//   Switch,
//   Route
// } from 'react-router-dom';

// import { Grid } from "./Budget.css";
// import { Modal, Button, SuspenseErrorBoundary } from "components";
// import BudgetContext from 'data/context/budget.context.js';

// const BudgetCategoryList = React.memo(lazy(() => import('pages/Budget/components/BudgetCategoryList')))
// const BudgetTransactionList = React.memo(lazy(() => import('pages/Budget/components/BudgetTransactionList')))
// const AddTransactionView = React.memo(lazy(() => import('pages/Budget/components/AddTransactionForm')))

// function Budget({
//   fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction,
// }) {
//   const [showTransactions, setShowTransaction] = React.useState(false);
//   return (
//     <BudgetContext.Provider>
//       <Grid>
//         <section>
//           <SuspenseErrorBoundary>
//             <BudgetCategoryList />
//           </SuspenseErrorBoundary>
//         </section>

//         <section>
//           <SuspenseErrorBoundary>
//             <Button variant="regular" to="/budget/transactions/new">Add new transaction</Button>
//             <Button variant="regular" onClick={() => setShowTransaction(!showTransactions)}>
//               {showTransactions ? 'Hide Transaction' : 'Show Transactions'}
//             </Button>
//             {showTransactions && (
//               <BudgetTransactionList />
//             )}

//           </SuspenseErrorBoundary>
//         </section>
//       </Grid>

//       <Switch>
//         <Route exact path="/budget/transactions/new">
//           <Modal>
//             <AddTransactionView />
//           </Modal>
//         </Route>
//       </Switch>
//     </BudgetContext.Provider>
//   )
// }

// export default Budget;


import React, { lazy } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BudgetContext } from 'data/context';
import { Wrapper, Button, Modal, SuspenseErrorBoundary } from 'components';

import { Grid } from './Budget.css';

const AddTransactionView = React.memo(lazy(() => import('./components/AddTransactionForm')));
const BudgetCategoryList = React.memo(lazy(() => import('./components/BudgetCategoryList')));
const BudgetTransactionList = React.memo(lazy(() => import('./components/BudgetTransactionList')));

const Budget = () => {
  const [showTransactions, setShowTransactions] = React.useState(false);
  const { t } = useTranslation();

  return (
    <BudgetContext.Provider>
      <Wrapper>
        <Grid>
          <section>
            <SuspenseErrorBoundary>
              <BudgetCategoryList />
            </SuspenseErrorBoundary>
          </section>
          <section>
            <Button variant="regular" to="/budget/transactions/new">{t('Add new transaction')}</Button>
            <Button variant="regular" onClick={() => setShowTransactions(!showTransactions)}>
              {!showTransactions ? t('Show transactions') : t('Hide transactions')}
            </Button>
            <SuspenseErrorBoundary>
              {showTransactions && (
                <BudgetTransactionList />
              )}
            </SuspenseErrorBoundary>
          </section>
        </Grid>

        <Switch>
          <Route exact path="/budget/transactions/new">
            <Modal>
              <SuspenseErrorBoundary>
                <AddTransactionView />
              </SuspenseErrorBoundary>
            </Modal>
          </Route>
        </Switch>
      </Wrapper>
    </BudgetContext.Provider>
  );
};

export default Budget;