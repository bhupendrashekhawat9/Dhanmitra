import { Box, Dialog, DialogContent, IconButton, Stack, Typography } from "@mui/material"
import Card from "../../customComponents/Card"
import AddIncome from "./AddIncome"
import { useState } from "react"
import { Add } from "@mui/icons-material"
import { ContextType, useContextv2 } from "../../Context"
import Layout from "../Screens/Layout"
import { IncomeType } from "../../types/Income"
import { toLocal } from "../../methods/adapters"

interface IncomeContext {
  seggrigationData: unknown
}
const Incomes = () => {
  let { store, updateContextStore } = useContextv2() as ContextType
  return (
    <div>
      <Layout>

        <Stack sx={{
          padding: '1rem 1rem'
        }}>
          <Typography variant="h4" fontWeight={600}>
            Incomes
          </Typography>
        </Stack>
        <Stack>

          {/* <IncomeKPI /> */}
        </Stack>
        <Stack alignItems={'start'} marginTop={'1rem'}>
          <CurrentMonthIncomeSummary />
          <IncomeTypes />
        </Stack>
      </Layout>

    </div>
  )
}

export default Incomes


export const CurrentMonthIncomeSummary = () => {
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false)
  const { store } = useContextv2() as ContextType
  let incomeTypes: IncomeType[] = store.incomes
  let currentMonthIncomeTypes = incomeTypes.map((i) => ({ value: i.amount, title: i.name }))
  let currentMonthIncome = incomeTypes.reduce((acc, next) => acc += parseInt(next.amount), 0);
  let handleCloseAddIncome = () => {
    setIsAddIncomeOpen(false)
  }
  return <>
    <Dialog open={isAddIncomeOpen} onClose={handleCloseAddIncome}>
      <DialogContent>

        <AddIncome />
      </DialogContent>
    </Dialog>
    <Card sx={{
      maxWidth: "50rem",
      minWidth: "50rem"
    }}>
      <>

        <Stack direction={'row'} justifyContent={"space-between"}>
          <Stack>

            <Typography>
              Total income for January
            </Typography>
            <Typography fontWeight={800} sx={{
              fontSize: "2rem",
              marginTop: ".6rem"
            }}>
              {toLocal(currentMonthIncome, "currency")}
            </Typography>
          </Stack>
          <Stack>
            <IconButton onClick={() => {
              setIsAddIncomeOpen(true)
            }}>

              <Add />
            </IconButton>

          </Stack>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          marginTop: "2rem",
          rowGap: "1rem"
        }}>
          {
            currentMonthIncomeTypes.map((income) => {
              return <Stack >
                <Typography >
                  {income.title}
                </Typography>
                <Typography fontWeight={'600'} fontSize={"1.2rem"} marginTop={".2rem"}>
                  {toLocal(income.value, "currency")}
                </Typography>
              </Stack>
            })
          }
        </div>
      </>
    </Card>
  </>
}
export const IncomeTypes = () => {
  const { store } = useContextv2() as ContextType
  console.log(store.incomes)
  let incomeCategories = store.incomes.reduce((acc, next) => {
    if (next.autoCarry) {

      return [...acc, {
        type: "Recurring",
        title: next.name,
        value: next.amount
      }]
    }
    return acc
  }, [])
  let groupedCategories = incomeCategories._groupBy("type")
  return <Box sx={{
    marginTop: "2.5rem",
  }}>
    {
      Object.keys(groupedCategories)?.map((i, index) => {
        return <Stack>
          <Typography fontWeight={600} padding={'0 0 0 .5rem'} marginBottom={".5rem"}>
            {i}
          </Typography>
          <Stack direction={'row'} spacing={".5rem"}>

            {
              groupedCategories[i]?.map((income, index) => {
                return <Card>
                  <Stack >
                    <Typography >
                      {income.title}
                    </Typography>
                    <Typography fontWeight={'600'} fontSize={"1.2rem"} marginTop={".2rem"}>
                      {toLocal(income.value, "currency")}
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