import { Box, Stack, Typography } from "@mui/material"
import IncomeKPI from "./IncomeKPI"
import ExtendedIncomeDetails from "./Income Seggrigation/ExtendedIncomeDetails"
import IncomeDivision from "./Income Seggrigation"

interface IncomeContext {
  seggrigationData:unknown
}
const Incomes = () => {
   
  return (
    <div>
<Stack sx={{

}}>

      <IncomeKPI/>
</Stack>
      <Stack alignItems={'start'} marginTop={'1rem'}>
        <Box padding={'0 1rem'} >

    
        </Box>
    <IncomeDivision/>
      </Stack>
    </div>
  )
}

export default Incomes