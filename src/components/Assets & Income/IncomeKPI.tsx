import { useContext, useEffect, useState } from 'react'
import { toLocal } from '../../commonMethods/adapters'
import { Stack, Typography } from '@mui/material'
import { IncomeType } from '../../types/Income'
import { getAllData } from '../../indexDB/database'
import { SectionTypes } from '../../types/types'
import { Context, ContextType } from '../../Context'
import KPICard from '../../customComponents/KPICard'
import { monthsToWeigth } from '../../variables/dropdowns'

const IncomeKPI = () => {

  let { store } = useContext(Context) as ContextType
  const [income, setIncome] = useState({
    totalIncome: 0,
    month: (new Date()).getMonth(),
  })

  let incomeAmount = toLocal(income.totalIncome, 'currency') as string;

  let getAllIncomeData = async () => {
    let data: IncomeType[] = store.incomes.allTransactions
    let totalIncome = 0
    let date = new Date()
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    data.forEach((i: IncomeType) => {
      if (currentMonth == i.month && i.year == currentYear) {
        totalIncome += parseInt(i.amount);
      }
    })
    setIncome((prev) => ({
      ...prev,
      totalIncome
    }))
  }
  useEffect(() => {
    getAllIncomeData()
  }, [store])
let currentMonth = new Date().getMonth()
  return (
    <div className='kpiContainer'>

    <div className='kpiContainer-element' id="ExpenditureKPI" >
      <KPICard>

        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} height={"100%"} >
          <Typography fontWeight={600} variant='h6' textAlign={'center'}>

            Income
          </Typography>
          <Typography textAlign={'center'}>
            for {monthsToWeigth[currentMonth]}
          </Typography>
          <Stack direction={'column'} padding={'0rem 1rem'} height={"100%"} justifyContent={'center'} alignItems={'center'}>
            <Typography variant='h4' fontWeight={600} textAlign={'center'}>{incomeAmount}</Typography>

          </Stack>
        </Stack>
      </KPICard>
    </div>
    </div>
  )
}

export default IncomeKPI