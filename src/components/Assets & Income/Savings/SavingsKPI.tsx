import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { toLocal } from '../../../commonMethods/adapters';
import { getAllData } from '../../../indexDB/database';
import { SavingsType } from '../../../types/Savings';
import { SectionTypes } from '../../../types/types';
import { monthsToWeigth } from '../../../variables/dropdowns';

interface SavingsKPIProps{
  refresh:SectionTypes[]
}
const SavingsKPI = (props: SavingsKPIProps) => {
  let {refresh} = props;
  const [savings, setSavings] = useState({
    totalSavings: 0,
    month: (new Date()).getMonth(),
    thisMonthContribution:0
  })

  let getAllSavingsData = async ()=>{
    let data: SavingsType[] = await getAllData("Savings") as SavingsType[]
    let totalSavings = 0
    let thisMonthContribution = 0;
    let date = new Date()
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    data.forEach((i:SavingsType)=>{
      totalSavings+=parseInt(i.amount)
      if(currentMonth == i.month && i.year == currentYear){
        thisMonthContribution+=(parseInt(i.amount) as number);
      }
  })
  setSavings((prev)=>({
    ...prev,
    totalSavings,
    thisMonthContribution
  }))
  }

  useEffect(() => {
    if(!refresh[0]|| refresh.includes("SAVINGS"))
    getAllSavingsData()
  }, [refresh])
  
  let totalSavings = toLocal(savings.totalSavings,'currency') as string
  let thisMonthContribution = toLocal(savings.thisMonthContribution,'currency')
  return (
    <Stack direction={'column'} height={'100%'}>
    <Typography fontWeight={600} variant='h6' textAlign={'center'}>

      Savings
    </Typography>
    <Stack direction={'column'} padding={'0rem 1rem'} height={"100%"} justifyContent={'center'} alignItems={'center'}>
      <Typography variant='h4' fontWeight={600} textAlign={'center'}>{totalSavings}</Typography>
      <div style={{
        // boxSizing:'border-box',
        height:'2px',
        border:"1px solid black",
        width:'100%',
        margin:'.5rem'
      }}></div>
      

      <Typography variant='caption'>
        {`${thisMonthContribution} saved in ${monthsToWeigth[savings.month]}`}
      </Typography>
    </Stack>
    </Stack>
  )
}

export default SavingsKPI