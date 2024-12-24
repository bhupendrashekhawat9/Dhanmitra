import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { toLocal } from '../../commonMethods/adapters';
import { getAllData } from '../../indexDB/database';
import { EmiType } from '../../types/Emi';
import { ExpenditureType } from '../../types/Expenditure';
import TransactionCard from '../../customComponents/TransactionCard';
import { Typography } from '@mui/material';

const SavingsExtendedKPI = (refresh) => {
    const [emiData, setemiData] = useState({
        totalLoanAmount:0,
        currentMonthInstallment:0
      })
      const [allSavings, setAllSavings] = useState([])
      
      let getAllExpenditures = async ()=>{
        
        let data: ExpenditureType[] = await getAllData("Savings") as EmiType[]
        let currentMonthInstallment = 0;
        let totalLoanAmount = 0;
        let date = new Date();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();
        
        let groupedMontlyExpense = new Map();
        data.forEach((i:ExpenditureType)=>{
            if(i.year == currentYear){

                groupedMontlyExpense.set(i.month,groupedMontlyExpense.get(i.month)+parseInt(i.amount))
            }
            
        })
        
    setAllSavings(data)
      setemiData({
        totalLoanAmount,
        currentMonthInstallment
      })
      
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
                <TransactionCard amount={i.amount} name={i.name} />
                </>
            })
        }
    </div>
  )
}

export default SavingsExtendedKPI