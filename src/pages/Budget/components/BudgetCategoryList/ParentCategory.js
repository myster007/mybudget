// import React, { useMemo } from 'react';
// import { ParentCategory as Root, CategoryAmount } from './BudgetCategoryList.css';
// import { formatCurrency } from 'utlis';

// function ParentCategory({ name, onClick, categories, transactions, amount }) {
//     const categoryLeftValue = useMemo(() => {
//         if (!!amount) return null;

//         const budgeted = (() => {
//             try {
//                 return categories.reduce((acc, category) => acc + category.budget, 0);
//             } catch (error) {
//                 return null;
//             }
//         })();


//         const ParentCategoryTransactions = transactions
//             .filter(transaction => categories.find(category => category.id === category.categoryId === transaction.categoryId))

//         const spentOnParentCategory = ParentCategoryTransactions
//             .reduce((acc, transaction) => acc + transaction.amount, 0);

//         console.log(spentOnParentCategory)

//         const totalLeft = budgeted
//             ? budgeted - spentOnParentCategory
//             : null;

//         return totalLeft;
//     }, [categories, transactions, amount]);

//     const amountValue = useMemo(() => amount || categoryLeftValue, [amount, categoryLeftValue]);



//     return (
//         <Root onClick={onClick}>
//             <span>{name}</span>
//             <CategoryAmount negative={amountValue < 0}>
//                 {formatCurrency(amountValue)}
//             </CategoryAmount>
//         </Root>
//     )
// }
// export default ParentCategory



import React, { useMemo } from 'react';
import { noop } from 'lodash';
import { formatCurrency } from 'utlis';

import { ParentCategory as Root, CategoryAmount } from './BudgetCategoryList.css';

const ParentCategory = ({
    onClick = noop, name, amount, categories,
    transactions,
}) => {
    const categoryLeftValue = useMemo(() => {
        const budgeted = (() => {
            try {
                return categories.reduce((acc, category) => acc + category.budget, 0);
            } catch (error) {
                return null;
            }
        })();
        const parentCategoryTransactions = transactions
            .filter(transaction => categories.find(category => category.categoryId === transaction.categoryId));
        const spentOnParentCategory = parentCategoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        const totalLeft = budgeted
            ? budgeted - spentOnParentCategory
            : null;

        return totalLeft;
    }, [categories, transactions]);

    const amountValue = useMemo(() => amount || categoryLeftValue, [amount, categoryLeftValue]);

    return (
        <Root onClick={onClick}>
            <span>{name}</span>
            <CategoryAmount negative={amountValue < 0}>
                {formatCurrency(amountValue)}
            </CategoryAmount>
        </Root>
    );
};

ParentCategory.defaultProps = {
    transactions: [],
    categories: [],
};

export default ParentCategory;