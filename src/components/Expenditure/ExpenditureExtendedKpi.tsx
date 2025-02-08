import { useContext } from 'react'
import { Stack, Typography } from '@mui/material';


import { Context, ContextType } from '../../Context';


const ExpenditureExtendedKPI = (refresh) => {
    let date = new Date()
    let { store } = useContext(Context) as ContextType
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

               
                </Stack>
            </Stack>

            {/* <Charts data={dailyExpenditureChartData} type={'bar'} /> */}
          
        </div>
    )
}

export default ExpenditureExtendedKPI