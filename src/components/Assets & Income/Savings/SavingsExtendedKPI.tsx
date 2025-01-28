

import { useState, useEffect } from "react";
import TransactionCard from "../../../customComponents/TransactionCard";
import { getAllData } from "../../../indexDB/database";
import { ExpenditureType } from "../../../types/Expenditure";

const SavingsExtendedKPI = (refresh) => {
  
      const [allSavings, setAllSavings] = useState([])
      
      let getAllExpenditures = async ()=>{
        
        let data: ExpenditureType[] = await getAllData("Savings") as ExpenditureType[]
        let date = new Date();
        let currentYear = date.getFullYear();
        
        let groupedMontlyExpense = new Map();
        data.forEach((i:ExpenditureType)=>{
            if(i.year == currentYear){

                groupedMontlyExpense.set(i.month,groupedMontlyExpense.get(i.month)+parseInt(i.amount))
            }
            
        })
        
    setAllSavings(data)
      
      }
      useEffect(() => {
        
          if(refresh){
            getAllExpenditures()
          }
      }, [refresh])
      
  return (
    <div style={{
        padding:".5rem"
    }}>
        {
            allSavings.map((i:ExpenditureType)=>{
                return <>
                <TransactionCard children={<></>} />
                </>
            })
        }
    </div>
  )
}

export default SavingsExtendedKPI