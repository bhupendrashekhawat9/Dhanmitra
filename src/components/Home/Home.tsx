import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Information from '../Expenditure/Informations/Information'
import KPIs from './KPIs'
import { ContextType, useContextv2 } from '../../Context'
import Transactions from '../Transactions'
import Budget from './Budget'

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
const Home = () => {
  let phaseOfDay = getPhaseOfDay()
  const [openAddScreen,setOpenAddScreen] = useState(false)
  let {store,updateContextStore} = useContextv2() as ContextType
  let handleToggleAddTransaction = ()=>{
    debugger
    setOpenAddScreen(prev=> !prev)
  }
  return (
    <div onDoubleClick={handleToggleAddTransaction} style={{
      maxWidth: "100rem"
    }}>
      <Stack sx={{
        padding: "2rem",

      }}>

        <Typography  fontWeight={'800'} sx={{ color: "var(--color-75)", fontSize: "2rem", letterSpacing: "1.8px" }}>
          Good {phaseOfDay},
        </Typography>
        <Typography variant='h5' fontWeight={'800'} sx={{fontSize: "2rem", letterSpacing: "1.8px" }} color='black'>
          {store.userData.name}
        </Typography>
      </Stack>
      
      <Stack sx={{
        marginTop: "1rem",
        padding: "0 0 0 1rem"
      }}>
        <Typography variant='h6' fontWeight={600} sx={{ padding: ".5rem" }}>
          Todays Summary
        </Typography>
        <KPIs />

        <Information data={{ dayLimit: 0, daySpent: 0 }} />

       
      </Stack>
      <Stack>
        <Budget/>
        <Transactions/>
      </Stack>
    
      
      {/* <ExpenditureExtendedKPI /> */}
    </div>
  )
}

export default Home