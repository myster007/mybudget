import React, { useMemo } from 'react';
import { List, ListItem } from './BudgetTransactionList.css'
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { formatDate, formatCurrency } from 'utlis';
//import { useBudget, useBudgetedCategories, useAllCategories } from 'data/hooks';

//-----------------------------------

function BudgetTransactionList({ transactions, allCategories, budgetedCategories,
    selectedParentCategoryId }) {
    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
        if (typeof selectedParentCategoryId === 'undefined') {
            return transactions;
        }

        if (selectedParentCategoryId === null) {
            return transactions.filter(transaction => {
                const hasBudgetedCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);

                return !hasBudgetedCategory;
            });
        }


        return transactions
            .filter(transaction => {
                try {
                    const category = allCategories
                        .find(category => category.id === transaction.categoryId);
                    const parentCategoryName = category.parentCategory.name

                    return parentCategoryName === selectedParentCategoryId;
                } catch (error) {
                    return false;
                }
            });
    }, [selectedParentCategoryId, transactions, allCategories, budgetedCategories]);

    //----------------------------

    const groupedTransactions = useMemo(() => groupBy(
        filteredTransactionsBySelectedParentCategory,
        item => new Date(item.date).getUTCDate(),
    ), [filteredTransactionsBySelectedParentCategory]);

    return (
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) => (
                <ul key={key}>
                    {transactions.map(transaction => (
                        <ListItem key={transaction.id}>
                            <div>{transaction.description}</div>
                            <div>{formatCurrency(transaction.amount)}</div>
                            <div>{formatDate(transaction.date)}</div>
                            <div>{(allCategories.find(category => category.id === transaction.categoryId) || {}).name}</div>
                        </ListItem>
                    ))}
                </ul>
            ))}
        </List>
    );
};

// export default BudgetTransactionList;

export default connect(state => ({
    transaction: state.budget.budget.transaction,
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);
