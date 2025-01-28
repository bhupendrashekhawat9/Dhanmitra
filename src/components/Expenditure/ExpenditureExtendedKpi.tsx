import { useContext, useEffect, useState } from 'react'
import { getAllData } from '../../indexDB/database';
import { EmiType } from '../../types/Emi';
import { ExpenditureType } from '../../types/Expenditure';
import TransactionCard from '../../customComponents/TransactionCard';
import { Chip, Stack, Typography } from '@mui/material';
import { months, monthsToWeigth } from '../../variables/dropdowns';
import { toLocal } from '../../commonMethods/adapters';
import moment from 'moment';
import { red } from '@mui/material/colors';
import Charts from '../Charts';
import { SegrigationDataType } from '../../types/Income';
import PieChart from '../Charts/pieChart';
import { Context, ContextType } from '../../Context';
import CategoryExpenditure from '../Charts/pieChart';


const ExpenditureExtendedKPI = (refresh) => {
    let date = new Date()
    let { store } = useContext(Context) as ContextType
    const [allExpenditures, setAllExpenditures] = useState([])
    const [dailyExpenditureChartData, setDailyExpenditureChartData] = useState([{
        name: 'Expense',
        data: []
    }])
    const [monthlyExpenditureDivision, setMonthlyExpenditureDivision] = useState<{ label: string; value: number; target: number, minValue: number, maxValue: number }[]>([])
    let createDailyExpenditureChartData = (data: Map<number, number>) => {
        let days = 31;
        let values = [];
        for (let i = 1; i <= days; i++) {
            if (data.get(i)) {
                values.push(data.get(i))
            } else {
                values.push(0);
            }
        }
        let updatedData = dailyExpenditureChartData[0]
        updatedData.data = values
        setDailyExpenditureChartData(prev => [updatedData])
    }
    let getDivisionMinAndMaxAllocatedAmount = (data: SegrigationDataType, income: number) => {

        let values = {
            minValue: parseInt(data.minAllocation.value) ?? 0,
            maxValue: parseInt(data.maxAllocation.value) ?? 0
        }
        if (data.minAllocation.type == "PERCENTAGE") {
            values.minValue = Math.ceil(parseInt(data.minAllocation.value) / 100) * income
        }
        if (data.maxAllocation.type == "PERCENTAGE") {
            // console.log(,"Math.ceil(parseInt(data.maxAllocation.value)/100) *income")
            values.maxValue = parseInt(data.maxAllocation.value) / 100 * income
        }
        return values
    }
    let createMonthlyExpenditureDivisionData = async (data: ExpenditureType[]) => {

        let divisionAllocatedAmount = new Map<string, { minValue: number, maxValue: number }>();
        let expenditureByDivision = new Map<string, number>();
        let allDivisons = store.incomes.segregations;
        // calculate total current month income
        let currentMonthIncome = store.incomes.allTransactions.reduce((acc, curr) => {
            if (date.getMonth() == curr.month && date.getFullYear() == curr.year) {
                return acc + parseInt(curr.amount)
            }
        }, 0);
        // group all incurred expenditures by division for current month
        data.forEach((i) => {
            expenditureByDivision.set(i.category, (expenditureByDivision.get(i.category) ?? 0) + parseInt(i.amount));
        })
        // group income division with min and max allocations
        allDivisons.forEach((i) => {
            divisionAllocatedAmount.set(i.name, (getDivisionMinAndMaxAllocatedAmount(i, currentMonthIncome)));
        })
        // group all data with division names
        let labels = Array.from(divisionAllocatedAmount.keys()).filter((i) => !i.toLowerCase().includes("saving"));
        let divisionGroupedData = []
        labels.forEach((i) => {
            divisionGroupedData.push({
                label: i,
                ...divisionAllocatedAmount.get(i) ?? 0,
                value: expenditureByDivision.get(i) ?? 0
            })
        })
        setMonthlyExpenditureDivision(divisionGroupedData)

    }
    let getAllExpenditures = async () => {

        let data: ExpenditureType[] = await getAllData("Expenditures") as ExpenditureType[]
        let date = new Date();
        let currentYear = date.getFullYear();

        let expenditureGroupedByday = new Map();
        let groupedMontlyExpense = new Map();
        let currentMonthExpenditures: ExpenditureType[] = []
        data.forEach((i: ExpenditureType) => {
            if (i.year == currentYear) {
                if (i.month == date.getMonth()) {
                    currentMonthExpenditures.push(i)
                    let currentDate = new Date(i.createdDate).getDate()
                    expenditureGroupedByday.set(currentDate, (expenditureGroupedByday.get(currentDate) ?? 0) + parseInt(i.amount))
                }
                groupedMontlyExpense.set(i.month, groupedMontlyExpense.get(i.month) + parseInt(i.amount))
            }

        })
        createMonthlyExpenditureDivisionData(currentMonthExpenditures)
        createDailyExpenditureChartData(expenditureGroupedByday)
        setAllExpenditures([...data].sort((a, b) => new Date(b.createdDate).getMilliseconds() - new Date(a.createdDate).getMilliseconds()))
    }

    useEffect(() => {

        if (refresh) {
            getAllExpenditures()
        }
    }, [refresh])
    console.log(monthlyExpenditureDivision)
    return (
        <div style={{

        }}>
            <Stack boxShadow={"var(--box-shadow)"} borderRadius={'1rem'} padding={'1rem'} sx={{maxWidth:"80rem"}}>
                <Typography variant='h6' fontWeight={600} padding={'.5rem'}>
                    Budget
                </Typography>
                <Stack sx={{
                    backgroundColor: "var(--clr-0-light)",
                    padding: "1rem 3rem",
                    borderRadius: "1rem",
                    marginTop:".5rem"
                }}>

                    <CategoryExpenditure data={monthlyExpenditureDivision} />
                </Stack>
            </Stack>

            {/* <Charts data={dailyExpenditureChartData} type={'bar'} /> */}
            <Stack sx={{maxWidth:"45rem"}} padding={'1rem'}>
                <Typography fontWeight={600} variant='h6' padding={'.5rem'}>
                    Transactions
                </Typography>
                {
                    allExpenditures.map((i: ExpenditureType) => {
                        return <>
                            <TransactionCard>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: ".5fr 1fr 1fr",
                                    padding: ".5rem",
                                    height: "max-content"
                                }}>
                                    <Stack>

                                    </Stack>
                                    <Stack sx={{ overflow: "hidden", textOverflow: "ellipsis"}}>

                                        <Typography >
                                            {i.name}
                                        </Typography>

                                        <Typography textAlign={"start"} variant='caption' >
                                            {`${moment(i.createdDate).format("DD MMM YYYY")}`}
                                        </Typography>
                                    </Stack>

                                    {/* <Typography variant='caption' >
                                {i.category}
                               </Typography> */}
                                    <Stack >
                                        <Typography marginLeft={"auto"}>
                                            {toLocal(i.amount, 'currency')}
                                        </Typography>
                                        <Typography marginLeft={"auto"} textAlign={"start"} variant='caption' color={red[700]}>
                                            {`Paid`}
                                        </Typography>
                                    </Stack>

                                </div>

                            </TransactionCard>
                        </>
                    })
                }
            </Stack>
        </div>
    )
}

export default ExpenditureExtendedKPI