export interface IncomeType {
    amount: number;
    createdDate: Date;
    source: String;
    month:number;
    year:number;
    incomeId: number;
}
export interface AddIncomePayloadType{
    amount: number;
    source: String;
    year :number;
    month: number;
    userId:number;
    createdDate: Date;
}
