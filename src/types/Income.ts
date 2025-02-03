// export interface IncomeType {
//     amount: string;
//     createdDate: Date;
//     source: string;
//     month:number;
//     year:number;
//     incomeId: number;
// }

import { Transactions } from "./types";

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

export interface AddIncomePayloadType{
}
export interface IncomeType{
    id?:number,
    createDate:Date;
    amount:string;
    name:string,
    startDate:Date|null;
    endDate:Date|null;
    autoCarry:boolean;
    transferTo: string;
    transferToType:string;

}