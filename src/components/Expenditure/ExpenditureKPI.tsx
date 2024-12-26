import { Stack, Typography } from '@mui/material'
import { useEffect, useLayoutEffect, useState } from 'react'
import { toLocal } from '../../commonMethods/adapters'
import { getAllData } from '../../indexDB/database'
import { ExpenditureType } from '../../types/Expenditure'
import { monthsToWeigth } from '../../variables/dropdowns'

const ExpenditureKPI = (refresh) => {
  const [expenditureData, setexpenditureData] = useState({
    totalExpenditure:0
  })
  let totalExpenditure = toLocal(expenditureData.totalExpenditure,'currency') as string

  let getAllExpenditureData = async ()=>{
    let data: ExpenditureType[] = await getAllData("Expenditures") as ExpenditureType[]
    let totalExpenditure = 0
    let thisMonthContribution = 0;
    let date = new Date()
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    data.forEach((i:ExpenditureType)=>{
      totalExpenditure+=parseInt(i.amount)
      if(currentMonth == i.month && i.year == currentYear){
        thisMonthContribution+=parseInt(i.amount);
      }
  })
 setexpenditureData({
  totalExpenditure
 })
  }

  useLayoutEffect(()=>{
    // let canvas:HTMLElement|null = document.getElementById("ExpenditureCanvas");
    // if(canvas){
    //  let ctx = canvas.getContext("2d");
    //   ctx.moveTo(10,12)
    //   ctx.fill()
    // }
  },[])
useEffect(() => {
    getAllExpenditureData()
}, [refresh])

  return (
    <Stack height={'100%'} direction={"column"} alignContent={"space-between"}>
      <Stack>

      <Typography variant='h5' fontWeight={600} textAlign={'center'}>
        Expenditure
      </Typography>
         <Typography variant='caption' textAlign={'center'}>
          For {monthsToWeigth[new Date().getMonth()]}
        </Typography>
      </Stack>
     
        <Typography textAlign={'center'} variant='h4' fontWeight={600}>
          {totalExpenditure}
        </Typography>
     
      <Stack height={"100%"} justifyContent={'center'} alignItems={'center'} position={'relative'} sx={{backgroundColor:"black"}}>
        
     
       
      </Stack>
    </Stack>
  )
}

export default ExpenditureKPI