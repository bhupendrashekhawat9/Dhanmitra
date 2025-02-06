import { ObjectNameType } from "../indexDB/database";

export type SectionTypes = "ASSETS" | "PLANS" |"HOME"|"BUDGET"
export interface Transactions {
    name: string;
    createdDate:Date;
    budgetCategoryId:string;
    budgetId:string;
    amount:string;
    transactionType:"DEBIT"|"CREDIT",
    module:"EXPRNDITURE";
    userId:number|string;
    wallet:"CREDIT"|"CASH";

}