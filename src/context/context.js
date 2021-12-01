import React ,{ useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) ||
[{"amount":100,"category":"Food","type":"Expense","date":"2021-12-01","id":"26276f26-9716-45cc-a9b7-9512dee9ee52"},{"amount":1000,"category":"Salary","type":"Income","date":"2021-12-01","id":"fdaf108b-db8d-41e8-9eab-a4a64beaab24"},{"amount":600,"category":"Business","type":"Income","date":"2021-11-27","id":"ff61ff36-34eb-423d-b157-4f8526cfc3e7"},{"amount":60,"category":"Travel","type":"Expense","date":"2021-12-03","id":"2b447d67-f1d8-4d6c-964a-48338e92b183"}]
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    // Action Creators
    const deleteTransaction = (id) => dispatch({ type: "DELETE_TRANSACTION",payload : id });
    const addTransaction = (transaction) =>  dispatch({ type: "ADD_TRANSACTION", payload:transaction});

    const balance = transactions.reduce((acc,currVal) => currVal.type === 'Expense' ? acc - currVal.amount: acc+currVal.amount,0);
    
    console.log(transactions);

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}