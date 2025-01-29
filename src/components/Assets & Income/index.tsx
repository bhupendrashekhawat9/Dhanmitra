import { Box, Button, Dialog, DialogContent, IconButton, Stack, TableBody, Typography } from "@mui/material"
import IncomeKPI from "./IncomeKPI"
import IncomeDivision from "../Planning/Plans/Income Seggrigation"
import Card from "../../customComponents/Card"
import AddIncome from "./AddIncome"
import { useState } from "react"

interface IncomeContext {
  seggrigationData: unknown
}
const Incomes = () => {

  return (
    <div>
      <Stack sx={{
        padding:'3rem 1rem'
      }}>
        <Typography variant="h4" fontWeight={600}>
          Incomes
        </Typography>
      </Stack>
      <Stack>

        {/* <IncomeKPI /> */}
      </Stack>
      <Stack alignItems={'start'} marginTop={'1rem'}>
       <CurrentMonthIncomeSummary/>
       <IncomeTypes/>
      </Stack>
    </div>
  )
}

export default Incomes


export const CurrentMonthIncomeSummary = ()=>{
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false)
  let currentMOnthIncomeTypes = [
    {
      title:"Salary",
      value: "$37,000"
    },
    {
      title:"Trading",
      value: "$35,000"
    },
    
  ]
  let currentMonthIncome = "$72,000";
  let handleCloseAddIncome =()=>{
    setIsAddIncomeOpen(false)
  }
  return <>
  <Dialog open={isAddIncomeOpen}>
  <DialogContent>

  <AddIncome handleClose={handleCloseAddIncome}/>
  </DialogContent>
  </Dialog>
    <Card sx={{
      maxWidth:"50rem",
      minWidth:"50rem"
    }}>
      <>

      <Stack direction={'row'} justifyContent={"space-between"}>
        <Stack>

        <Typography>
          Total income for January
        </Typography>
        <Typography fontWeight={800} sx={{
          fontSize:"2rem",
          marginTop:".6rem"
        }}>
          {currentMonthIncome}
        </Typography>
        </Stack>
<Stack>
  <Button onClick={()=>{
    setIsAddIncomeOpen(true)
  }}>

  <Typography>

  Update
  </Typography>
  </Button>
  
</Stack>
      </Stack>
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",
        marginTop:"2rem",
        rowGap:"1rem"
      }}>
{
  currentMOnthIncomeTypes.map((income)=>{
    return <Stack >
    <Typography >
    {income.title}
    </Typography>
    <Typography fontWeight={'600'} fontSize={"1.2rem"} marginTop={".2rem"}>
    {income.value}
    </Typography>
    </Stack>
  })
}
      </div>
      </>
    </Card>
  </>
}
export const IncomeTypes = ()=>{
let incomeCategories = [{
  type:"Recurring",
  title:"Salary",
  value: "$37,000"
},
{
  type:"Recurring",
  title:"Salary",
  value: "$37,000"
}
]
let groupedCategories = incomeCategories._groupBy("type")
console.log(groupedCategories)
return <Box sx={{
  marginTop:"2.5rem",
}}>
  {
    Object.keys(groupedCategories)?.map((i,index)=>{
     return <Stack>
        <Typography fontWeight={600} padding={'0 0 0 .5rem'} marginBottom={".5rem"}>
          {i}
        </Typography>
        <Stack direction={'row'} spacing={".5rem"}>

        {
          groupedCategories[i]?.map((income,index)=>{
            return <Card>
              <Stack >
                <Typography >
                  {income.title}
                </Typography>
                <Typography fontWeight={'600'} fontSize={"1.2rem"} marginTop={".2rem"}>
                  {income.value}
                </Typography>
              </Stack>
            </Card>
          })
        }
        </Stack>
      </Stack>
    })
  }
</Box>
}