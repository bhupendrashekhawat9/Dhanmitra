import { IconButton, Stack, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import moment from 'moment'
import { toLocal } from '../../methods/adapters'
import TransactionCard from '../../customComponents/TransactionCard'
import { ContextType, useContextv2 } from '../../Context'
import { Transactions as TransactionsType } from '../../types/types'
import { memo, useMemo, useState } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import { deleteData } from '../../indexDB/database'
import AddTransaction from './AddTransaction'

const Transactions = ({budget}) => {
let {store,methods} = useContextv2() as ContextType
const [expandedTransaction, setExpandedTransaction] = useState(null)
const [openEditTransaction, setOpenEditTransaction] = useState(false)
let transactions = useMemo(()=> {
    return store.transactions.filter((i)=> i.budgetId == budget?.id)
},[budget,store])
let sortedTransactions = useMemo(()=>{
        return transactions.sort((a,b)=> moment(new Date(b.createdDate)).diff(new Date(a.createdDate)))
},[transactions])


let deleteTransaction = async (id)=>{
 await deleteData(id,"transactions")
 methods.fetchAllTransactions()
}
let handleOpenEditTransaction = ()=>{
setOpenEditTransaction(prev => !prev)
}
let handleTransactionExpand = (transaction:TransactionsType)=>{
    let val = transaction;
    if(transaction.id == expandedTransaction?.id) val = null;
    setExpandedTransaction(val);
}
let handleCloseUpdate = ()=>{
    handleOpenEditTransaction()
    setExpandedTransaction(null)
}
  return (
      <Stack sx={{maxWidth:"45rem"}} padding={'1rem'}>
       {openEditTransaction && <AddTransaction open={openEditTransaction} data={expandedTransaction} handleClose={handleCloseUpdate}/>}
    <Typography fontWeight={600} variant='h6' padding={'.5rem'}>
        Transactions
    </Typography>
    {
        sortedTransactions.map((i: TransactionsType) => {
            return <>
                <TransactionCard >
                    <div onClick = {()=>handleTransactionExpand(i)} style={{
                        display: 'grid',
                        gridTemplateColumns: " 1fr 1fr",
                        padding: ".5rem",
                        height: "max-content"
                    }}>
                        {/* <Stack>

                        </Stack> */}
                        <Stack sx={{ overflow: "hidden", textOverflow: "ellipsis"}}>

                            <Typography >
                                {i.name}
                            </Typography>

                            <Typography textAlign={"start"} variant='caption' >
                                {`${moment(i.createdDate).format("DD MMM YYYY")}`}
                            </Typography>
                            
                        </Stack>

                     
                        <Stack alignContent={"end"}>
                            <Typography marginLeft={"auto"}>
                                {toLocal(i.amount, 'currency')}
                            </Typography>
                            <Typography marginLeft={"auto"} textAlign={"start"} variant='caption' color={i.transactionType =="CREDIT"?green[900] : red[700]}>
                                {i.transactionType == "CREDIT" ? "Received": "Paid"}
                            </Typography>
                            <Typography marginLeft={'auto'} variant='caption' >
                    {i.wallet}
                   </Typography>
                        </Stack>

                    </div>
                    {expandedTransaction?.id == i.id && 
                    <>
                        <div style={{
                            display:"flex",
                            justifyContent:"flex-end"
                        }}>
                            <IconButton onClick={handleOpenEditTransaction}> 
                            <Edit sx={{
                                color:"success"
                            }} />
                            </IconButton>
                            <IconButton onClick={()=> deleteTransaction(i)}> 
                            <Delete sx={{color:"danger"}}/>
                            </IconButton>
                        </div>
                    </>
                    }

                </TransactionCard>
            </>
        })
    }
</Stack>
  )
}

export default Transactions