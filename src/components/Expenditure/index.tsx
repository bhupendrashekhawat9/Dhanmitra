import React, { useContext, useEffect, useState } from 'react'
import KPICard from '../../customComponents/KPICard'
import ExpenditureKPI from './ExpenditureKPI'
import { IncomeType, SegrigationDataType } from '../../types/Income'
import { ExpenditureType } from '../../types/Expenditure'
import { Context, ContextType } from '../../Context'
import { toLocal } from '../../commonMethods/adapters'
import { getAllData } from '../../indexDB/database'
import KPIs from './KPIs'
import ExpenditureExtendedKPI from './ExpenditureExtendedKpi'
import { Stack, Typography } from '@mui/material'
import Information from './Informations/Information'


let getPhaseOfDay = ()=>{

  let date = new Date();
  let hour = date.getHours()
  if(hour < 12){
    return "Morning"
  }
  if(hour > 12 && hour < 15){
    return "Afternoon"
  }
  if(hour >= 15 && hour < 25){
    return "Evening"
  }
  return "Night"
}
const ExpenditurePage = () => {
  
  

  let phaseOfDay = getPhaseOfDay()
  return (
    <div style={{
     
   
    }}>
      <Stack sx={{
        padding:"2rem",
        
      }}>

      <Typography  variant='h5' fontWeight={'800'} sx={{color:"var(--clr-highlight--1)",fontSize:"38px",letterSpacing:"1.8px"}}>
        Good {phaseOfDay},
      </Typography>
      <Typography  variant='h5' fontWeight={'800'} sx={{fontSize:"32px", letterSpacing:"1.2px"}} color='black'>
        Bhupendra
      </Typography>
      </Stack>
      <Stack sx={{
        marginTop:"2rem",
        padding:"0 0 0 1rem"
      }}>
        <Typography variant='h6' fontWeight={600} sx={{padding:".5rem"}}>
          Todays Summary
        </Typography>
         <KPIs/>
      </Stack>
         <Information data={{dayLimit:0,daySpent:0}} />
         <ExpenditureExtendedKPI/>
    </div>
  )
}

export default ExpenditurePage