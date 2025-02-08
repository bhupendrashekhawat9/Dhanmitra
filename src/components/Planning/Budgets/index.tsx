import React, { useState } from "react";
import AddBudget from "./AddBudget";
import Layout from "../../Screens/Layout";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useContextv2 } from "../../../Context";
import moment from "moment";
import { toLocal } from "../../../methods/adapters";
import BudgetDetails from "../../Home/Budget/BudgetDetails";

const Budget = () => {
    const [open, setOpen] = useState(false);
    const { store } = useContextv2();
    const [expandBudget, setExpandBudget] = useState(null)
    let activeBudgets = store.budgets.activeBudget

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Layout>
            <div className="container" style={{
                padding:"1rem 2rem"
            }}>

            <Typography variant="h4">
                Budgets
            </Typography>
            <Stack direction={'row'} flexWrap={"wrap"} spacing={1} >
                {activeBudgets.map((budget) => {
                    return (
                        <Stack onClick={() => setExpandBudget(prev => prev==budget.id?null:budget.id)} key={budget.name} spacing={2} padding={2} sx={{ border: '1px solid #ddd', borderRadius: 2 }} minWidth={'max-content'} width={expandBudget ? "100%" : ""}>
                            <Typography variant="h6">{budget.name}</Typography>


                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Budget:</Typography>
                                <Typography>{toLocal(budget.amount, "currency")}</Typography>
                            </Stack>

                            {
                                expandBudget == budget.id && <BudgetDetails budgetData={budget} />
                            }

                        </Stack>
                    );
                })}
                <div onClick={() => setOpen(true)} style={{
                    width: "6rem", height: "6rem"
                }} className="addItemContainer">

                </div>
            </Stack>

            <AddBudget open={open} handleClose={handleClose} />
                    </div>
        </Layout>
    );
};

export default Budget;
