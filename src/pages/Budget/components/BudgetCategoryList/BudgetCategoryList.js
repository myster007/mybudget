// // import React, { useMemo, useCallback, useRef, useContext } from 'react';
// // import { groupBy } from "lodash";
// // import { useTranslation } from 'react-i18next';
// // import 'styled-components/macro';
// // import { useQuery } from 'react-query';

// // import API from 'data/fetch';

// // import BudgetContext from 'data/context/budget.context';

// // import { ToggleableList } from "components";
// // import ParentCategory from './ParentCategory';
// // import CategoryItem from './CategoryItem';
// // //import budget from 'data/reducers/budget.reducer';
// // //-----------------------------------------

// // function BudgetCategoryList() {
// //   const { data: budget, } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
// //   const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
// //   const { data: budgetedCategories, } = useQuery(
// //     ['budgetedCategories', { id: 1 }],
// //     API.budget.fetchBudgetedCategories
// //   );


// //   const { dispatch } = useContext(BudgetContext.store);
// //   const selectParentCategory
// //     // setSelectedParentCategoryId 
// //     = useCallback((id) => dispatch({
// //       type:
// //         //selectParentCategoryId
// //         'selectParentCategory'
// //       ,
// //       payload: id,
// //     }), [dispatch])
// //   //-----------------------------------
// //   const { t } = useTranslation();
// //   const handleClickParentCategoryRef = useRef(null);

// //   const budgetedCategoriesByParent = useMemo(
// //     () => groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name),
// //     [budgetedCategories, allCategories],
// //   );
// //   //-----------------------------------------

// //   const handleClearParentCategorySelect = useCallback(
// //     () => {
// //       //setSelectedParentCategoryId
// //       selectParentCategory
// //         ();
// //       handleClickParentCategoryRef.current();
// //     },
// //     [
// //       //setSelectedParentCategoryId
// //       selectParentCategory
// //       , handleClickParentCategoryRef]
// //   );


// //   const handleSelectRestParentCategories = useCallback(
// //     () => {
// //       //setSelectedParentCategoryId
// //       selectParentCategory(null);
// //       handleClickParentCategoryRef.current();
// //     }, [
// //     //setSelectedParentCategoryId
// //     selectParentCategory, handleClickParentCategoryRef]
// //   );
// //   //-----------------------------------------
// //   const listItems = useMemo(
// //     () => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
// //       id: parentName,
// //       Trigger: ({ onClick }) => (
// //         <ParentCategory
// //           name={parentName}
// //           onClick={() => {
// //             onClick(parentName);
// //             //setSelectedParentCategoryId
// //             selectParentCategory(parentName)
// //           }}
// //           categories={categories}
// //           transactions={budget.transactions}
// //         />
// //       ),
// //       children: categories.map(budgetedCategory => {
// //         const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId);

// //         return (
// //           <CategoryItem
// //             key={budgetedCategory.id}
// //             name={name}
// //             transactions={budget.transactions}
// //             item={budgetedCategory}
// //           />
// //         )
// //       }),
// //     })),
// //     [budget.transactions, allCategories, budgetedCategoriesByParent, selectParentCategory
// //       //setSelectedParentCategoryId
// //     ]
// //   );
// //   //-----------------------------------------

// //   const totalSpent = useMemo(
// //     () => budget.transactions
// //       .reduce((acc, transaction) => acc + transaction.amount, 0),
// //     [budget.transactions]
// //   );
// //   const restToSpent = useMemo(
// //     () => budget.totalAmount - totalSpent,
// //     [budget.totalAmount, totalSpent]
// //   );
// //   //-----------------------------------------
// //   const amountTaken = useMemo(
// //     () => budgetedCategories.reduce((acc, budgetedCategory) => {
// //       const categoryTransactions = budget.transactions
// //         .filter(transaction => transaction.categoryId === budgetedCategory.id);

// //       const categoryExpenses = categoryTransactions
// //         .reduce((acc, transaction) => acc + transaction.amount, 0);

// //       return acc + Math.max(categoryExpenses, budgetedCategory.budget);
// //     }, 0),
// //     [budget.transactions, budgetedCategories]
// //   );

// //   //-----------------------------------------

