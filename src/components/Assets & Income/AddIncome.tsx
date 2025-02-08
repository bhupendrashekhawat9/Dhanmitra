import { Box, Button, Checkbox, FormControl, FormLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { incomeQuotes } from '../../variables/Variables'
import { Transactions } from '../../types/types'
import { addIncomeType, addTransaction } from '../../methods/fetchMethods'
import { IncomeType } from '../../types/Income'
import { useNavigate } from 'react-router'
import { ContextType, useContextv2 } from '../../Context'
import { v4 } from 'uuid'
import { capitalize, getFormatedAmountToNumber, toLocal } from '../../methods/adapters'
let transferToTypes = [
    {
        title:"Assets",
        value:"ASSETS"
    },
    {
        title:"Budget",
        value: "BUDGET"
    }
]
let transferToCategories =[
    {
        id:1,
        title:"Food",
        
    }
]

const AddIncome = ({handleClose}) => {
    let navigate = useNavigate()
    let {store,methods} = useContextv2() as ContextType;
    const [income, setIncome] = useState<IncomeType>({
        id: v4(),
        name: "",
        createdDate: new Date().toISOString().split("T")[0],
        amount: "0",
        transactionType: "CREDIT",
        module: "INCOME",
        userId: store.userData.id,
        startDate: new Date().toISOString().split("T")[0],
        endDate: null,
        recurring: false,
        recurringType: "MONTHLY",
        transferTo: "",
        transferToType: ""
        // transferToTypeId:""
    })

    let handleOnChange = (event) => {
        let {name,value} = event.target;
        
        switch(name){
            case "name":
                value = capitalize(value);
            break;
            case "amount":
               let tVal =  value.replace(/[^0-9.]/g, "")
                value = toLocal(tVal,"currency")
            default:
                null
        }
        setIncome(prev => {
            return {
                ...prev,
                [name]: (value)
            }
        })
    }
    let todaysQuote = incomeQuotes[(new Date()).getDate()]

    let handleAddIncome = async () => {
        let payload: IncomeType = {
           ...income,
           amount: getFormatedAmountToNumber(income.amount)
        }
     
    
        addIncomeType(payload);
        methods.fetchAllIncomes()
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
    let recurringTypeOptions = [
        {
            title: "Monthly",
            value: "MONTHLY"
        },
        {
            title: "Yearly",
            value: "YEARLY"
        },
        {
            title: "Daily",
            value: "DAILY"
        }
    ];
    
    let getRecurringMessage = (type, createdDate) => {
        const date = new Date(createdDate);
        
        switch (type) {
            case "MONTHLY":
                date.setMonth(date.getMonth() + 1);
                return `This income will be credited every month. Next on ${date.toDateString()}.`;
            case "YEARLY":
                date.setFullYear(date.getFullYear() + 1);
                return `This income will be credited every year. Next on ${date.toDateString()}.`;
            case "DAILY":
                date.setDate(date.getDate() + 1);
                return `This income will be credited daily. Next on ${date.toDateString()}.`;
            default:
                return "";
        }
    };
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
                <TextField type='text'  name='amount' onChange={handleOnChange} value={(income.amount)} />
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
            {/* <Stack>

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
            </Stack> */}

            <Stack direction={'column'} padding={'1rem 0 1rem 0'}>
                <Stack direction={"row"} spacing={1}>

                    <Stack direction={"row"} minWidth={"50%"} alignItems={"center"}>
                        <Checkbox checked={income.recurring} onChange={(e) => {
                            setIncome(prev => ({
                                ...prev,
                                recurring: e.target.checked
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
                   {income.recurring && <FormControl fullWidth>
                        <FormLabel>
                            <Typography >

                               Recurring Type
                            </Typography>
                        </FormLabel>
                        <Select name='transferToType' onChange={handleOnChange} value={income.transferToType} >
                            {
                                recurringTypeOptions.map((i) => {
                                    return <MenuItem value={i.value}>
                                        {i.title}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>}
                </Stack>

                {
                    income.recurring && (
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
                <Typography>
                    
                </Typography>
                <Typography variant='caption' fontWeight={"600"} padding={"0 0 0 0"} >
                    Note: {getRecurringMessage(income.transferToType,income.createdDate)}
                </Typography>
            </Box>
            <Button onClick={handleAddIncome} variant="contained" sx={{ backgroundColor: 'black' }}>
                Add Income
            </Button>
        </Stack>

    )
}

export default AddIncome