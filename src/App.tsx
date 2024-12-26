import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import KPICard from './customComponents/KPICard'
import IncomeKPI from './components/Income/IncomeKPI'
import ExpenditureKPI from './components/Expenditure/ExpenditureKPI'
import EmiKPI from './components/Emi/EmiKPI'
import GoalKPI from './components/Goals/GoalKPI'
import { Button, Dialog, DialogContent, Icon, Stack, Typography } from '@mui/material'
import SavingsKPI from './components/Savings/SavingsKPI'
import TransactionCard from './customComponents/TransactionCard'
import Divider from './customComponents/DIvider'
import { capitalize } from './commonMethods/adapters'
import AddSavings from './components/Savings/AddSavings'
import AddGoals from './components/Goals/AddGoals'
import AddExpenditure from './components/Expenditure/AddExpenditure'
import AddEMI from './components/Emi/AddEmi'
import AddIncome from './components/Income/AddIncome'
import { SectionTypes } from './types/types'
import EMIExtendedKPI from './components/Emi/EMIExtendedKPI'
import SavingsExtendedKPI from './components/Savings/SavingsExtendedKPI'
import ExpenditureExtendedKPI from './components/Expenditure/ExpenditureExtendedKpi'


// deleteData(1,"Incomes").then(() => console.log('Data deleted'));

function App() {
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [refresh, setRefresh] = useState<SectionTypes[]>([])
  const [sectionOnFocus, setsectionOnFocus] = useState<SectionTypes>("SAVINGS")
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleFocusTarget = () => {
    let element = document.getElementById("ExpenditureKPI");
      
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth", // Adds smooth scrolling
        inline: "center", // Scrolls horizontally to center the target
        block: "nearest", // Ensures minimal vertical scrolling
      });
    }
  };
  const toggleDrawer =() =>{
    setRefresh([sectionOnFocus])
    setOpenActionDialog(!openActionDialog);
    }

  let handleOnKpiClick = (ref: SectionTypes) => {
    setsectionOnFocus(ref)
    // toggleDrawer()

  }
  let extendedKPIViewComponent = ()=>{
      switch(sectionOnFocus){
        case "INCOME":
          return <>Income</>
          case "EMI":
            return <>
              <EMIExtendedKPI/></>
            case "EXPENDITURE":
          return <>
          <ExpenditureExtendedKPI/>
          </>
          case "SAVINGS":
          return <>
          <SavingsExtendedKPI/>
          </>
          case "GOAL":
          return <>GOAL</>
      }
  }

let getActionDrawerComponent = ()=>{
  switch(sectionOnFocus){
    case "INCOME":
      return <>
      <AddIncome handleClose={toggleDrawer}/>
      </>
      case "EMI":
        return <>
        <AddEMI handleClose={toggleDrawer}/>
        </>
        case "EXPENDITURE":
      return <>
      <AddExpenditure handleClose={toggleDrawer}/>
      </>
      case "SAVINGS":
      return <>
      <AddSavings handleClose={toggleDrawer}/>
      </>
      case "GOAL":
      return <>
      <AddGoals handleClose={toggleDrawer}/>
      </>
  }
}
useEffect(() => {
    handleFocusTarget()
}, [])

  return (
    <div style={{ width: "100vw", height: '100vh' }} >

    

      <Stack padding={'1rem'} direction={'row'}>
    <Typography variant='h6'>
     Dhan-Mitra
    </Typography>
        <Icon>

        </Icon>
      </Stack>
      {/* <ProgressCard progress={"60"} progressColor='green' >
        <p color='white'>
          This is a progress card
        </p>
      </ProgressCard> */}
      <div className='kpiContainer' >
        <div className='kpiContainer-element' onTouchStart={()=>handleOnKpiClick("INCOME")} onClick={()=>handleOnKpiClick("INCOME")}>
          <KPICard>

            <IncomeKPI refresh={refresh} />

          </KPICard>
        </div>
                <div className='kpiContainer-element' id="ExpenditureKPI" ref={targetRef} onTouchStart={()=>handleOnKpiClick("EXPENDITURE")} onClick={()=>handleOnKpiClick("EXPENDITURE")}>

          <KPICard>
            <ExpenditureKPI refresh={refresh}/>
          </KPICard>
        </div>
                <div className='kpiContainer-element' onTouchStart={()=>handleOnKpiClick("SAVINGS")} onClick={()=>handleOnKpiClick("SAVINGS")}>

          <KPICard>
            <SavingsKPI refresh={refresh} />
          </KPICard>
        </div>
                <div className='kpiContainer-element' onTouchStart={()=>handleOnKpiClick("EMI")} onClick={()=>handleOnKpiClick("EMI")}>

          <KPICard>
            <EmiKPI refresh={refresh} />
          </KPICard>
        </div>
                <div className='kpiContainer-element' onTouchStart={()=>handleOnKpiClick("GOAL")} onClick={()=>handleOnKpiClick("GOAL")}>

          <KPICard>
            <GoalKPI />
          </KPICard>
        </div>

      </div>
          {/* Extended KPI Card*/}
          <Stack>

          <Button onClick={toggleDrawer} sx={{marginLeft:"auto"}}>
            Add +
          </Button>
          </Stack>
        <div style={{
          height:'40vh',
          
          margin:'.5rem',
          borderRadius:'1rem',
          // backgroundColor:'black'
        }}>
          {extendedKPIViewComponent()}
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
  )
}

export default App
