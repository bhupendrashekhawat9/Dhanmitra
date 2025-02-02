import { Box, Button, Checkbox, FormControl, FormLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { incomeQuotes } from '../../variables/Variables'
import { Transactions } from '../../types/types'
import { addIncomeType, addTransaction } from '../../commonMethods/fetchMethods'
import { IncomeType } from '../../types/Income'


const AddIncome = ({ handleClose }) => {
    const [income, setIncome] = useState({
        name: "",
        createdDate: new Date(),
        budgetCategory: "",
        amount: 0,
        transactionType: "CREDIT",
        module: "INCOME",
        userId: 0,
        startDate: new Date(),
        endDate: null,
        autoCarry: false,
        transferTo: "",
        transferToType: "ASSETS"
    })
    let handleOnChange = (event) => {

        setIncome(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    let todaysQuote = incomeQuotes[(new Date()).getDate()]

    let handleAddIncome = async () => {
        let transaction: Transactions = {
            name: income.name,
            createdDate: income.createdDate,
            budgetCategory: income.budgetCategory,
            amount: income.amount,
            transactionType: 'CREDIT',
            module: 'INCOME',
            userId: 0
        }
        let incomeType: IncomeType = {
            createDate: income.createdDate,
            amount: income.amount,
            name: income.name,
            startDate: income.startDate,
            endDate: income.endDate,
            autoCarry: income.autoCarry,
            transferTo: income.transferTo,
            transferToType: income.transferToType
        }
        addTransaction(transaction)
        addIncomeType(incomeType);
        handleClose()
    }
    let allocateOptions = [{
        title: "Assets",
        value: "ASSETS"
    },
    {
        value: "BUDGET",
        title: "Budget"
    }
    ]
    let transferToOptions = [
        {
            id: 0,
            name: "Savings",
        },
        {
            id: 2,
            name: "FD",
        },
    ]
    return (

        <Stack spacing={"1rem"}>
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
                    Name
                </FormLabel>

                <TextField name='name' onChange={handleOnChange} value={income.name} />
            </FormControl>
            <FormControl>
                <FormLabel>
                    Amount
                </FormLabel>
                <TextField name='amount' onChange={handleOnChange} value={income.amount} />
            </FormControl>
            <div style={{
                display: 'grid',
                gridTemplateColumns: "1fr 1fr",
                columnGap: '1rem'
            }}>

                <FormControl>
                    <FormLabel>
                        Date
                    </FormLabel>


                    <TextField value={income.createdDate} name='createdDate' onChange={handleOnChange} type='date' />

                </FormControl>
            </div>
            <Stack>

                <FormControl>
                    <FormLabel>
                        <Typography variant='caption'>

                            Would you like to allocate this amount to any category?
                        </Typography>
                    </FormLabel>
                    <Select name='transferToType' onChange={handleOnChange} value={income.transferToType} >
                        {
                            allocateOptions.map((i) => {
                                return <MenuItem value={i.value}>
                                    {i.title}
                                </MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        <Typography variant='caption'>

                            Transfer To
                        </Typography>
                    </FormLabel>
                    <Select name='transferTo' onChange={handleOnChange} value={income.transferTo} >
                        {
                            transferToOptions.map((i) => {
                                return <MenuItem value={i.id}>
                                    {i.name}
                                </MenuItem>

                            })
                        }
                    </Select>
                </FormControl>
            </Stack>

            <Stack direction={'column'} padding={'1rem 0 1rem 0'}>
                <Stack direction={"row"}>
                    <Checkbox checked={income.autoCarry} onChange={(e) => {
                        setIncome(prev => ({
                            ...prev,
                            autoCarry: e.target.checked
                        }))
                    }} />
                    <div>

                        <Typography>
                            Recurring
                        </Typography>
                        <Typography variant='caption'>
                            Carry forword automatically
                        </Typography>
                    </div>

                </Stack>


                {
                    income.autoCarry && (
                        <>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: "1fr 1fr",
                                columnGap: '1rem',
                                marginTop: "2rem",
                                width: "100%"
                            }}>

                                <FormControl>
                                    <FormLabel>
                                        From
                                    </FormLabel>


                                    <TextField defaultValue={income.startDate} value={income.startDate} name='createdDate' onChange={handleOnChange} type='date' />

                                </FormControl>
                                <FormControl>
                                    <FormLabel>
                                        To
                                    </FormLabel>


                                    <TextField value={income.endDate} name='createdDate' onChange={handleOnChange} type='date' />

                                </FormControl>
                            </div>

                        </>

                    )
                }


            </Stack>
            <Box>
                <Typography variant='caption' padding={"0 0 0 0"} >
                    Note: This amount will be transfered to savings
                </Typography>
            </Box>
            <Button onClick={handleAddIncome} variant="contained" sx={{ backgroundColor: 'black' }}>
                Add Income
            </Button>
        </Stack>

    )
}

export default AddIncome