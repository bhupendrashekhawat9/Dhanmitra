export interface BudgetsType{
    id:number,
    name:string;
    amount:string;
    startDate:Date;
    endDate:Date;
    createdDate:Date;
    carryForward:boolean;
    budgetCategories: {id:string,name:string,amount:number,isFixed:boolean,amountType:"PERCENTAGE"|"AMOUNT";}[]
}