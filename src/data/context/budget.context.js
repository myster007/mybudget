// import React, { createContext, useReducer } from 'react';

// const initialValue = {};
// const store = createContext(initialValue);
// const { Provider } = store;



// function reducer(state, action) {
//     switch (action.type) {
//         case 'selectParentCategoryId':
//             return {
//                 ...state,
//                 selectedParentCategoryId: action.payload
//             };
//         default:
//             return state;
//     }
// }

// function BudgetProvider({ children }) {
//     const [state, dispatch] = useReducer(reducer, initialValue);

//     return (
//         <Provider
//             value={{
//                 state,
//                 dispatch,
//             }}
//         >
//             {children}
//         </Provider>
//     )
// };

// const BudgetContext = {
//     store,
//     Provider: BudgetProvider,
// };

// export default BudgetContext;


import React, { createContext, useReducer } from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const BudgetProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'selectParentCategory':
                return {
                    selectedParentCategoryId: action.payload,
                };
            default:
                return state;
        }
    }, initialState);

    return (
        <Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </Provider>
    );
};

const BudgetContext = {
    store,
    Provider: BudgetProvider,
};

export default BudgetContext;
