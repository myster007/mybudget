// import React, { useMemo, useContext } from 'react';
// import { List, ListItem } from './BudgetTransactionList.css'
// import { groupBy } from 'lodash';
// import { useQuery } from 'react-query';
// import { formatDate, formatCurrency } from 'utlis';
// import API from 'data/fetch';
// import BudgetContext from 'data/context/budget.context';

// //-----------------------------------

// function BudgetTransactionList() {

//     const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
//     const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
//     const { data: budgetedCategories } = useQuery(
//         ['budgetedCategories', { id: 1 }],
//         API.budget.fetchBudgetedCategories
//     );

//     const { selectedParentCategoryId } = useContext(BudgetContext.store);

//     const filteredTransactionsBySelectedParentCategory = useMemo(
//         () => {
//             if (typeof selectedParentCategoryId === 'undefined') {
//                 return budget.transactions;
//             }

//             if (selectedParentCategoryId === null) {
//                 return budget.transactions.filter(transaction => {
//                     const hasBudgetedCategory = budgetedCategories
//                         .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);

//                     return !hasBudgetedCategory;
//                 })
//             }


//             return budget.transactions
//                 .filter(transaction => {
//                     try {
//                         const category = allCategories
//                             .find(category => category.id === transaction.categoryId);
//                         const parentCategoryName = category.parentCategory.name;

//                         return parentCategoryName === selectedParentCategoryId;
//                     } catch (error) {
//                         return false;
//                     }
//                 })
//         },
//         [allCategories, budgetedCategories, selectedParentCategoryId, budget.transactions]);

//     //----------------------------

//     const groupedTransactions = useMemo(
//         () => groupBy(
//             filteredTransactionsBySelectedParentCategory,
//             transaction => new Date(transaction.date).getUTCDate()
//         ),
//         [filteredTransactionsBySelectedParentCategory]
//     );

//     return (
//         <List>
//             {Object.entries(groupedTransactions).map(([key, transactions]) => (
//                 <li key={key}>
//                     <ul>
//                         {transactions.map(transaction => (
//                             <ListItem key={transaction.id}>
//                                 <div>{transaction.description}</div>
//                                 <div>{formatCurrency(transaction.amount)}</div>
//                                 <div>{formatDate(transaction.date)}</div>
//                                 <div>
//                                     {(allCategories.find(category => category.id === transaction.categoryId) || {}).name}
//                                 </div>
//                             </ListItem>
//                         ))}
//                     </ul>
//                 </li>
//             ))}
//         </List>
//     )
// };

// export default BudgetTransactionList;




import React, { useMemo, useContext } from 'react';
import { groupBy } from 'lodash';
import { BudgetContext } from 'data/context';
import { formatDate, formatCurrency } from 'utlis';
import { useBudget, useBudgetedCategories, useAllCategories } from 'data/hooks';

import { List, ListItem } from './BudgetTransactionList.css';

const BudgetTransactionList = () => {
    const { data: budget } = useBudget(1);
    const { data: budgetedCategories } = useBudgetedCategories(1);
    const { data: allCategories } = useAllCategories();
    const { selectedParentCategoryId } = useContext(BudgetContext.store);

    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
        if (typeof selectedParentCategoryId === 'undefined') {
            return budget.transactions;
        }

        if (selectedParentCategoryId === null) {
            return budget.transactions.filter(transaction => {
                const hasBudgetedCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);

                return !hasBudgetedCategory;
            });
        }

        return budget.transactions.filter(transaction => {
            try {
                const parentCategoryName = allCategories.find(category => category.id === transaction.categoryId).parentCategory.name;

                return parentCategoryName === selectedParentCategoryId;
            } catch (error) {
                return false;
            }
        });
    }, [selectedParentCategoryId, budget.transactions, allCategories, budgetedCategories]);
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

export default BudgetTransactionList;