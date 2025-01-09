import { useEffect, useState } from 'react'
import { getAllData } from '../../indexDB/database';
import { EmiType } from '../../types/Emi';
import { ExpenditureType } from '../../types/Expenditure';
import TransactionCard from '../../customComponents/TransactionCard';
import { Stack, Typography } from '@mui/material';
import { months, monthsToWeigth } from '../../variables/dropdowns';
import { toLocal } from '../../commonMethods/adapters';
import moment from 'moment';
import { red } from '@mui/material/colors';
import Charts from '../Charts';


const ExpenditureExtendedKPI = (refresh) => {

    const [allExpenditures, setAllExpenditures] = useState([])
    const [dailyExpenditureChartData, setDailyExpenditureChartData] = useState([{
        name: 'Expense',
        data: [ ]
      }])
      let createDailyExpenditureChartData = (data:Map<number,number>)=>{
        let days = 31;
        let values = [];
        for(let i =1;i<=days;i++){
            if(data.get(i)){
                values.push(data.get(i))
            }else{
                values.push(0);
            }
        }
        let updatedData = dailyExpenditureChartData[0]
        updatedData.data = values
        setDailyExpenditureChartData(prev=> [updatedData])
    }
    let getAllExpenditures = async () => {

        let data: ExpenditureType[] = await getAllData("Expenditures") as ExpenditureType[]
        let date = new Date();
        let currentYear = date.getFullYear();

        let expenditureGroupedByday = new Map();
        let groupedMontlyExpense = new Map();
        data.forEach((i: ExpenditureType) => {
            if (i.year == currentYear) {
                if(i.month == date.getMonth()){
                    let currentDate = new Date(i.createdDate).getDate()
                    expenditureGroupedByday.set(currentDate, (expenditureGroupedByday.get(currentDate)??0)+parseInt(i.amount))
                }
                groupedMontlyExpense.set(i.month, groupedMontlyExpense.get(i.month) + parseInt(i.amount))
            }

        })
        createDailyExpenditureChartData(expenditureGroupedByday)
        setAllExpenditures([...data].sort((a,b)=> new Date(b.createdDate).getMilliseconds() - new Date(a.createdDate).getMilliseconds() ))
    }
    
    useEffect(() => {

        if (refresh) {
            getAllExpenditures()
        }
    }, [refresh])

    return (
        <div style={{
            padding: ".5rem"
        }}>
            <Charts data={dailyExpenditureChartData} />
            {
                allExpenditures.map((i: ExpenditureType) => {
                    return <>
                        <TransactionCard>
                        <div style={{
                            display:'grid',
                            gridTemplateColumns:"1fr  1fr"
                        }}>
                            <Stack sx={{overflow:"hidden",textOverflow:"ellipsis"}}>

                                <Typography> 
                                    {i.name}
                                </Typography>

                                <Typography textAlign={"start"} variant='caption' >
                                    {`${moment(i.createdDate).format("DD MMM YYYY")}`}
                                </Typography>
                            </Stack>

                                <Stack>

                                <Typography marginLeft={"auto"}>
                                    {toLocal(i.amount,'currency')}
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
        </div>
    )
}

export default ExpenditureExtendedKPI