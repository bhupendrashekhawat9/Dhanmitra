import { useContext, useEffect, useState } from 'react'
import KPICard from '../../../customComponents/KPICard'
import { Stack, Typography } from '@mui/material'
import { toLocal } from '../../../methods/adapters'
import { Context, ContextType } from '../../../Context'
import "./index.css"
import { getExpenditureOnCredits, getTotalExpenditure, getTodaysExpenditure, getExpenditureLimit } from '../controller/controllers'
const KPIs = () => {
    const date = new Date().getDate()

    const [expenditureData, setExpenditureData] = useState({
        totalExpenditure: 0,
        currentMonthExpenditure: 0,
        todaysExpenditure: 0,
        expenditureOnCredit:0
    })
    const { store } = useContext(Context) as ContextType;


    // let totalExpenditure = toLocal(expenditureData.totalExpenditure,'currency') as string
    const todaysExpenditure = toLocal(expenditureData.todaysExpenditure, 'currency') as string
    
 
    useEffect(() => {
        setExpenditureData((prev) => {
            return {
                ...prev,
                totalExpenditure: getTotalExpenditure(store.transactions),
                currentMonthExpenditure: getTotalExpenditure(store.transactions),
                todaysExpenditure: getTodaysExpenditure(store.transactions),
                expenditureOnCredit: getExpenditureOnCredits(store.transactions),
                currentMonthExpenditureLimit: getExpenditureLimit(store.budgets.activeBudget)
            }
            })
    }, [store])

    const totalExpenditure = expenditureData.totalExpenditure
    const avgDailyExpenditure = toLocal((totalExpenditure / new Date().getDate()), "currency")
    const expenditureOnCredit = toLocal(expenditureData.expenditureOnCredit,'currency');
    const todaysExpLimit = toLocal(((expenditureData.currentMonthExpenditure - totalExpenditure) / (31 - date)), "number")

    const kpis = [
        {
            title: "Spent",
            value: todaysExpenditure,
            backgroundClr: "--clr-highlight-0",
            iconName: null
        },
        {
            title: "Todays Limit",
            value: todaysExpLimit,
            backgroundClr: "--color-100",
            iconName: null
        },
        {
            title: "Average Spend",
            value: avgDailyExpenditure,
            backgroundClr: "--color-100",
            iconName: null
        },
        {
            title: "Overdraft",
            value: expenditureOnCredit,
            backgroundClr: "--color-100",
            iconName: null
        },

    ]
    return (
        <div className='kpiContainer'>
            {
                kpis.map((kpi, index) => {
                    return <div key={index} style={{
                        background: `var(${kpi.backgroundClr})`
                    }} className='kpiContainer-element' id="ExpenditureKPI" >

                        <KPICard>
                            <Stack height={'100%'} direction={"column"} alignContent={"space-between"} justifyContent={"center"}>


                                <Typography fontSize={"1.1rem"} letterSpacing={"6%"} padding={"0 1rem"} fontWeight={600} textAlign={'start'}>
                                    {kpi.title}
                                </Typography>

                                <Typography textAlign={'start'} padding={"1rem"} fontSize={"2rem"} fontWeight={600}>
                                    {kpi.value}
                                </Typography>
                            </Stack>

                        </KPICard>
                    </div>
                })
            }



        </div>
    )
}

export default KPIs

