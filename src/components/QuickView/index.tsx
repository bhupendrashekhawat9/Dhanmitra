import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpenditureExtendedKPI from '../Expenditure/ExpenditureExtendedKpi'
import Information from '../Expenditure/Informations/Information'
import KPIs from '../Expenditure/KPIs'
import Navigation from '../SideNavbar'
import AddBudget from '../Planning/Budgets/AddBudget'
import { ContextType, useContextv2 } from '../../Context'
import Transactions from '../Transactions'
import Budget from './Budget'
import AddTransaction from '../Transactions/AddTransaction'
let getPhaseOfDay = () => {

  let date = new Date();
  let hour = date.getHours()
  if (hour < 12) {
    return "Morning"
  }
  if (hour > 12 && hour < 15) {
    return "Afternoon"
  }
  if (hour >= 15 && hour < 25) {
    return "Evening"
  }
  return "Night"
}
const QuickSummary = () => {
  let phaseOfDay = getPhaseOfDay()

  let {store,updateContextStore} = useContextv2() as ContextType
  let handleOpenAddTransaction = ()=>{
    updateContextStore([["application.addTransactionModule","EXPENDITURE"]])
  }
  return (
    <div onDoubleClick={handleOpenAddTransaction} style={{

      maxWidth: "100rem"
    }}>
      <Stack sx={{
        padding: "3rem",

      }}>

        <Typography variant='h5' fontWeight={'800'} sx={{ color: "var(--clr-highlight--1)", fontSize: "38px", letterSpacing: "1.8px" }}>
          Good {phaseOfDay},
        </Typography>
        <Typography variant='h5' fontWeight={'800'} sx={{ fontSize: "32px", letterSpacing: "1.8px" }} color='black'>
          Bhupendra
        </Typography>
      </Stack>
      
      <Stack sx={{
        marginTop: "2rem",
        padding: "0 0 0 1rem"
      }}>
        <Typography variant='h6' fontWeight={600} sx={{ padding: ".5rem" }}>
          Todays Summary
        </Typography>
        <KPIs />

        <Information data={{ dayLimit: 0, daySpent: 0 }} />

        <Stack sx={{
          margin: "3rem 0"
        }} >
          <Navigation />
        </Stack>
      </Stack>
      <Stack>
        <Budget/>
        <Transactions/>
      </Stack>
      <AddTransaction />
      {/* <ExpenditureExtendedKPI /> */}
    </div>
  )
}

export default QuickSummary