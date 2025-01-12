import { Button, ButtonBase, Dialog, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AllSegmentationDataType, IncomeSegrigationProps, SegrigationDataType } from '../../../types/Income'
import ExtendedIncomeDetails from './ExtendedIncomeDetails'
import { Context } from '../../../Context'
import { getRupeeSymbol, toLocal } from '../../../commonMethods/adapters'
import "./index.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addData, deleteData, getAllData, getData, updateData } from '../../../indexDB/database'
import { red } from '@mui/material/colors'
const IncomeDivision = (props: IncomeSegrigationProps) => {
  // const { applicationData, setApplicationData } = useContext(Context)

  const [allIncomeSegrigationsnData, setAllIncomeSegrigationsData] = useState<SegrigationDataType[] | null>([])
  const [currentEditable, setCurrentEditable] = useState<SegrigationDataType[]>([])
const [editable, setEditable] = useState(false)

  const handleChange = (event,id)=>{
      let name :string[]= event.target.name.split(".");
      let value = event.target.value
      
      let data = currentEditable.map((row:SegrigationDataType)=>{
          if(row.id == id){
              name.reduce((prev,current,index)=>{
                if(index == name.length-1){
                    prev[current] = value
                }
                  return prev[current]
              },row)
              return row;
          }
          return row;
      })
      setCurrentEditable(data)

  }
  const fetchAllIncomeSegrigations = async() => {
    
      let response:SegrigationDataType[]|null = await getAllData("Incomes.Segregation") as SegrigationDataType[]|null;
      // let defaultData:SegrigationDataType[] = response.filter((i)=> i.segrigationName == "Default") as SegrigationDataType[]
      console.log(response)
      setAllIncomeSegrigationsData(response??[])
      setCurrentEditable(response??[])
  }
  let addNewSegment = () => {
    let id = currentEditable.length;
    let newRow:SegrigationDataType = {
      id,
      name: "",
      isFixedCost: false,
      minAllocation: {
        type: "AMOUNT",
        value: "0"
      },
      maxAllocation: {
        type: "PERCENTAGE",
        value: "0"
      }
    }
    setCurrentEditable(prev=>([newRow,...prev]))
  }
  let handleDelete = (id:number)=>{
    setCurrentEditable(prev=>prev.filter((i)=> i.id != id) )
    deleteData(id,"Incomes.Segregation")
  }
  let totalIncome = 36000;


  let totalMinAmount: number = currentEditable.reduce((prev: number, current: SegrigationDataType) => {
    if (current.minAllocation.type === "AMOUNT") {
      return prev + parseFloat(current.minAllocation.value); // Corrected to parseFloat for numeric value
    } else {
      return prev + (parseFloat(current.minAllocation.value) / 100) * totalIncome; // Corrected parsing and calculation
    }
  }, 0);
  
  let totalMaxAmount: number = currentEditable.reduce((prev: number, current: SegrigationDataType) => {
    if (current.maxAllocation.type === "AMOUNT") {
      return prev + parseFloat(current.maxAllocation.value); // Corrected to parseFloat for numeric value
    } else {
      return prev + (parseFloat(current.maxAllocation.value) / 100) * totalIncome; // Corrected parsing and calculation
    }
  }, 0);
let isMinAllocationExceeding = totalMinAmount > totalIncome;
let isMaxAllocationExceeding = totalMaxAmount > totalIncome; 
  let createSegrigationRows = (data: SegrigationDataType[]) => {
    return data.map((i, index) => {
      let minAllocationValue = i.minAllocation.type == "AMOUNT" ? toLocal(i.minAllocation.value, 'currency') : `${i.minAllocation.value}%`;
      let maxAllocationValue = i.maxAllocation.type == "AMOUNT" ? toLocal(i.maxAllocation.value, 'currency') : `${i.maxAllocation.value}%`;

      return <tr key={index} style={{
        padding:"2rem 0",
        
      }}>

        <td  >
         {editable ? <Stack direction={"row"} alignItems={"center"}>
         
          <IconButton sx={{backgroundColor:""}} onClick={()=>handleDelete(i.id)}>

          <DeleteIcon fontSize='small'sx={{color:red[900]}}/>
          </IconButton>
         <TextField  variant="standard" size='small'  name='name' value={i.name} onChange={(event)=>handleChange(event,i.id)} />
         </Stack> :<Typography>
            {i.name}
          </Typography>}
        </td>
        <td >
        {editable ? <>
         <TextField error={isMinAllocationExceeding} variant="standard" size='small' name='minAllocation.value' value={i.minAllocation.value} onChange={(event)=>handleChange(event,i.id)} 
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="start">

                <IconButton sx={{fontSize:'1rem'}} onClick={()=>{
                  handleChange({target:{name: "minAllocation.type",value:i.minAllocation.type == "AMOUNT"?"PERCENTAGE":"AMOUNT"}},i.id)
                }}>
                  {i.minAllocation.type == "PERCENTAGE" ? "%" : getRupeeSymbol()}
                </IconButton>
              </InputAdornment>
            },
          }}
         
         />
        
         </> :<Typography>
            {minAllocationValue}
          </Typography>}
          
        </td>
        <td >
        {editable ? <>
         <TextField error={isMaxAllocationExceeding} variant="standard" size='small' name='maxAllocation.value' value={i.maxAllocation.value} onChange={(event)=>handleChange(event,i.id)}   slotProps={{
            input: {
              endAdornment: <InputAdornment position="start">

                <IconButton sx={{fontSize:'1rem'}} onClick={()=>{
                  handleChange({target:{name: "maxAllocation.type",value:i.maxAllocation.type == "AMOUNT"?"PERCENTAGE":"AMOUNT"}},i.id)
                }}>
                  {i.maxAllocation.type == "PERCENTAGE" ? "%" : getRupeeSymbol()}
                </IconButton>
              </InputAdornment>
            },
          }} />
         </> :<Typography>
         {maxAllocationValue}
          </Typography>}
         
        </td>
        <td >
        
         
        </td>
      </tr>
    })
  }
  let toggleEdit = ()=>{
    setEditable(prev=> !prev);
  }
  let handleSubmit = ()=>{
    toggleEdit()
    currentEditable.forEach((i)=>{
      updateData("Incomes.Segregation",i)
    })
  }
