import { createContext, ReactNode, useState } from "react";
import { AllSegmentationDataType, IncomeType, SegrigationDataType } from "./types/Income";
import { ExpenditureType } from "./types/Expenditure";
import { SectionTypes } from "./types/types";
import { getAllData, ObjectNameType } from "./indexDB/database";



export interface ContextType{
    store:ContextStore;
    updateContextStore: (arg:Array<[string,unknown]>)=> void;
    refreshContextStore:(key:ObjectNameType)=> void
}
export const Context = createContext<ContextType|object>({});

interface incomeCtxType{
    segregations:SegrigationDataType[];
    allTransactions: IncomeType[]
}
interface expenditureCtxType{
    expenditureTransactions: ExpenditureType[]
}
interface applicationType{
    path:SectionTypes
}
interface ContextStore {
    application: applicationType
    incomes:incomeCtxType|null;
    expenditures:expenditureCtxType|null
}
export const ContextProvider = ({children}:{children:ReactNode})=>{
    const [store, setStore] = useState<ContextStore>({
        application:{
            path:"EXPENDITURES"
        },
        incomes:{
            segregations:[],
            allTransactions:[]
        },
        expenditures:null,
    });
 interface inputTypes {
    path:string,data:unknown
}
    let updateContextStore= (arg:Array<[string,unknown]>)=>{
        if(arg){
            let clonedData = JSON.parse(JSON.stringify(store))
            arg.forEach((input)=>{
            let path = input[0];
            let data = input[1]
            let  pathList = path?.split(".");
            let tempStorage = clonedData;
            let pointer = 0;
            while(tempStorage){
                let key = pathList[pointer];
                if(Array.isArray(tempStorage)){
                    let k = key.split("=")[0];
                    let val = key.split("=")[1];
                    tempStorage.forEach(element => {
                        
                        if(element[k] == val){
                            tempStorage = element;
                        }
                    });
                    pointer++
                    continue;
                }
                if(pointer == pathList.length-1){
                    
                    tempStorage[key] = data;
                    tempStorage = null;
                }else{
                    tempStorage = tempStorage[key];
                }
                pointer++;
            }
        })

            setStore(clonedData)
        }else{
            throw new Error("Please provide path if not provided eg: incomes.id=20.name and provide a data if not provided");
            
        }

    }
    let refreshContextStore= async(ref: ObjectNameType)=>{
        
        let data = await getAllData(ref) as unknown
        let tref = ref as string
        updateContextStore([[tref,data]])
    }
    return(
        <Context.Provider value={{store,updateContextStore,refreshContextStore}} >
            {children}
        </Context.Provider>
    )
}