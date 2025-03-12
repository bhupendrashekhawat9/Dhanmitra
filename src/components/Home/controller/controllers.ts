import { BudgetsType } from "../../../types/Budgets";
import { Transactions } from "../../../types/types";

   export const getBudgetExpenditureLimit = (budget: BudgetsType) => {
        // const budget = budgets.reduce((acc, next) => acc += parseInt(next.amount), 0);
        const value = parseInt(budget?.amount)
        return value;
    }
   export const getTodaysExpenditure = (transactions:Transactions[]) => {
        
        const data = transactions.filter((i) =>{
            
            if(new Date().toDateString() == new Date(i.createdDate).toDateString() && i.transactionType == "DEBIT"){
                return true
            }
            return false

        })
        return data.reduce((acc, next) => acc += parseInt(next.amount), 0)
       
    }
   export const getTotalExpenditure = (data:Transactions[])=>{
        const totalExpenditure = data.reduce((acc,next)=> {
            if(next.transactionType == "DEBIT"){
                return acc+=parseInt(next.amount)
            }
            return acc;
        },0);
        return totalExpenditure
    }
   export const getExpenditureOnCredits = (data: Transactions[])=>{
       const filteredData =  data.filter((i)=> i.wallet == "LOAN")
       return filteredData.reduce((acc, next) => acc += parseInt(next.amount), 0)
        // setexpenditureData((prev) => {
        //     return {
        //         ...prev,
        //         expenditureOnCredit: 
        //     }
        // })
    }
    