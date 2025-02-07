import React, { useState } from 'react';
import { ContextType, useContextv2 } from '../../../Context';
import { Stack, Typography, LinearProgress } from '@mui/material';
import { toLocal } from '../../../methods/adapters';
import BudgetDetails from './BudgetDetails';

const BudgetSummary = () => {
  let { store } = useContextv2() as ContextType;
  const [expandBudget, setExpandBudget] = useState(null)
  let budgets = store.budgets.activeBudget;
  let transactions = store.transactions;
  let budgetGroupedTxn = transactions._groupBy("budgetId");
  

  return (
    <>
      {budgets.map((budget) => {
        console.log(budget)
        let totalExpenditures = budgetGroupedTxn[budget.id]?.reduce((accu, next) => {
          if(next.transactionType == "DEBIT" ){
            return accu + parseInt(next.amount)
          }
          return accu
        }, 0);
        const spentPercentage = Math.min((totalExpenditures / parseInt(budget.amount)) * 100, 100); // Ensures max 100%
        return (
          <Stack onClick={()=> setExpandBudget(prev=> prev == budget.id ? null : budget.id)} key={budget.name} spacing={2} padding={2} sx={{ border: '1px solid #ddd', borderRadius: 2 }} minWidth={'20rem'} width={"100%"}>
            <Typography variant="h6">{budget.name}</Typography>
            
            <Stack direction="row" justifyContent="space-between">
              <Typography>Spent:</Typography>
              <Typography>{toLocal(totalExpenditures, "currency")}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Budget:</Typography>
              <Typography>{toLocal(budget.amount, "currency")}</Typography>
            </Stack>

            <LinearProgress 
              variant="determinate" 
              value={spentPercentage} 
              sx={{ height: 8, borderRadius: 1 }} 
              color={spentPercentage >= 100 ? "error" : "primary"}
            />
            
            <Typography variant="body2" textAlign="right">
              {spentPercentage.toFixed(2)}% used
            </Typography>
          {
            expandBudget === budget.id && <BudgetDetails budgetData={budget}/>
          }
            
          </Stack>
        );
      })}
    </>
  );
};

export default BudgetSummary;
