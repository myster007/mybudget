import React from 'react';
import { connect } from "react-redux";
import { groupBy, } from "lodash";
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';


import { ToggleableList } from "components";
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
// import budget from 'data/reducers/budget.reducer';

import { selectParentCategory } from 'data/actions/budget.actions'

function BudgetCategoryList({ budgetedCategories, allCategories, budget,
  selectParentCategory }) {
  const { t } = useTranslation();
  const budgetedCategoriesByParent = groupBy(
    budgetedCategories,
    item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
  );

  const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
    id: parentName,
    Trigger: ({ onClick }) => (
      <ParentCategory
        name={parentName}
        onClick={() => {
          onClick(parentName);
          selectParentCategory(parentName)
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
        />
      )
    }),
  }));

  const totalSpent = budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const restToSpent = budget.totalAmount - totalSpent;


  // const amountTaken = useMemo(
  //   () => calculateAmountTaken(budgetedCategories, budget.transactions),
  //   [budgetedCategories, budget],
  // );

  const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
    const categoryTransaction = budget.transactions
      .filter(transaction => transaction.categoryId === budgetedCategory.id);

    const categoryExpenses = categoryTransaction
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0);

  const notBudgetedTransactions = budget.transactions
    .filter(transaction => {
      return !budgetedCategories
        .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
    });

  const notBudgetedExpenses = notBudgetedTransactions
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const availableForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

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

        />
        <ToggleableList items={[listItems]} />
        <ParentCategory
          name={t('Other categories')}
          amount={availableForRestCategories} />
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
