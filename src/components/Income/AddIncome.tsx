import { Button, FormControl, FormLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { AddIncomePayloadType } from '../../types/Income'
import { months } from '../../variables/dropdowns'
import { incomeQuotes } from '../../variables/Variables'
import { addData } from '../../indexDB/database'


const AddIncome = ({handleClose}) => {
    const [income, setIncome] = useState<AddIncomePayloadType>({
        amount: "0",
        source: "",
        createdDate: new Date(),
        month: (new Date).getMonth(),
        year: (new Date).getFullYear(),
        userId:0

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

    let handleAddSavings =  async()=>{
       addData(income,'Incomes')
       handleClose()
    }
    return (

        <Stack spacing={"1rem"}>
            <Stack justifyContent={'center'} alignItems={'center'}>
            {/* <img src={'/savings-pig.svg'} width={'20%'}  /> */}

            <Typography  variant='caption' textAlign={"center"} marginTop={'.5rem'}>
                <span style={{
                     padding:"1rem"
                }}>

                {todaysQuote}
                </span>
            </Typography>
            </Stack>
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
                        Source
                    </FormLabel>
                    <TextField name={"source"} value={income.source} onChange={handleOnChange}/>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Month
                    </FormLabel>
                    <Select name='month' value={income.month} onChange={handleOnChange}>
                        {Object.keys(months).map((i) => {
                            return <MenuItem value={months[i]}>
                                {i}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <Button onClick={handleAddSavings} variant="contained" sx={{backgroundColor:'black'}}>
                Add Income
                </Button>
        </Stack>

    )
}

export default AddIncome