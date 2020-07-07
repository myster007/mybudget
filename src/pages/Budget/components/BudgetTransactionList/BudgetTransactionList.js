import React from 'react';
import { List, ListItem } from './BudgetTransactionList.css'
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { formatDate, formatCurrency } from 'utlis';
// import { useBudget, useBudgetedCategories, useAllCategories } from 'data/hooks';



function BudgetTransactionList({ transactions, allCategories }) {
    const groupedTransactions = groupBy(
        // filteredTransactionsBySelectedParentCategory,
        transactions,
        transaction => new Date(transaction.date).getUTCDate(),
    )
    // ), [filteredTransactionsBySelectedParentCategory]);


    console.log({ transactions })

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
    allCategories: state.common.allCategories,
}))(BudgetTransactionList);
