import { Dialog, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import AddExpenditure from '../Expenditure/AddExpenditure'
import AddIncome from '../Assets & Income/AddIncome'
interface addTransactionProps {
    open: boolean;
    handleClose: ()=> void
}
const AddTransaction = (props: addTransactionProps) => {
    let handleClose = ()=>{
        props.handleClose()
    }

  return (
    
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogContent>
                <>
                <AddExpenditure handleClose={handleClose}/>
                </>
            </DialogContent>
        </Dialog>
  )
}

export default AddTransaction