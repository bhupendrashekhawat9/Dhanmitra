import { Stack, Typography, FormControl, FormLabel, TextField, Select, MenuItem, Button } from '@mui/material'

import React, { useState } from 'react'
import { addData } from '../../indexDB/database'
import { AddSavingsPayloadType } from '../../types/Savings'
import { savingsQuotes } from '../../variables/Variables'
import { months } from '../../variables/dropdowns'
import { AddExpenditurePayloadType } from '../../types/Expenditure'

const AddExpenditure = ({handleClose}) => {
  const [expenditure, setExpenditure] = useState<AddExpenditurePayloadType>({
      amount: 0,
      name:"",
      createdDate: new Date(),
      month: (new Date).getMonth(),
      year: (new Date).getFullYear(),
      userId:0

  })
  let handleOnChange = (event) => {

      setExpenditure(prev => {
          return {
              ...prev,
              [event.target.name]: event.target.value
          }
      })
  }
  let todaysQuote = savingsQuotes[(new Date()).getDate()]

  let handleAddSavings =  async()=>{
     addData(expenditure,"Expenditures")
     handleClose()
  }
  return (

      <Stack spacing={"1rem"}>
          <Stack justifyContent={'center'} alignItems={'center'}>
          <img src={'/savings-pig.svg'} width={'20%'}  />

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
                  Description
              </FormLabel>
              <TextField name='name' onChange={handleOnChange} value={expenditure.name} />
          </FormControl>
          <FormControl>
              <FormLabel>
                  Amount
              </FormLabel>
              <TextField name='amount' onChange={handleOnChange} value={expenditure.amount} />
          </FormControl>
          <div style={{
              display: 'grid',
              gridTemplateColumns: "1fr",
              columnGap: '1rem'
          }}>
            
              <FormControl>
                  <FormLabel>
                      Month
                  </FormLabel>
                  <Select name='month' value={expenditure.month} onChange={handleOnChange}>
                      {Object.keys(months).map((i) => {
                          return <MenuItem value={months[i]}>
                              {i}
                          </MenuItem>
                      })}
                  </Select>
              </FormControl>
          </div>
          <Button onClick={handleAddSavings} variant="contained" sx={{backgroundColor:'black'}}>
              Add
              </Button>
      </Stack>

  )
}


export default AddExpenditure