import { useContext, useEffect, useMemo, useState } from 'react'
import KPICard from '../../../customComponents/KPICard'
import { Stack, Typography } from '@mui/material'
import { toLocal } from '../../../methods/adapters'
import { Context, ContextType } from '../../../Context'
import "./index.css"
import { getExpenditureOnCredits, getTotalExpenditure, getTodaysExpenditure,  getBudgetExpenditureLimit } from '../controller/controllers'
import moment from 'moment'
import { BudgetsType } from '../../../types/Budgets'
import Information from '../../Expenditure/Informations/Information'

interface props {
    activeBudget: BudgetsType|undefined
}
const KPIs = ({activeBudget}: props) => {
    const date = new Date().getDate()

    const [expenditureData, setExpenditureData] = useState({
        totalExpenditure: 0,
        currentMonthExpenditure: 0,
        todaysExpenditure: 0,
        expenditureOnCredit:0,
        currentBudgetExpenditureLimit:0
    })
    const { store } = useContext(Context) as ContextType;
    let transactions = useMemo(()=> {
        return store.transactions.filter((i)=> i.budgetId == activeBudget?.id)
    },[activeBudget,store])

    // let totalExpenditure = toLocal(expenditureData.totalExpenditure,'currency') as string
    const todaysExpenditure = toLocal(expenditureData.todaysExpenditure, 'currency') as string
    
 
    useEffect(() => {
        
        setExpenditureData((prev) => {
            return {
                ...prev,
                totalExpenditure: getTotalExpenditure(transactions),
                currentMonthExpenditure: getTotalExpenditure(transactions),
                todaysExpenditure: getTodaysExpenditure(transactions),
                expenditureOnCredit: getExpenditureOnCredits(transactions),
                currentBudgetExpenditureLimit: getBudgetExpenditureLimit(activeBudget)
            }
            })
        }, [activeBudget,store])


    let validDays = moment(activeBudget?.endDate).diff(activeBudget?.startDate,"days")
    let completedDays = moment().diff(activeBudget?.startDate,"days")
    const totalExpenditure = expenditureData.totalExpenditure
    const avgDailyExpenditure = toLocal((totalExpenditure / new Date().getDate()), "currency")
    const expenditureOnCredit = toLocal(expenditureData.expenditureOnCredit,'currency');
    const todaysExpLimit = toLocal(((expenditureData.currentBudgetExpenditureLimit - totalExpenditure) / validDays - completedDays), "number")

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
        <>
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
         <Information data={{dayLimit:((expenditureData.currentBudgetExpenditureLimit - totalExpenditure) / validDays - completedDays),daySpent:expenditureData.todaysExpenditure}} />
         </>

    )
}

export default KPIs

