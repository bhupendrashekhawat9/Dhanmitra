import React, { useState } from "react";
import Layout from "../../Screens/Layout";
import { Box, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { useContextv2 } from "../../../Context";
import { toLocal } from "../../../methods/adapters";
import BudgetDetails from "../../Home/Budget/BudgetDetails";
import { Delete } from "@mui/icons-material";
import { deleteData } from "../../../indexDB/database";

const Budget = ({budget})=>{
    const {refreshContextStore,methods} = useContextv2()
    const [expandBudget, setExpandBudget] = useState(null)
    const deleteBudget = async (id)=>{
        await deleteData(budget.id, "budgets")
        methods.fetchAllBudgets()
    }
    return (
        <Stack onClick={() => setExpandBudget(prev => prev==budget.id?null:budget.id)} key={budget.name} padding={2} sx={{ border: '1px solid #ddd', borderRadius: 2 }} margin={".5%"} width={expandBudget ? "100%" : "48%"}>
            <Stack direction={"column"}>
                <Stack direction={'row'} justifyContent={"space-between"}>

            <Typography variant="h6">{budget.name}</Typography>
            <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={()=> deleteBudget(budget.id)}>
                    <Delete />
                </IconButton>
            </Box>
                  </Stack>

                <Stack direction="column" justifyContent="space-between">
                    <Typography>Budget:</Typography>
                    <Typography>{toLocal(budget.amount, "currency")}</Typography>
                </Stack>
            </Stack>
           

            {
                expandBudget == budget.id && <BudgetDetails budgetData={budget} />
            }

        </Stack>
    );
}

const Budgets = () => {
    const { store } = useContextv2();
    const activeBudgets = store.budgets.activeBudget
    return (
        <Layout>
            <div className="container" style={{
                padding:"1rem 2rem"
            }}>

            <Typography variant="h4">
                Budgets
            </Typography>
            <Stack direction={'row'} flexWrap={"wrap"}  marginTop={'2rem'}>
              {
                   activeBudgets.map((budget) => {
                    return <Budget key={budget.id} budget={budget} />
                   })
              }
              
            </Stack>
                    </div>
        </Layout>
    );
};

export default Budgets;
