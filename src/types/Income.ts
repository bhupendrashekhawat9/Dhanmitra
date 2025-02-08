
export interface AddIncomePayloadType{
}
export interface IncomeType{
    transactionType:"DEBIT"|"CREDIT",
    module:"EXPENDITURE"|"INCOME",
    id:string,
    createdDate:string;
    amount:string;
    name:string,
    startDate:string|null;
    endDate:string|null;
    recurring:boolean;
    recurringType:"MONTHLY"|"WEEKLY"|"DAILY";
    transferTo: string;
    transferToType:string;
    userId:string;
}