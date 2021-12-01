import { useContext } from "react";
import { ExpenseTrackerContext } from './context/context';
import {Chart, ArcElement} from 'chart.js'

import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

const useTransactions = (title) => {
        resetCategories();
        const {transactions} = useContext(ExpenseTrackerContext);
        const transactionsPerType = transactions.filter((t) => t.type === title );     // filter the title type 
        const total = transactionsPerType.reduce((acc,currVal) => acc+= currVal.amount, 0);  // add the amount at filtered title
        const categories = title === 'Income' ? incomeCategories : expenseCategories;   // checking categories

        console.log({transactionsPerType,total,categories});

        transactionsPerType.forEach((t) => {
            const category = categories.find((c) => c.type === t.category)  // checling  transactionsPerType category  and categories.type same or not 

            if(category) category.amount +=t.amount; // if same add amount 
        });

        const filteredCategories = categories.filter((c) => c.amount > 0); // return data which is greater than 0


        const chartData = {
            datasets: [{
                data: filteredCategories.map((c) => c.amount),
                backgroundColor : filteredCategories.map((c) => c.color)
            }],
            labels: filteredCategories.map((c) => c.type)
        }
    
         return {total,chartData}

}

export default useTransactions;