// //   const notBudgetedTransaction = useMemo(() => budget.transactions
// //     .filter(transaction => {
// //       return !budgetedCategories
// //         .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
// //     }),
// //     [budget.transactions, budgetedCategories]
// //   );

// //   //-----------------------------------------

// //   const notBudgetedExpenses = useMemo(
// //     () => notBudgetedTransaction
// //       .reduce((acc, transaction) => acc + transaction.amount, 0),
// //     [notBudgetedTransaction]
// //   );
// //   //-----------------------------------------

// //   const availableForRestCategories = useMemo(() => budget.totalAmount - amountTaken - notBudgetedExpenses,
// //     [budget.totalAmount, amountTaken, notBudgetedExpenses]
// //   );

// //   //-----------------------------------------

// //   console.log(availableForRestCategories);
// //   console.log(budget.totalAmount);
// //   console.log(amountTaken);
// //   console.log(notBudgetedTransaction);

// //   return (
// //     <div>
// //       <div
// //         css={`
// //             border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
// //           `}
// //       >

// //         <ParentCategory
// //           name={budget.name}
// //           amount={restToSpent}
// //           onClick={handleClearParentCategorySelect}

// //         />
// //         <ToggleableList
// //           items={listItems}
// //           clickRef={handleClickParentCategoryRef} />


// //         <ParentCategory
// //           name={t('Other categories')}
// //           amount={availableForRestCategories}
// //           onClick={handleSelectRestParentCategories}
// //         />
// //       </div>
// //     </div>
// //   )
// // }

// // export default BudgetCategoryList;


// import React, { useMemo, useCallback, useRef, useContext } from 'react';
// import 'styled-components/macro';
// import { groupBy } from 'lodash';
// import { useTranslation } from 'react-i18next';
// import { ToggleableList } from 'components';
// import { BudgetContext } from 'data/context';
// import {
//   calculateTotalSpent,
//   calculateAmountTaken,
//   calculateNotBudgetedExpenses,
//   filterNotBudgetedTransactions,
// } from 'data/selectors/budget.selectors';
// import { useBudget, useBudgetedCategories, useAllCategories } from 'data/hooks';

// import ParentCategory from './ParentCategory';
// import CategoryItem from './CategoryItem';


// const BudgetCategoryList = () => {
//   const { data: budget } = useBudget(1);
//   const { data: budgetedCategories } = useBudgetedCategories(1);
//   const { data: allCategories } = useAllCategories();
//   const { dispatch } = useContext(BudgetContext.store);
//   const selectParentCategory = useCallback(id => dispatch({ type: 'selectParentCategory', payload: id }), [dispatch]);
//   const { t } = useTranslation();

//   const handleClickParentCategoryRef = useRef(null);
//   const totalSpent = useMemo(
//     () => calculateTotalSpent(budget.transactions),
//     [budget],
//   );

//   const amountTaken = useMemo(
//     () => calculateAmountTaken(budgetedCategories, budget.transactions),
//     [budgetedCategories, budget],
//   );

//   const notBudgetedTransactions = useMemo(
//     () => filterNotBudgetedTransactions(budget.transactions, budgetedCategories),
//     [budget, budgetedCategories],
//   );

//   const notBudgetedExpenses = useMemo(
//     () => calculateNotBudgetedExpenses(notBudgetedTransactions),
//     [notBudgetedTransactions],
//   );

//   const budgetedCategoriesByParent = useMemo(
//     () => groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name),
//     [budgetedCategories, allCategories],
//   );

//   const handleClearParentCategorySelect = useCallback(() => {
//     selectParentCategory();
//     handleClickParentCategoryRef.current();
//   }, [selectParentCategory, handleClickParentCategoryRef]);
//   const handleSelectRestParentCategory = useCallback(() => {
//     selectParentCategory(null);
//     handleClickParentCategoryRef.current();
//   }, [selectParentCategory, handleClickParentCategoryRef]);

//   const getListItems = useCallback(
//     () => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
//       id: parentName,
//       Trigger: ({ onClick }) => (
//         <ParentCategory
//           onClick={useCallback(() => {
//             onClick();
//             selectParentCategory(parentName);
//           }, [onClick])}
//           name={parentName}
//           categories={categories}
//           transactions={budget.transactions}
//         />
//       ),
//       children: categories.map(item => (
//         <CategoryItem
//           key={item.id}
//           categories={allCategories}
//           transactions={budget.transactions}
//           item={item}
//         />
//       )),
//     })),
//     [budgetedCategoriesByParent, allCategories, budget, selectParentCategory],
//   );

