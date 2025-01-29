export interface IncomeType {
    amount: string;
    createdDate: Date;
    source: string;
    month:number;
    year:number;
    incomeId: number;
}
export interface AddIncomePayloadType{
    carryForward?: boolean;
    allocateTo?: unknown;
    amount: string;
    source: string;
    year :number;
    month: number;
    userId:number;
    createdDate: Date;
}
export interface IncomeSegrigationProps {
    open?:boolean;
    handleClose?: ()=> void;
}
export interface SegrigationDataType {
    segrigationName?:string,
    id:number,
    name:string;
    minAllocation:{
        type: "AMOUNT"|"PERCENTAGE",
        value: string
    };
    maxAllocation:{
        type: "AMOUNT"|"PERCENTAGE",
        value: string
    };
    isFixedCost:boolean
}
export interface AllSegmentationDataType  {
    [key:string]: SegrigationDataType[]
}