// import React from 'react';
// import { useQuery, useMutation } from 'react-query';
// import API from 'data/fetch';
// import { useHistory } from 'react-router-dom';
// import AddTransactionForm from './AddTransactionForm';


// function AddTransactionView() {
//     const { data: budget, } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
//     const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
//     const [mutate] = useMutation(API.budget.addTransaction, {
//         refetchQueries: ['budget', { id: 1 }],
//     });

//     const history = useHistory();

//     const handleSubmitAddTransaction = (values) => {
//         mutate({
//             budgetId: budget.id,
//             data: values
//         }).then(() => {
//             history.goBack();
//         })
//     }

//     return (
//         <AddTransactionForm
//             categories={allCategories}
//             groupCategoriesBy="parentCategory.name"
//             onSubmit={handleSubmitAddTransaction}
//         />
//     )
// };

// export default AddTransactionView;


import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useBudget, useAllCategories } from 'data/hooks';
import API from 'data/fetch';

import AddTransactionForm from './AddTransactionForm';

const AddTransactionView = () => {
    const { data: allCategories } = useAllCategories();
    const { data: budget } = useBudget(1);
    const history = useHistory();

    const [addBudgetTransaction] = useMutation(API.budget.addBudgetTransaction, {
        refetchQueries: [['budget', { id: '1' }]],
    });

    const handleAddTransaction = useCallback(data => {
        addBudgetTransaction({
            budgetId: budget.id,
            data,
        }).then(() => {
            history.goBack();
        });
    }, [addBudgetTransaction, budget, history]);

    return (
        <AddTransactionForm
            onSubmit={handleAddTransaction}
            categories={allCategories}
            groupCategoriesBy="parentCategory.name"
        />
    );
};

export default AddTransactionView;