import moment from "moment";
import { addData, getAllData } from "../indexDB/database"
import { Transactions } from "../types/types"
import { BudgetsType } from "../types/Budgets";
import { IncomeType } from "../types/Income";

export const getAllActiveBudgets = async(startDate:Date|null,endDate:Date|null)=>{
    const budgets:BudgetsType[] = await getAllData("budgets") as BudgetsType[];
    const filteredBUdgets= budgets
    console.log(filteredBUdgets,"filteredbudget")
    return filteredBUdgets
}

export const getUpcomingPlannedBudgets = async(startDate:Date|null,endDate:Date|null)=>{
    const budgets:BudgetsType[] = await getAllData("budgets") as BudgetsType[];
    const filteredBUdgets= budgets.filter(i=> {
        if(i.startDate && i.endDate){
            return moment(i.startDate).isSameOrAfter(startDate) && moment(i.endDate).isSameOrBefore(endDate)
        }   
        return moment(endDate).isSameOrAfter(i.createdDate)
        
    })
    return filteredBUdgets
}
export const getAllTransactions = async(startDate:Date|null,endDate:Date|null)=>{
    const data: Transactions[] = await getAllData("transactions") as Transactions[]

    const budgets = await getAllActiveBudgets(startDate,endDate) as BudgetsType[]
    const groupedBudgets = {}
    budgets.forEach((i)=>{
        i.categories.forEach((j)=>{
            groupedBudgets[i.id] = j
        })

    })
    const filteredData = []

    data.forEach((i:Transactions)=>{
        
        filteredData.push({
            ...i,
            budgetCategory: groupedBudgets[i.budgetCategoryId]?.name
        })
    })
    
    return filteredData;
}
export const getAllIncomes = async(startDate:Date|null,endDate:Date|null)=>{
    const data: IncomeType[] = await getAllData("incomes") as IncomeType[]

    // let budgets = await getAllActiveBudgets(startDate,endDate) as BudgetsType[]
    // let groupedBudgets = budgets._groupBy("id")
    const filteredData = []

    data.forEach((i:IncomeType)=>{
        filteredData.push({
            ...i
        })
    })
    return filteredData;
}
export const addTransaction = async(data:Transactions)=>{
    const response = addData(data,"transactions");
    console.log(response);

}
export const addIncomeType =async(data:IncomeType)=>{
    addData(data,"incomes")
}
export const updateUser = async(data)=>{
    addData(data,"user")
}