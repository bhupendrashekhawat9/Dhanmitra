
export interface AddIncomePayloadType{
}
export interface IncomeType{
    transactionType:"DEBIT"|"CREDIT",
    module:"EXPENDITURE"|"INCOME",
    id:string,
    createdDate:Date;
    amount:string;
    name:string,
    startDate:Date|null;
    endDate:Date|null;
    recurring:boolean;
    recurringType:"MONTHLY"|"WEEKLY"|"DAILY";
    transferTo: string;
    transferToType:string;
    userId:string;
}