useEffect(()=>{
  fetchAllIncomeSegrigations()
},[])
  return (
    <div className='Income-Segrigation_Container' >
      <Stack>
<Stack direction={"row"} justifyContent={'center'} alignItems={"center"}>

      <Typography fontWeight={600}>
        Income Division
      </Typography>
        {
          !editable?<>
           <IconButton sx={{width:"max-content",marginLeft:"auto"}} onClick={toggleEdit}><EditIcon/></IconButton>
          
          </>:<Stack direction={'row'} justifyContent={'end'}>
          <Button sx={{width:"max-content",marginLeft:"auto"}} onClick={addNewSegment}>Add+</Button>
          <Button sx={{width:"max-content",marginLeft:".5rem"}} onClick={handleSubmit}>Done</Button>

          </Stack>
        }
</Stack>

       {currentEditable.length >0 && <table className='segrigation-table' style={{fontWeight:600,color:"black"}} >
          <thead>

            <tr>

              <td width={"50%"}>

              </td>
              <td width={"25%"}>
                Min
              </td>
              <td width={"25%"}>

                Max
              </td>
            </tr>
          </thead>

          <tbody style={{
            rowGap:"1rem"
          }}>

            {
              createSegrigationRows(currentEditable)
            }
           { <tr>
             <td>
                <Typography fontWeight={600}> Total</Typography>
              </td>
              <td>
                <Typography> {toLocal(totalMinAmount,'currency')}</Typography>
              </td>
              <td>
                <Typography> {toLocal(totalMaxAmount,"currency")}</Typography>
              </td>
              <td></td>
            </tr>}
          </tbody>
        </table>}
          {
            currentEditable?.length==0 && <>
            <Typography sx={{
              textAlign:'center',
              fontWeight:'600',
              color:"black"
            }}>
              Click on Add button to create income distibution
            </Typography>
            </>
          }
      </Stack>
    </div>
  )
}

export default IncomeDivision