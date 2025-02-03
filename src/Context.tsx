import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AllSegmentationDataType, IncomeType, SegrigationDataType } from "./types/Income";
import { ExpenditureType } from "./types/Expenditure";
import { SectionTypes, Transactions } from "./types/types";
import { getAllData, ObjectNameType } from "./indexDB/database";
import moment, { Moment } from "moment";
import { BudgetsType } from "./types/Budgets";
import { getCurrentMonthEndDate, getCurrentMonthStartDate } from "./commonMethods/adapters";
import { getAllActiveBudgets, getAllIncomes, getAllTransactions } from "./commonMethods/fetchMethods";
import { IncomeTypes } from "./components/Assets & Income";



export interface ContextType{
    store:ContextStore;
    updateContextStore: (arg:Array<[string,unknown]>)=> void;
    refreshContextStore:(key:ObjectNameType)=> void
}
export const Context = createContext<ContextType|object>({});

interface incomeCtxType{
    sources: IncomeType[]
}
interface expenditureCtxType{
    expenditureTransactions: ExpenditureType[]
}
interface applicationType{
    path:SectionTypes,
    addTransactionModule:"EXPENDITURE"|"INCOME"|"BUDGET"|null
}
interface budgetsType{
    activeBudget: BudgetsType[]
}
interface plansType{
    activePlans:[],
    upcomingPlans:[]
}
type assetsType = []
interface ContextStore {
    startDate:Date;
    endDate:Date;
    application: applicationType
    incomes:incomeCtxType["sources"];
    assets:assetsType;
    transactions:Transactions[]|null;
    budgets:budgetsType;
    plans:plansType
}


export const useContextv2 = ()=>{
        let ctx = useContext(Context) as ContextType

    return ctx
}

export const ContextProvider = ({children}:{children:ReactNode})=>{
    const [store, setStore] = useState<ContextStore>({
        startDate: getCurrentMonthStartDate(),
        endDate:getCurrentMonthEndDate(),
        transactions:[],
        incomes: [],
        assets:[],
        application:{
            path:"HOME",
            addTransactionModule:null
        },
        budgets:{
            activeBudget:[],
        },
        plans:{
            activePlans:[],
            upcomingPlans:[]
        },
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
    let fetchAllTransactions = async()=>{
        let data = await getAllTransactions(store.startDate,store.endDate);
        setStore((prev)=>{
            return {
                ...prev,
                transactions: data
            }
        })
    }
    let fetchAllIncomes = async()=>{
        let data = await getAllIncomes(store.startDate,store.endDate) as IncomeType[];
        setStore((prev)=>{
            return {
                ...prev,
                incomes: data
            }
        })
    }
    let fetchAllBudgets = async()=>{
        let data = await getAllActiveBudgets(store.startDate,store.endDate);
        setStore((prev)=>{
            return {
                ...prev,
                budgets:{
                    activeBudget: data
                }
            }
        })
    }
    console.log(store)
    useEffect(() => {
        fetchAllTransactions();
        fetchAllBudgets();
        fetchAllIncomes()
    }, [])
    

    return(
        <Context.Provider value={{store,updateContextStore,refreshContextStore}} >
            {children}
        </Context.Provider>
    )
}