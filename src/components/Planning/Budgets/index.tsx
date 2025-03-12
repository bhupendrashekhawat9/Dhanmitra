import React, { useState } from "react";
import Layout from "../../Screens/Layout";
import { Box, Dialog, DialogContent, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { useContextv2 } from "../../../Context";
import { toLocal } from "../../../methods/adapters";
import BudgetDetails from "../../Home/Budget/BudgetDetails";
import { Delete, Edit } from "@mui/icons-material";
import { deleteData } from "../../../indexDB/database";
import { BudgetsType } from "../../../types/Budgets";
import BudgetForm from "./BudgetForm"

interface BudgetFormDialogProps{
    data:BudgetsType,
    open:boolean,
    handleClose:()=> void
}
const BudgetFormDialog = ({data,open,handleClose} : BudgetFormDialogProps)=>{
    return <Dialog open={open} onClose={handleClose} onClick={e=> e.stopPropagation()}>
        <DialogContent>
            <BudgetForm data={data} scenario="UPDATE" handleClose={handleClose}/>
        </DialogContent>
    </Dialog>
}
const Budget = ({budget})=>{
    const {methods} = useContextv2()
    const [expandBudget, setExpandBudget] = useState(false)
    const [openUpdateBudget, setOpenUpdateBudget] = useState(false)
    const deleteBudget = async (id)=>{
        await deleteData(budget.id, "budgets")
        methods.fetchAllBudgets()
    }
    const handleOpenUpdateBudget = (e)=>{
        e.stopPropagation()

        setOpenUpdateBudget(prev=> !prev);
    }
    let handleExpandBudget = (e)=>{
        e.stopPropagation()
        setExpandBudget(prev => !prev)
    }
    let handleCloseUpdate = (e)=>{
        handleOpenUpdateBudget(e)
    }
    let handleCloseUpdateForm = ()=>{
        setOpenUpdateBudget(false)
    }
    return (
        <Stack onClick={ handleExpandBudget} key={budget.name} padding={2} sx={{ border: '1px solid #ddd', borderRadius: 2 }} margin={".5%"} width={expandBudget ? "100%" : "48%"}>
          <BudgetFormDialog open={openUpdateBudget} data={budget} handleClose={handleCloseUpdateForm} />
                      <Stack direction={"column"}>
                <Stack direction={'row'} justifyContent={"space-between"}>

            <Typography variant="h6">{budget.name}</Typography>
            <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={()=> deleteBudget(budget.id)}>
                    <Delete />
                </IconButton>
                <IconButton onClick={handleOpenUpdateBudget}>
                    <Edit />
                </IconButton>
            </Box>
                  </Stack>

                <Stack direction="column" justifyContent="space-between">
                    <Typography>Budget:</Typography>
                    <Typography>{toLocal(budget.amount, "currency")}</Typography>
                </Stack>
            </Stack>
           

            {
                expandBudget && <BudgetDetails budgetData={budget} />
            }

        </Stack>
    );
}

const Budgets = () => {
    const { store } = useContextv2();
    const activeBudgets = store.budgets.activeBudget
    const allBudgets = store.budgets.allBudgets

    return (
        <Layout>
            <div className="container" style={{
                padding:"1rem 2rem"
            }}>

            <Typography variant="h4">
                Budgets
            </Typography>
            
            <Stack >
                <Typography margin={"2rem 0 .5rem 0"} variant="h6">
                    Active Budgets
                </Typography>
                <Stack direction={'row'} flexWrap={"wrap"}  >

              {
                  activeBudgets.map((budget) => {
                      return <Budget key={budget.id} budget={budget} />
                    })
                }
                </Stack>
              
            </Stack>

            <Stack >
                <Typography margin={"2rem 0 .5rem 0"} variant="h6">
                    All Budgets
                </Typography>
                <Stack direction={'row'} flexWrap={"wrap"}  >

              {
                  allBudgets.map((budget) => {
                      return <Budget key={budget.id} budget={budget} />
                    })
                }
                </Stack>
              
            </Stack>
                    </div>
        </Layout>
    );
};

export default Budgets;
