import { useContext, useEffect, useState } from 'react'
import './App.css'
import './index.css'

import { Dialog, DialogContent, Stack } from '@mui/material'
import AddExpenditure from './components/Expenditure/AddExpenditure'
import AddIncome from './components/Assets & Income/AddIncome'
import { SectionTypes } from './types/types'
import { Context, ContextType } from './Context'
import ExpenditurePage from './components/Expenditure'
import Incomes from './components/Assets & Income'
import { Haptics } from "@capacitor/haptics"
import QuickSummary from './components/QuickView'
import Budget from './components/Planning/Budgets'
import Plans from './components/Planning/Plans'

function App() {
  const [openActionDialog, setOpenActionDialog] = useState(false);

  const [sectionOnFocus, setsectionOnFocus] = useState<SectionTypes>("HOME")
  const { store, updateContextStore } = useContext(Context) as ContextType

  let applicationData: ContextType["store"]["application"] = store.application
  let focusedModule = applicationData.path
  const toggleDrawer = async () => {
    setOpenActionDialog(!openActionDialog);
    if (!openActionDialog) {
      await Haptics.vibrate()
    }
  }
  let SwitchToFocusedModule = () => {

    switch (focusedModule) {
      case "ASSETS":
        return <>
          <Incomes />
        </>
      case "PLANS":
        
        return <>
          <Plans />
        </>;
       case "HOME":
        return <>
          <QuickSummary />
        </>;
         case "BUDGET":
          return <>
            <Budget />
          </>;
    }
  }
  useEffect(() => {
    // handleFocusTarget()
    setsectionOnFocus(applicationData.path)
  }, [applicationData.path])
  return (


    <div className='dm-main' onDoubleClick={() => !openActionDialog ? toggleDrawer() : null}>    
          {SwitchToFocusedModule()}
      
        <div>
          <Dialog open={openActionDialog} onClose={toggleDrawer}>
            <DialogContent>
              <AddExpenditure handleClose={toggleDrawer}/>
            </DialogContent>
          </Dialog>
        </div>
    </div>


  )
}

export default App
