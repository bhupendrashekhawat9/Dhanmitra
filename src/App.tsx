import { useContext, useEffect, useRef, useState } from 'react'
import './App.css'
import './index.css'

import { Dialog, DialogContent, Icon, Stack, Typography } from '@mui/material'
import AddSavings from './components/Savings/AddSavings'
import AddGoals from './components/Goals/AddGoals'
import AddExpenditure from './components/Expenditure/AddExpenditure'
import AddEMI from './components/Emi/AddEmi'
import AddIncome from './components/Income/AddIncome'
import { SectionTypes } from './types/types'
import SavingsExtendedKPI from './components/Savings/SavingsExtendedKPI'
import { Context, ContextType } from './Context'
import { getAllData } from './indexDB/database'
import { IncomeType, SegrigationDataType } from './types/Income'
import SideNavbar from "./components/SideNavbar"
import ExpenditurePage from './components/Expenditure'
import Incomes from './components/Income'
import {Haptics} from "@capacitor/haptics"

function App() {
  const [openActionDialog, setOpenActionDialog] = useState(false);

  const [sectionOnFocus, setsectionOnFocus] = useState<SectionTypes>("EXPENDITURES")
  const {store,updateContextStore} = useContext(Context) as ContextType

  let applicationData: ContextType["store"]["application"] = store.application
  const toggleDrawer =async() =>{
    setOpenActionDialog(!openActionDialog);
    if(!openActionDialog){
      await Haptics.vibrate()
    }
    }
  let SwitchToFocusedModule = ()=>{
      switch(sectionOnFocus){
        case "INCOMES":
          return <>
         <Incomes />
          </>
          case "EMIS":
            return <>
              </>
            case "EXPENDITURES":
          return <>
          <ExpenditurePage/>
          </>
          case "SAVINGS":
          return <>
          <SavingsExtendedKPI/>
          </>
          case "GOALS":
          return <>
          {}
          </>
      }
  }

let getActionDrawerComponent = ()=>{
  switch(sectionOnFocus){
    case "INCOMES":
      return <>
      <AddIncome handleClose={toggleDrawer}/>
      </>
      case "EMIS":
        return <>
        <AddEMI handleClose={toggleDrawer}/>
        </>
        case "EXPENDITURES":
      return <>
      <AddExpenditure handleClose={toggleDrawer}/>
      </>
      case "SAVINGS":
      return <>
      <AddSavings handleClose={toggleDrawer}/>
      </>
      case "GOALS":
      return <>
      <AddGoals handleClose={toggleDrawer}/>
      </>
  }
}
useEffect(() => {
    // handleFocusTarget()
    setsectionOnFocus(applicationData.path)
}, [applicationData.path])

const fetchAllIncomeSegrigations = async() => {
    
  let allSegregations:SegrigationDataType[]|null = await getAllData("Incomes.Segregation") as SegrigationDataType[]|null;
  let allIncomes: IncomeType[] = await getAllData("Incomes") as IncomeType[]
  
  updateContextStore([["incomes.segregations",allSegregations],["incomes.allTransactions",allIncomes]])

}

useEffect(() => {
  fetchAllIncomeSegrigations()
},[])

  return (
   

    <div className='dm-main' onDoubleClick={()=> !openActionDialog ? toggleDrawer():null}  >
      <div style={{
        padding:'1rem',

      }}>

      <SideNavbar/>
      </div>
    <div style={{
      overflow:'auto'
    }} >


      <Stack padding={'1rem'} direction={'row'} alignItems={'end'}>
   <img src='/logo.svg' height={'35px'}/>
   <span style={{
    width:'2px',
    backgroundColor:'black',
    height:'1.5rem',
    margin:'0 0 .3rem .3rem'
   }}>

   </span>
   <span style={{
    marginLeft:'.5rem',
    fontWeight:600,
    height:'max-content'
   }}>Dhanmitra</span>
      </Stack>
      {/* <ProgressCard progress={"60"} progressColor='green' >
        <p color='white'>
          This is a progress card
        </p>
      </ProgressCard> */}
 
          {/* Extended KPI Card*/}
        
        <div className='dm-main-right' style={{
         
          // backgroundColor:'black'
        }}>
            <Stack>
          </Stack>
          {SwitchToFocusedModule()}
        </div>
      
        <Dialog
          fullWidth
        
      open={openActionDialog}
      onClose={toggleDrawer}
    >
      <DialogContent sx={{
        minHeight:'10vh'
      }}>

      {
        getActionDrawerComponent()
      }
      </DialogContent>
    </Dialog>
    </div>

    </div>
    

  )
}

export default App
