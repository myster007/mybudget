import React, { useMemo, useCallback, useRef, useContext } from 'react';
import { groupBy, } from "lodash";
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';
import { useQuery } from 'react-query';

import API from 'data/fetch';

import BudgetContext from 'data/context/budget.context';

import { ToggleableList } from "components";
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
//import budget from 'data/reducers/budget.reducer';
//-----------------------------------------

function BudgetCategoryList() {
  const { data: budget, } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
  const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
  const { data: budgetedCategories, } = useQuery(
    ['budgetedCategories', { id: 1 }],
    API.budget.fetchBudgetedCategories
  );

  const { dispatch } = useContext(BudgetContext.store);
  const setSelectedParentCategoryId = useCallback((id) => dispatch({
    type: 'selectParentCategory',
    payload: id,
  }), [dispatch])
  //-----------------------------------
  const { t } = useTranslation();
  const handleClickParentCategoryRef = useRef(null);

  const budgetedCategoriesByParent = useMemo(
    () => groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).ParentCategory.name),
    [budgetedCategories, allCategories],
  );
  //-----------------------------------------

  const handleClearParentCategorySelect = useCallback(
    () => {
      setSelectedParentCategoryId();
      handleClickParentCategoryRef();
    },
    [setSelectedParentCategoryId, handleClickParentCategoryRef]
  );


  const handleSelectRestParentCategories = useCallback(
    () => {
      setSelectedParentCategoryId(null);
      handleClickParentCategoryRef();
    }, [setSelectedParentCategoryId, handleClickParentCategoryRef]
  );
  //-----------------------------------------
  const listItems = useMemo(
    () => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory
          name={parentName}
          onClick={() => {
            onClick(parentName);
            setSelectedParentCategoryId(parentName)
          }}
          categories={categories}
          transactions={budget.transactions}
        />
      ),
      children: categories.map(budgetedCategory => {
        const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId)

        return (
          <CategoryItem
            key={budgetedCategory.id}
            name={name}
            transactions={budget.transactions}
            item={budgetedCategory}
          />
        )
      }),
    })),
    [budget.transactions, allCategories, budgetedCategoriesByParent, setSelectedParentCategoryId]
  );
  //-----------------------------------------

  const totalSpent = useMemo(
    () => budget.transactions
      .reduce((acc, transaction) => acc + transaction.amount, 0),
    [budget.transactions]
  );
  const restToSpent = useMemo(
    () => budget.totalAmount - totalSpent,
    [budget.totalAmount, totalSpent]
  );
  //-----------------------------------------
  const amountTaken = useMemo(
    () => budgetedCategories.reduce((acc, budgetedCategory) => {
      const categoryTransactions = budget.transactions
        .filter(transaction => transaction.categoryId === budgetedCategory.id);

      const categoryExpenses = categoryTransactions
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      return acc + Math.max(categoryExpenses, budgetedCategory.budget);
    }, 0),
    [budget.transactions, budgetedCategories]
  );

  //-----------------------------------------

  const notBudgetedTransaction = useMemo(() => budget.transactions
    .filter(transaction => {
      return !budgetedCategories
        .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
    }),
    [budget.transactions, budgetedCategories]
  );

  //-----------------------------------------

  const notBudgetedExpenses = useMemo(
    () => notBudgetedTransaction
      .reduce((acc, transaction) => acc + transaction.amount, 0),
    [notBudgetedTransaction]
  );
  //-----------------------------------------

  const availableForRestCategories = useMemo(() => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [budget.totalAmount, amountTaken, notBudgetedExpenses]
  );

  //-----------------------------------------

  console.log(availableForRestCategories);
  console.log(budget.totalAmount);
  console.log(amountTaken);
  console.log(notBudgetedTransaction);

  return (
    <div>
      <div
        css={`
            border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
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
  )
}

export default BudgetCategoryList;
