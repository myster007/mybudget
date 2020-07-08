import React, { useMemo, useCallback, useRef } from 'react';
import { connect } from "react-redux";
import { groupBy, } from "lodash";
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';


import { ToggleableList } from "components";
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
//import budget from 'data/reducers/budget.reducer';

import { selectParentCategory } from 'data/actions/budget.actions';

//-----------------------------------------

function BudgetCategoryList({ budgetedCategories, allCategories, budget,
  selectParentCategory }) {
  const { t } = useTranslation();
  const handleClickParentCategoryRef = useRef(null);

  const budgetedCategoriesByParent = useMemo(() => groupBy(
    budgetedCategories,
    item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
  ),
    [budgetedCategories, allCategories]
  );
  //-----------------------------------------

  const handleClearParentCategorySelect = useCallback(() => {
    selectParentCategory();
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);


  const handleSelectRestParentCategories = useCallback(() => {
    selectParentCategory(null);
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);

  //-----------------------------------------

  const listItems = useMemo(
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
  //-----------------------------------------

  const totalSpent = useMemo(() => budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0), [budget.transactions]);
  const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [budget.totalAmount, totalSpent]);

  //-----------------------------------------


  // const amountTaken = useMemo(
  //   () => calculateAmountTaken(budgetedCategories, budget.transactions),
  //   [budgetedCategories, budget],
  // );

  const amountTaken = useMemo(() => budgetedCategories.reduce((acc, budgetedCategory) => {
    const categoryTransaction = budget.transactions
      .filter(transaction => transaction.categoryId === budgetedCategory.id);

    const categoryExpenses = categoryTransaction
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0),
    [budget.transactions, budgetedCategories]
  );

  //-----------------------------------------

  const notBudgetedTransactions = useMemo(() => budget.transactions
    .filter(transaction => {
      return !budgetedCategories
        .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
    }),
    [budget.transactions, budgetedCategories]
  );

  //-----------------------------------------

  const notBudgetedExpenses = useMemo(() => notBudgetedTransactions
    .reduce((acc, transaction) => acc + transaction.amount, 0),
    [notBudgetedTransactions]
  );
  //-----------------------------------------

  const availableForRestCategories = useMemo(() => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [budget.totalAmount, amountTaken, notBudgetedExpenses]
  );

  //-----------------------------------------

  console.log(availableForRestCategories);
  console.log(budget.totalAmount);
  console.log(amountTaken);
  console.log(notBudgetedTransactions);

  return (
    <div>
      <div
        css={`
            border-top: ${({ theme }) => `5px solid ${theme.colors.gray.light}`};
          `}

      >

        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleClearParentCategorySelect}

        />
        <ToggleableList
          items={listItems}
          clickRef={handleClickParentCategoryRef} />


        <ParentCategory
          name={t('Other categories')}
          amount={availableForRestCategories}
          onClick={handleSelectRestParentCategories}
        />
      </div>
    </div>
  );
}

export default connect((state) => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget,
}), {
  selectParentCategory
})(BudgetCategoryList);
