import { Stack, Typography, FormControl, FormLabel, TextField, Select, MenuItem, Button, Chip } from '@mui/material'

import {  useContext, useState } from 'react'
import { savingsQuotes } from '../../variables/Variables'

import { capitalize } from '../../commonMethods/adapters'
import { Context, ContextType } from '../../Context'
import { Transactions } from '../../types/types'
import { addTransaction } from '../../commonMethods/fetchMethods'
import moment from 'moment'

const AddExpenditure = ({ handleClose }) => {
      let {store, updateContextStore, refreshContextStore } = useContext(Context) as ContextType ;
    
    const [expenditure, setExpenditure] = useState<Transactions>({
        amount: 0,
        name: "",
        createdDate: new Date(),
        budgetCategory:"1",
        userId: 0,
        module:"EXPRNDITURE",
        transactionType:"DEBIT",
        spendSource:"CASH"
    })
    let handleOnChange = (event) => {
        let value = event.target.value;
        setExpenditure(prev => {
            return {
                ...prev,
                [event.target.name]: value
            }
        })
    }
    let todaysQuote = savingsQuotes[(new Date()).getDate()]
    let handleAddTransaction = async () => {
        
        await addTransaction(expenditure)
        refreshContextStore("transactions")
        handleClose()
    }
    let budgetCategories = store.budgets.activeBudget[0]?.budgetCategories??[];

    let paymentType = [{
        title:"Cash",
        value:"CASH"
    },
    {
        title:"Credit",
        value:"LOAN"
    }
]  
 let handleUpdatePaymentSource = (val)=>{

    setExpenditure(prev=>({
        ...prev,
        spendSource:val
    }))
}
    return (

        <Stack spacing={"1.2rem"}>
            <Stack justifyContent={'center'} alignItems={'center'}>
                {/* <img src={'/savings-pig.svg'} width={'20%'}  /> */}

                <Typography variant='caption' textAlign={"center"} marginTop={'.5rem'}>
                    <span style={{
                        padding: "1rem"
                    }}>

                        {todaysQuote}
                    </span>
                </Typography>
            </Stack>
            <FormControl>
                <FormLabel>
                    Description
                </FormLabel>
                <TextField size={"small"} name='name' onChange={handleOnChange} value={expenditure.name} />
            </FormControl>
            <FormControl>
                    <FormLabel>
                        Category
                    </FormLabel>
                    <Select size='small' name='budgetCategory' value={expenditure.budgetCategory} onChange={handleOnChange}>
                        {budgetCategories.map((i) => {
                            return <MenuItem value={i.id}>
                                {capitalize(i.name,"FIRST LETTER OF ALL")}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            <FormControl>
                <FormLabel>
                    Amount
                </FormLabel>
                <TextField size={"small"} name='amount' onChange={handleOnChange} value={expenditure.amount} />
            </FormControl>
            <Stack direction={"row"} gap={1} padding={'1rem 0'}>
               {
                paymentType.map((i)=>{
                    return <>
                    <Chip sx={{padding:"1rem"}} label={i.title} clickable variant={expenditure.spendSource == i.value ? "filled":"outlined"} onClick={()=>handleUpdatePaymentSource(i.value)} />
                    </>
                })
               }
            </Stack>
            <div style={{
                display: 'grid',
                gridTemplateColumns: "1fr",
                columnGap: '1rem',
                flexDirection: "column"
            }}>

              
                <FormControl>
                    <FormLabel>
                        Date
                    </FormLabel>
                   
                    <TextField size={"small"}  value={expenditure.createdDate} name='createdDate' onChange={handleOnChange} type='date' />
                </FormControl>
            </div>
            <Button onClick={handleAddTransaction} variant="contained" sx={{ backgroundColor: 'black' }}>
                Add
            </Button>
        </Stack>

    )
}


export default AddExpenditure