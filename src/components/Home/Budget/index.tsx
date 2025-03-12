import { Button, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context, ContextType } from '../../../Context'
import { ExpenditureType } from '../../../types/Expenditure'
import BudgetSummary from './BudgetSummary'
import BudgetDetails from './BudgetDetails'
import { ArrowForward, ExpandCircleDown, ExpandMore, ViewAgenda, ViewInAr } from '@mui/icons-material'
import { useNavigate } from 'react-router'

const Budget = (budget) => {
        const date = new Date()
        const { store } = useContext(Context) as ContextType
        const navigate = useNavigate()
        
  return (
    <div>
           <Stack boxShadow={"var(--box-shadow)"} borderRadius={'1rem'} padding={'1rem'} sx={{maxWidth:"80rem"}}>
              <Stack direction={'row'} justifyContent={"space-between"}>
                
                {/* <Typography variant='h6' fontWeight={600} padding={'.5rem'}>
                    Budget
                </Typography> */}
                {/* <Button sx={{
                  textTransform:"capitalize"
                }} onClick={()=> navigate("/Budgets")}>

                <Stack gap={1} direction={'row'} >

                <Typography>
                    View All
                </Typography>
                  <ArrowForward/>
                </Stack>
                </Button> */}
              </Stack>
                <Stack gap={1}  >
                    {
                         
                       
               
                    }
                   
                    
                    
                </Stack>
            </Stack>

    </div>
  )
}

export default Budget
