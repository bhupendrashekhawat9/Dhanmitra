import { Button, FormControl, FormLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { AddSavingsPayloadType } from '../../types/Savings'
import { months } from '../../variables/dropdowns'
import { useStaticVariable } from '../../hooks/StaticVariable'
import { AddEmiPayloadType, EmiType } from '../../types/Emi'
import { addData } from '../../indexDB/database'
import { capitalize } from '../../commonMethods/adapters'

let GridDiv = styled.div`
display:grid;
gri-template-layout: 1fr 1fr
`
let durationType = ["Month","Year","Day"];
let installmentType = ["Monthly","Yearly","Daily"];
const AddEMI = ({handleClose}) => {
    const [emi, setEmi] = useState<AddEmiPayloadType>({
        createdDate: new Date(),
        installmentAmount: 0,
        installmentType: "YEARLY",
        duration: 0,
        durationType: "MONTH",
        endDate: new Date(),
        loanName: '',
        userId:0,
        loanAmount:0
    })
    let handleOnChange = (event)=>{
        setEmi(prev=>{
            return {
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }
    let handleAddEmi = async()=>{
        await addData(emi,"EMIs")
        handleClose()
    }
    let installmentTypes = ["Daily","Monthly","Yearly"]
    let durationTypes = ["DAY","MONTH","YEAR"]
    let handleChangeInstallmentType = ()=>{
        let index = installmentTypes.findIndex(i=> i.toLowerCase() == emi.installmentType.toLowerCase())
        let newIndex = index+1;
        if(newIndex>= installmentTypes.length){
            newIndex = 0;
        }
        setEmi((prev)=>({
            ...prev,
            installmentType: installmentTypes[newIndex].toUpperCase()
        }))
    }
    let todaysQuote = ""
    type AddEmiPayloadType = {
        installmentType: "DAILY" | "MONTHLY" | "YEARLY";
      };
      
      const getPaidInstallments = (endDate: Date, installmentType: AddEmiPayloadType["installmentType"]) => {
        const todaysDate = new Date();
      
        // Calculate the total completed days
        const completedDays = Math.floor((endDate.getTime()-todaysDate.getTime() ) / (1000 * 60 * 60 * 24));
      
        let completedInstallments = 0;
      
        switch (installmentType) {
          case "DAILY":
            completedInstallments = completedDays; // 1 installment per day
            break;
      
          case "MONTHLY":
            const monthsDifference =
              todaysDate.getFullYear() * 12 +
              todaysDate.getMonth() -
              (endDate.getFullYear() * 12 + endDate.getMonth());
            completedInstallments = monthsDifference > 0 ? monthsDifference : 0;
            break;
      
          case "YEARLY":
            const yearsDifference =  endDate.getFullYear()-todaysDate.getFullYear();
            completedInstallments = yearsDifference > 0 ? yearsDifference : 0;
            break;
      
          default:
            throw new Error("Invalid installment type");
        }
        console.log(completedInstallments,emi)
        return completedInstallments;
      };
      
    let paidAmount = getPaidInstallments(new Date(emi.endDate), emi.installmentType)*emi.installmentAmount
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
            Loan Name
        </FormLabel>
        <TextField type="text" name='loanName' onChange={handleOnChange} value={emi.loanName} />
    </FormControl>
    <FormControl>
        <FormLabel>
            Loan Amount
        </FormLabel>
        <TextField  type='number' name='loanAmount' onChange={handleOnChange} value={emi.loanAmount} />
    </FormControl>
    <FormControl>
        <FormLabel>
           Loan End Date
        </FormLabel>
        <TextField name='endDate' type="date" onChange={handleOnChange} value={emi.endDate} />
    </FormControl>
    <div style={{
        display: 'grid',
        gridTemplateColumns: "3fr 1fr",
        columnGap: '1rem'
    }}>
    <FormControl>
        <FormLabel>
            Installment Amount
        </FormLabel>
        <TextField  name='installmentAmount' onChange={handleOnChange} value={emi.installmentAmount} />
    </FormControl>
    <Stack justifyContent={"end"} alignItems={"center"} >
         
         <Button sx={{textTransform:"capitalize",  width:"100%",backgroundColor:"black", marginBottom:"3%"}} variant='contained' onClick={handleChangeInstallmentType}>
             {capitalize(emi.installmentType)}
         </Button>
     </Stack>
    </div>
 
        <Stack direction={"row"} justifyContent={'space-between'}>
            <Typography>
                Paid Amount
            </Typography>
            <Typography fontWeight={600}>
                {paidAmount}
            </Typography>
        </Stack>

    <Button onClick={handleAddEmi} variant="contained" sx={{backgroundColor:'black'}}>
        Add EMI
        </Button>
</Stack>
    
  )
}

export default AddEMI