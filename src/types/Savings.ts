// export interface SavingsType {
//     amount: number;
//     createdDate: Date;
//     month:number;
//     year:number;
//     id: number;
//     transactionType: "DEBIT"|"CREDIT";
    
// }
// export interface AddSavingsPayloadType{
//     amount: number;
//     month:number;
//     year:number;
//     transactionType: "DEBIT"|"CREDIT";
//     createdDate: Date;

// }
export interface SavingsType {
    amount: string;
    createdDate: Date;
    month:number;
    year:number;
    id: string;
    transactionType: "DEBIT"|"CREDIT";
    
}
export interface AddSavingsPayloadType{
    amount: string;
    month:number;
    year:number;
    transactionType: "DEBIT"|"CREDIT";
    createdDate: Date;

}
