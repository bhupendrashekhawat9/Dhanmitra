import { useContext, useEffect, useState } from 'react'
import KPICard from '../../../customComponents/KPICard'
import { Stack, Typography } from '@mui/material'
import { toLocal } from '../../../methods/adapters'
import { Context, ContextType } from '../../../Context'
import "./index.css"
import moment from 'moment'
import { Transactions } from '../../../types/types'
const KPIs = () => {
    let date = new Date().getDate()

    const [expenditureData, setexpenditureData] = useState({
        totalExpenditure: 0,
        currentMonthExpenditure: 0,
        todaysExpenditure: 0,
        expenditureOnCredit:0
    })
    let { store } = useContext(Context) as ContextType;


    const [currentMonthExpenditureLimit, setcurrentMonthExpenditureLimit] = useState(0)

    // let totalExpenditure = toLocal(expenditureData.totalExpenditure,'currency') as string
    let todaysExpenditure = toLocal(expenditureData.todaysExpenditure, 'currency') as string
    
    let getExpenditureLimit = () => {
        let budget = store.budgets.activeBudget.reduce((acc, next) => acc += parseInt(next.amount), 0);
        setcurrentMonthExpenditureLimit(budget)

    }
    let getTodaysExpenditure = () => {
        
        let data = store.transactions.filter((i) =>{
            
            if(new Date().toDateString() == new Date(i.createdDate).toDateString() && i.transactionType == "DEBIT"){
                return true
            }
            return false

        })
        setexpenditureData((prev) => {
            return {
                ...prev,
                todaysExpenditure: data.reduce((acc, next) => acc += parseInt(next.amount), 0)
            }
        })
    }
    let getTotalExpenditure = (data:Transactions[])=>{
        let totalExpenditure = data.reduce((acc,next)=> {
            if(next.transactionType == "DEBIT"){
                return acc+=parseInt(next.amount)
            }
            return acc;
        },0);
        setexpenditureData((prev)=>{
            return {
                ...prev,
                totalExpenditure 
            }
        })
    }
    let getExpenditureOnCredits = (data: Transactions[])=>{
        let filteredData = data.filter((i)=> i.spendSource == "LOAN")
        setexpenditureData((prev) => {
            return {
                ...prev,
                expenditureOnCredit: filteredData.reduce((acc, next) => acc += parseInt(next.amount), 0)
            }
        })
    }
    useEffect(() => {
        getExpenditureOnCredits(store.transactions)
        getTotalExpenditure(store.transactions)
        getTodaysExpenditure()
        getExpenditureLimit()
    }, [store])

    let totalExpenditure = expenditureData.totalExpenditure
    let avgDailyExpenditure = toLocal((totalExpenditure / new Date().getDate()), "currency")
    let expenditureOnCredit = toLocal(expenditureData.expenditureOnCredit,'currency');
    let todaysExpLimit = toLocal(((currentMonthExpenditureLimit - totalExpenditure) / (31 - date)), "number")

    let kpis = [
        {
            title: "Spent",
            value: todaysExpenditure,
            backgroundClr: "--clr-highlight-0",
            iconName: null
        },
        {
            title: "Todays Limit",
            value: todaysExpLimit,
            backgroundClr: "--clr-1",
            iconName: null
        },
        {
            title: "Average Spend",
            value: avgDailyExpenditure,
            backgroundClr: "--clr-1",
            iconName: null
        },
        {
            title: "Overdraft",
            value: expenditureOnCredit,
            backgroundClr: "--clr-1",
            iconName: null
        },

    ]
    return (
        <div className='kpiContainer'>
            {/* <div className='kpiContainer-element' id="ExpenditureKPI" >

                <KPICard>
                    <ExpenditureKPI />
                </KPICard>
            </div> */}
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

                                <Typography textAlign={'start'} padding={"1rem"} fontSize={"40px"} fontWeight={600}>
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

