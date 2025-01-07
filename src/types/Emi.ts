export interface EmiType{
    loanAmount: string;
    id: number;
    loanName: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    durationType: AddEmiPayloadType["durationType"];
    installmentAmount: string;
    installmentType: string;
    createdDate: Date;

}
export interface AddEmiPayloadType{
    endDate: string | number | Date;
    loanName: string;
  
    duration: number;
    durationType: "DAY"|"MONTH"|"YEAR"
    installmentAmount: number;
    installmentType: string;
    createdDate: Date;
    userId:number,
    loanAmount:number
}