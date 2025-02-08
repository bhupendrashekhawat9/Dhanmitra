import { ObjectNameType } from "../indexDB/database";

export type SectionTypes = "ASSETS" | "PLANS" |"HOME"|"BUDGET"
export interface Transactions {
    name: string;
    createdDate:string;
    budgetCategoryId:string;
    budgetId:string;
    amount:string;
    transactionType:"DEBIT"|"CREDIT",
    module:"EXPRNDITURE";
    userId:number|string;
    wallet:"CREDIT"|"CASH";

}