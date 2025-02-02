import { Dialog, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import AddExpenditure from '../Expenditure/AddExpenditure'
import AddIncome from '../Assets & Income/AddIncome'

const AddTransaction = () => {
    const [selectedModule, setSelectedModule] = useState(null)
    let handleOpenAddTransaction = ()=>{
        setSelectedModule("EXPENDITURE")
    }
    let handleClose = ()=>{
        setSelectedModule(null)
    }
    let getSelectedModuleDialog = (ref: "EXPENDITURE"|"INCOME"|null)=>{
        switch(ref){
            case "EXPENDITURE":
                return <AddExpenditure handleClose={handleClose}/>;
            case "INCOME":
                return <AddIncome handleClose={handleClose}/>
        }
    }
  return (
    <div onDoubleClick={handleOpenAddTransaction}>
        <Dialog open={selectedModule}>
            <DialogContent>
                {getSelectedModuleDialog(selectedModule)}
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddTransaction