export interface IncomeType {
    amount: string;
    createdDate: Date;
    source: string;
    month:number;
    year:number;
    incomeId: number;
}
export interface AddIncomePayloadType{
    amount: string;
    source: string;
    year :number;
    month: number;
    userId:number;
    createdDate: Date;
}
