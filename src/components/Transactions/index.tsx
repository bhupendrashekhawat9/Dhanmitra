import { Stack, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import moment from 'moment'
import { toLocal } from '../../methods/adapters'
import TransactionCard from '../../customComponents/TransactionCard'
import { ContextType, useContextv2 } from '../../Context'
import { Transactions as TransactionsType } from '../../types/types'
import { memo, useMemo } from 'react'

const Transactions = () => {
let {store} = useContextv2() as ContextType
    let allExpenditures = store.transactions
    let groupedTransactions = useMemo(()=>{
            return allExpenditures._groupBy("createdDate")
    },[allExpenditures])
    let sortedTransactions = useMemo(()=>{
        
        return allExpenditures.sort((a,b)=> moment(new Date(b.createdDate)).diff(new Date(a.createdDate)))
},[allExpenditures])
  return (
    <Stack sx={{maxWidth:"45rem"}} padding={'1rem'}>
    <Typography fontWeight={600} variant='h6' padding={'.5rem'}>
        Transactions
    </Typography>
    {
        sortedTransactions.map((i: TransactionsType) => {
            return <>
                <TransactionCard>
                    <div style={{
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

                </TransactionCard>
            </>
        })
    }
</Stack>
  )
}

export default Transactions