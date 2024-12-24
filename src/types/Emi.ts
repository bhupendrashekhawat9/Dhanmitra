export interface EmiType{
    id: number;
    loanName: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    durationType: AddEmiPayloadType["durationType"];
    installmentAmount: number;
    installmentType: String;
    createdDate: Date;

}
export interface AddEmiPayloadType{
    loanName: string;
    startDate: Date;
    duration: number;
    durationType: "DAY"|"MONTH"|"YEAR"
    installmentAmount: number;
    installmentType: String;
    createdDate: Date;
    userId:number,
    loanAmount:number
}