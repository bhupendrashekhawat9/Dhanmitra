import { useEffect, useState } from 'react'
import { getAllData } from '../../indexDB/database';
import { EmiType } from '../../types/Emi';
import { ExpenditureType } from '../../types/Expenditure';
import TransactionCard from '../../customComponents/TransactionCard';

const ExpenditureExtendedKPI = (refresh) => {
  
      const [allExpenditures, setAllExpenditures] = useState([])
      
      let getAllExpenditures = async ()=>{
        
        let data: ExpenditureType[] = await getAllData("Expenditures") as ExpenditureType[]
        let date = new Date();
        let currentYear = date.getFullYear();
        
        let groupedMontlyExpense = new Map();
        data.forEach((i:ExpenditureType)=>{
            if(i.year == currentYear){

                groupedMontlyExpense.set(i.month,groupedMontlyExpense.get(i.month)+parseInt(i.amount))
            }
            
        })
        
    setAllExpenditures(data)
      
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
            allExpenditures.map((i:ExpenditureType)=>{
                return <>
                <TransactionCard amount={i.amount} name={i.name} />
                </>
            })
        }
    </div>
  )
}

export default ExpenditureExtendedKPI