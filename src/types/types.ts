import { ObjectNameType } from "../indexDB/database";

export type SectionTypes = "ASSETS" | "PLANS" |"HOME"|"BUDGET"
export interface Transactions {
    id?:string,
    name: string;
    createdDate:string;
    budgetCategoryId:string;
    budgetId:string;
    amount:string;
    transactionType:"DEBIT"|"CREDIT",
    module:"EXPENDITURE";
    userId:number|string;
    wallet:"LOAN"|"CASH";

}