//   const restToSpent = budget.totalAmount - totalSpent;
//   const availableForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

//   return (
//     <div>
//       <div
//         css={`
//           border-bottom: ${({ theme }) => `5px solid ${theme.colors.gray.light}`};
//         `}
//       >
//         <ParentCategory
//           name={budget.name}
//           amount={restToSpent}
//           onClick={handleClearParentCategorySelect}
//         />
//       </div>

//       <ToggleableList
//         items={getListItems()}
//         clickRef={handleClickParentCategoryRef}
//       />

//       <div
//         css={`
//           border-top: ${({ theme }) => `5px solid ${theme.colors.gray.light}`};
//         `}
//       >
//         <ParentCategory
//           name={t('Other categories')}
//           amount={availableForRestCategories}
//           onClick={handleSelectRestParentCategory}
//         />
//       </div>
//     </div>
//   );
// };

// export default BudgetCategoryList;

import React, { useMemo, useCallback, useRef, useContext } from 'react';
import 'styled-components/macro';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { ToggleableList } from 'components';
import { BudgetContext } from 'data/context';
import {
  calculateTotalSpent,
  calculateAmountTaken,
  calculateNotBudgetedExpenses,
  filterNotBudgetedTransactions,
} from 'data/selectors/budget.selectors';
import { useBudget, useBudgetedCategories, useAllCategories } from 'data/hooks';

import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';


const BudgetCategoryList = () => {
  const { data: budget } = useBudget(1);
  const { data: budgetedCategories } = useBudgetedCategories(1);
  const { data: allCategories } = useAllCategories();
  const { dispatch } = useContext(BudgetContext.store);
  const selectParentCategory = useCallback(id => dispatch({ type: 'selectParentCategory', payload: id }), [dispatch]);
  const { t } = useTranslation();

  const handleClickParentCategoryRef = useRef(null);
  const totalSpent = useMemo(
    () => calculateTotalSpent(budget.transactions),
    [budget],
  );

  const amountTaken = useMemo(
    () => calculateAmountTaken(budgetedCategories, budget.transactions),
    [budgetedCategories, budget],
  );

  const notBudgetedTransactions = useMemo(
    () => filterNotBudgetedTransactions(budget.transactions, budgetedCategories),
    [budget, budgetedCategories],
  );

  const notBudgetedExpenses = useMemo(
    () => calculateNotBudgetedExpenses(notBudgetedTransactions),
    [notBudgetedTransactions],
  );

  const budgetedCategoriesByParent = useMemo(
    () => groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name),
    [budgetedCategories, allCategories],
  );

  const handleClearParentCategorySelect = useCallback(() => {
    selectParentCategory();
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);
  const handleSelectRestParentCategory = useCallback(() => {
    selectParentCategory(null);
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);

  const getListItems = useCallback(
    () => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory
          onClick={useCallback(() => {
            onClick();
            selectParentCategory(parentName);
          }, [onClick])}
          name={parentName}
          categories={categories}
          transactions={budget.transactions}
        />
      ),
      children: categories.map(item => (
        <CategoryItem
          key={item.id}
          categories={allCategories}
          transactions={budget.transactions}
          item={item}
        />
      )),
    })),
    [budgetedCategoriesByParent, allCategories, budget, selectParentCategory],
  );

  const restToSpent = budget.totalAmount - totalSpent;
  const availableForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

  return (
    <div>
      <div
        css={`
          border-bottom: ${({ theme }) => `5px solid ${theme.colors.gray.light}`};
        `}
      >
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleClearParentCategorySelect}
        />
      </div>

      <ToggleableList
        items={getListItems()}
        clickRef={handleClickParentCategoryRef}
      />

      <div
        css={`
          border-top: ${({ theme }) => `5px solid ${theme.colors.gray.light}`};
        `}
      >
        <ParentCategory
          name={t('Other categories')}
          amount={availableForRestCategories}
          onClick={handleSelectRestParentCategory}
        />
      </div>
    </div>
  );
};

export default BudgetCategoryList;