export interface ExpenditureType{
    id: number;
    name : string;
    amount:string;
    createdDate: Date;
    month:number;
    year:number;
}
export interface AddExpenditurePayloadType{
    name:string;
    amount: string;
    month:number;
    year:number;
    userId: number;
    createdDate: Date;

}