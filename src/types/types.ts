import { ObjectNameType } from "../indexDB/database";

export type SectionTypes = "ASSETS" | "PLANS" |"HOME"
export interface Transactions {
    name: string;
    createdDate:Date;
    budgetCategory:string;
    amount:number;
    transactionType:"DEBIT"|"CREDIT",
    module:"INCOME"|"EXPRNDITURE";
    userId:number|string;
    spendSource:"CASH"|"LOAN"
}