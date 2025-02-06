export interface BudgetsType{
    id:string,
    userId:string;
    name:string;
    amount:string;
    startDate:Date;
    endDate:Date;
    createdDate:Date;
    recurring:boolean;
    recurringType:"MONTHLY"|"YEARLY"|"DAILY";
    categories: {id:string,name:string,amount:string,isFixed:boolean,amountType:"PERCENTAGE"|"AMOUNT";}[]
}