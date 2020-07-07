import React, { useMemo } from 'react';

import { CategoryItem as Root, CategoryAmount } from './BudgetCategoryList.css'
import { formatCurrency } from 'utlis';



function CategoryItem({ item, transactions, categories }) {
    const categoryTransactions = transactions
        .filter(transaction => transaction.categoryId === item.id);

    const spentOnCategory = categoryTransactions
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalLeft = item.budget
        ? item.budget - spentOnCategory
        : null;
    const name = useMemo(() => categories.find(category => category.id === item.categoryId).name, [categories, item]);

    return (
        <Root>
            <span> {name}</span>

            <CategoryAmount negative={totalLeft < 0}>
                {formatCurrency(totalLeft)}
            </CategoryAmount>

        </Root>
    )
}
CategoryItem.defaultProps = {
    transactions: [],
    categories: [],
};

export default CategoryItem;