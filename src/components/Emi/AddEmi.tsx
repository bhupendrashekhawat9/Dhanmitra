// import { Button, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material'
// import { useState } from 'react'
// import { addData } from '../../indexDB/database'
// import { capitalize, toLocal } from '../../commonMethods/adapters'
// import { AddEmiPayloadType } from '../../types/Emi'
// import moment from 'moment'
// export const getPaidInstallments = (endDate: Date, installmentType: AddEmiPayloadType["installmentType"]) => {
//     const todaysDate = new Date();
  
//     // Calculate the total completed days
//     const pendingDays = Math.floor((endDate.getTime()-todaysDate.getTime() ) / (1000 * 60 * 60 * 24));
  
//     let pendingInstallments = 0;
  
//     switch (installmentType) {
//       case "DAILY":
//         pendingInstallments = pendingDays; // 1 installment per day
//         break;
  
//       case "MONTHLY":
//        console.log( moment(endDate).diff(new Date()),"difference")
//         const monthsDifference =
//         pendingInstallments=  Math.floor(pendingDays/30)
//         break;
  
//       case "YEARLY":
//         const yearsDifference =  endDate.getFullYear()-todaysDate.getFullYear();
//         pendingInstallments = yearsDifference > 0 ? yearsDifference : 0;
//         break;
  
//       default:
//         throw new Error("Invalid installment type");
//     }
//     return pendingInstallments;
//   };
// const AddEMI = ({handleClose}) => {
//     const [emi, setEmi] = useState<AddEmiPayloadType>({
//         createdDate: new Date(),
//         installmentAmount: 0,
//         installmentType: "YEARLY",
//         duration: 0,
//         durationType: "MONTH",
//         endDate: new Date(),
//         loanName: '',
//         userId:0,
//         loanAmount:0
//     })
//     let handleOnChange = (event)=>{
//         setEmi(prev=>{
//             return {
//                 ...prev,
//                 [event.target.name]:event.target.value
//             }
//         })
//     }
//     let handleAddEmi = async()=>{
//         await addData(emi,"EMIs")
//         handleClose()
//     }
//     let installmentTypes = ["Daily","Monthly","Yearly"]
//     let handleChangeInstallmentType = ()=>{
//         let index = installmentTypes.findIndex(i=> i.toLowerCase() == emi.installmentType.toLowerCase())
//         let newIndex = index+1;
//         if(newIndex>= installmentTypes.length){
//             newIndex = 0;
//         }
//         setEmi((prev)=>({
//             ...prev,
//             installmentType: installmentTypes[newIndex].toUpperCase()
//         }))
//     }
//     let todaysQuote = ""
      
   
      
//     let pendingAmount = toLocal(getPaidInstallments(new Date(emi.endDate), emi.installmentType)*emi.installmentAmount,'currency')
//     let paidAmount = toLocal(emi.loanAmount-(getPaidInstallments(new Date(emi.endDate), emi.installmentType)*emi.installmentAmount),'currency')

//   return (
    
//     <Stack spacing={"1rem"}>
//     <Stack justifyContent={'center'} alignItems={'center'}>
//     {/* <img src={'/savings-pig.svg'} width={'20%'}  /> */}

//     <Typography  variant='caption' textAlign={"center"} marginTop={'.5rem'}>
//         <span style={{
//              padding:"1rem"
//         }}>

//         {todaysQuote}
//         </span>
//     </Typography>
//     </Stack>
//     <FormControl>
//         <FormLabel>
//             Loan Name
//         </FormLabel>
//         <TextField type="text" name='loanName' onChange={handleOnChange} value={emi.loanName} />
//     </FormControl>
//     <FormControl>
//         <FormLabel>
//             Loan Amount
//         </FormLabel>
//         <TextField  type='number' name='loanAmount' onChange={handleOnChange} value={emi.loanAmount} />
//     </FormControl>
//     <FormControl>
//         <FormLabel>
//            Loan End Date
//         </FormLabel>
//         <TextField name='endDate' type="date" onChange={handleOnChange} value={emi.endDate} />
//     </FormControl>
//     <div style={{
//         display: 'grid',
//         gridTemplateColumns: "3fr 1fr",
//         columnGap: '1rem'
//     }}>
//     <FormControl>
//         <FormLabel>
//             Installment Amount
//         </FormLabel>
//         <TextField  name='installmentAmount' onChange={handleOnChange} value={emi.installmentAmount} />
//     </FormControl>
//     <Stack justifyContent={"end"} alignItems={"center"} >
         
//          <Button sx={{textTransform:"capitalize",  width:"100%",backgroundColor:"black", marginBottom:"3%"}} variant='contained' onClick={handleChangeInstallmentType}>
//              {capitalize(emi.installmentType)}
//          </Button>
//      </Stack>
//     </div>
 
//         <Stack direction={"row"} justifyContent={'space-between'}>
//             <Typography>
//                 Pending Amount
//             </Typography>
//             <Typography fontWeight={600}>
//                 {pendingAmount}
//             </Typography>
//         </Stack>
//         <Stack direction={"row"} justifyContent={'space-between'}>
//             <Typography>
//                 Paid Amount
//             </Typography>
//             <Typography fontWeight={600}>
//                 {paidAmount}
//             </Typography>
//         </Stack>

//     <button className='button' onClick={handleAddEmi}>
//         Add EMI
//         </button>
// </Stack>
    
//   )
// }

// export default AddEMI


const AddEmi = () => {
  return (
    <div>AddEmi</div>
  )
}

export default AddEmi