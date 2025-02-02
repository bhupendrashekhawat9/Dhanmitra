import { Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context, ContextType } from '../../../Context'
import { ExpenditureType } from '../../../types/Expenditure'
import BudgetSummary from './BudgetSummary'
import BudgetDetails from './BudgetDetails'
import { ExpandCircleDown, ExpandMore } from '@mui/icons-material'

const Budget = () => {
        let date = new Date()
        let { store } = useContext(Context) as ContextType

        const [expandBudget, setExpandBudget] = useState(false);
  return (
    <div>
           <Stack boxShadow={"var(--box-shadow)"} borderRadius={'1rem'} padding={'1rem'} sx={{maxWidth:"80rem"}}>
            
                <Typography variant='h6' fontWeight={600} padding={'.5rem'}>
                    Budget
                </Typography>
                <Stack >
                    {
                         <Stack direction={"row"} justifyContent={"space-between"}>
                        <BudgetSummary/>
                        </Stack>
                    }
                   
                    
                    
                </Stack>
            </Stack>

    </div>
  )
}

export default Budget
