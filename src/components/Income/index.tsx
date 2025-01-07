import { Stack } from "@mui/material"
import IncomeKPI from "./IncomeKPI"

interface IncomeContext {
  seggrigationData:unknown
}
const Incomes = () => {
   
  return (
    <div>

      <IncomeKPI/>
      <Stack>

      </Stack>
    </div>
  )
}

export default Incomes