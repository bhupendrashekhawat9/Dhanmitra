import React, { useEffect, useState } from 'react'
import { toLocal } from '../../commonMethods/adapters'
import { Stack, Typography } from '@mui/material'
import { IncomeType } from '../../types/Income'
import { getAllData } from '../../indexDB/database'
import { SectionTypes } from '../../types/types'

interface IncomeKPIPropsType {
  onClick: (ref: "INCOME") => void,
  refresh: SectionTypes[]
}
const IncomeKPI = (props: IncomeKPIPropsType) => {
  let { refresh } = props

  const [income, setIncome] = useState({
    totalIncome: 0,
    month: (new Date()).getMonth(),
  })

  let incomeAmount = toLocal(income.totalIncome, 'currency')

  let getAllIncomeData = async () => {
    let data: IncomeType[] = await getAllData("Incomes") as IncomeType[]
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
    if (!refresh[0] || refresh.includes("INCOME"))
      getAllIncomeData()
  }, [refresh])
  return (
    <Stack direction={'column'} height={'100%'}>
      <Typography fontWeight={600} variant='h6' textAlign={'center'}>

        Income
      </Typography>
      <Stack direction={'column'} padding={'0rem 1rem'} height={"100%"} justifyContent={'center'} alignItems={'center'}>
        <Typography variant='h4' fontWeight={600} textAlign={'center'}>{incomeAmount}</Typography>
        <div style={{
          height: '2px',
          border: "1px solid black",
          width: '100%',
          margin: '.5rem'
        }}></div>
        <Typography variant='h6' fontWeight={600} textAlign={'center'}>{1} source</Typography>

        <Typography variant='caption'>
          Set a goal to add 1 more source of income
        </Typography>
      </Stack>
    </Stack>
  )
}

export default IncomeKPI