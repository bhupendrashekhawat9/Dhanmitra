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


const ExpenditureExtendedKPI = (refresh) => {

    const [allExpenditures, setAllExpenditures] = useState([])

    let getAllExpenditures = async () => {

        let data: ExpenditureType[] = await getAllData("Expenditures") as ExpenditureType[]
        let date = new Date();
        let currentYear = date.getFullYear();

        let groupedMontlyExpense = new Map();
        data.forEach((i: ExpenditureType) => {
            if (i.year == currentYear) {

                groupedMontlyExpense.set(i.month, groupedMontlyExpense.get(i.month) + parseInt(i.amount))
            }

        })

        setAllExpenditures(data)

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
            {
                allExpenditures.map((i: ExpenditureType) => {
                    return <>
                        <TransactionCard>
                        <div style={{
                            display:'grid',
                            gridTemplateColumns:"1fr  1fr"
                        }}>
                            <Stack>

                                <Typography> 
                                    {i.name}
                                </Typography>

                                <Typography textAlign={"start"} variant='caption' color='var(--caption-color)'>
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