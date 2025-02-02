export interface BudgetsType{
    id:number,
    name:string;
    amount:number;
    startDate:Date;
    endDate:Date;
    createdDate:Date;
    carryForward:boolean;
    budgetCategories: {name:string,amount:number,isFixed:boolean,amountType:"PERCENTAGE"|"AMOUNT";}[]
}