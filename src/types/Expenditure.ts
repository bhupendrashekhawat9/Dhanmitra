export interface ExpenditureType{
    id: number;
    name : string;
    amount:number;
    createdDate: Date;
    month:number;
    year:number;
}
export interface AddExpenditurePayloadType{
    name:string;
    amount: number;
    month:number;
    year:number;
    userId: number;
    createdDate: Date;

}