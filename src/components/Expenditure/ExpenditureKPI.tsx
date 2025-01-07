import { Stack, Typography } from '@mui/material'
import { useEffect, useLayoutEffect, useState } from 'react'
import { toLocal } from '../../commonMethods/adapters'
import { getAllData } from '../../indexDB/database'
import { ExpenditureType } from '../../types/Expenditure'
import { monthsToWeigth } from '../../variables/dropdowns'


const ExpenditureKPI = (refresh) => {
  const [expenditureData, setexpenditureData] = useState({
    totalExpenditure:0,
    currentMonthExpenditure:0,
    todaysExpenditure:0
  })
  // let totalExpenditure = toLocal(expenditureData.totalExpenditure,'currency') as string
  let currentMonthExpenditure = toLocal(expenditureData.currentMonthExpenditure,'currency') as string
  let todaysExpenditure = toLocal(expenditureData.todaysExpenditure,'currency') as string



  let getAllExpenditureData = async ()=>{
    
    let data: ExpenditureType[] = await getAllData("Expenditures") as ExpenditureType[]
    let totalExpenditure = 0
    let currentMonthExpenditure = 0;
    let date = new Date()
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let todaysExpenditure = 0;
    data.forEach((i:ExpenditureType)=>{
      totalExpenditure+=parseInt(i.amount)
      if(currentMonth == i.month && i.year == currentYear){
        currentMonthExpenditure+=parseInt(i.amount);
      
      }
      console.log(new Date(i.createdDate).toLocaleDateString()== date.toLocaleDateString())
      if(new Date(i.createdDate).toLocaleDateString()== date.toLocaleDateString()){

        todaysExpenditure+=parseInt(i.amount)
      }
  })
 setexpenditureData({
  totalExpenditure,
  currentMonthExpenditure,
  todaysExpenditure
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
          {currentMonthExpenditure}
        </Typography>
     
      <Stack height={"100%"} justifyContent={'center'} alignItems={'center'} position={'relative'} sx={{backgroundColor:'var(--primary-color)',color:"var(--text-color)",borderRadius:"var(--border-radius)"}}>
      <Typography>
        For Today
        </Typography>
        <Typography >
{todaysExpenditure}
        </Typography>
     
       
      </Stack>
    </Stack>
  )
}

export default ExpenditureKPI