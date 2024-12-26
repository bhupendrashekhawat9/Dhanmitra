import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { toLocal } from '../../commonMethods/adapters';
import { SectionTypes } from '../../types/types';
import { getAllData } from '../../indexDB/database';
import { EmiType } from '../../types/Emi';
import moment from 'moment';
interface EmiKPIProps {
  refresh: SectionTypes[]
}
const EmiKPI = (props:EmiKPIProps) => {

  let {refresh} = props
  const [emiData, setemiData] = useState({
    totalLoanAmount:0,
    currentMonthInstallment:0
  })
  let getAllEmi = async ()=>{
    
    let data: EmiType[] = await getAllData("EMIs") as EmiType[]
    let currentMonthInstallment = 0;
    let totalLoanAmount = 0;
    let date = new Date();

    data.forEach((i:EmiType)=>{
      
        if(moment(i.endDate) > moment()){
          totalLoanAmount+=parseInt(i.loanAmount);
          currentMonthInstallment+=parseInt(i.installmentAmount)
        }
    })

  setemiData({
    totalLoanAmount,
    currentMonthInstallment
  })
  
  }

  useEffect(() => {
    
      if(refresh){
        getAllEmi()
      }
  }, [refresh])
  let totalAmount = toLocal(emiData.totalLoanAmount,'currency') as string;
  let currentMonthInstallment = toLocal(emiData.currentMonthInstallment,'currency') as string;

  let totalInstallmentPercentageOnOIncome = 0 as number
  
  return (
    <Stack direction={'column'} height={'100%'}>
    <Typography fontWeight={600} variant='h6' textAlign={'center'}>

      EMI's
    </Typography>
   {emiData.currentMonthInstallment > 0 ?  <Stack direction={'column'} padding={'0rem 1rem'} height={"100%"} justifyContent={'center'} alignItems={'center'}>
      <Typography variant='h4' fontWeight={600} textAlign={'center'}>{totalAmount}</Typography>
      <div style={{
        height:'2px',
        border:"1px solid black",
        width:'100%',
        margin:'.5rem'
      }}></div>
      <Typography variant='h6' fontWeight={600} textAlign={'center'}>{currentMonthInstallment}/Month</Typography>

     {totalInstallmentPercentageOnOIncome > 0 ?  <Typography variant='caption'>
        45% of your income
      </Typography>:<></>}
    </Stack>:<></>}
    {
      emiData.currentMonthInstallment == 0 ? <>
      <Stack justifyContent={"center"} alignItems={'center'} height={"100%"}>

        <Typography fontWeight={600}>
          No Active Loan
        </Typography>
      </Stack>
      </>:<></>
    }
    </Stack>
  )
}

export default EmiKPI