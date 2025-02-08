import {
    Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel,
    IconButton, InputAdornment, Stack, TextField,
    Typography
} from "@mui/material";
import { useState } from "react";
import { parse, v4 as uuid } from "uuid";
import { Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { getCurrentMonthEndDate, getCurrentMonthStartDate, getRupeeSymbol } from "../../../methods/adapters";
import { addData } from "../../../indexDB/database";
import moment from "moment";
import { BudgetsType } from "../../../types/Budgets";
import { ContextType, useContextv2 } from "../../../Context";

const AddBudget = ({ open, handleClose }) => {
    let {store,methods} = useContextv2() as ContextType
    const [budget, setBudget] = useState({
        name: "",
        amount: "",
        startDate: getCurrentMonthStartDate().toISOString().split("T")[0],
        endDate: getCurrentMonthEndDate().toISOString().split("T")[0],
        categories: [
    
        ],
    });

    // Handles main budget fields
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        
        setBudget((prev) => ({ ...prev, [name]: value }));
    };

    // Handles individual budget division changes
    const handleDivisionChange = (id, field, value) => {
        setBudget((prev) => ({
            ...prev,
            categories: prev.categories.map((division) =>
                division.id === id ? { ...division, [field]: value } : division
            ),
        }));
    };

    // Adds a new budget division
    const handleAddcategories = () => {
        setBudget((prev) => ({
            ...prev,
            categories: [
                ...prev.categories,
                { id: uuid(), name: "", amount: "", amountType: "AMOUNT" },
            ],
        }));
    };

    // Deletes a budget division
    const handleDelete = (id) => {
        setBudget((prev) => ({
            ...prev,
            categories: prev.categories.filter((division) => division.id !== id),
        }));
    };
    const handleSubmit = async ()=>{
        await addData(budget,"budgets")
        handleClose()
        methods.fetchAllBudgets()
    }
    let getCategoryAmt = (category: BudgetsType["categories"][0],budgetAmt: number)=>{
        if(category.amountType == "PERCENTAGE"){
            return budgetAmt*(parseInt(category.amount)/100)
        }
        return parseInt(category.amount)
    }
    const isCategoryAmtExceeding = parseInt(budget.amount) < budget.categories.reduce((prev,next)=> prev+ (getCategoryAmt(next,parseInt(budget.amount))),0);
      return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
                Add Budget
                <IconButton onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Budget Name</FormLabel>
                        <TextField size="small" name="name" value={budget.name} onChange={handleOnChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <TextField size="small" name="amount" value={budget.amount} onChange={handleOnChange} />
                    </FormControl>
                    <Stack direction="row" spacing={2}>
                        <FormControl fullWidth>
                            <FormLabel>Valid From</FormLabel>
                        
                            <TextField size="small" type="date" name="startDate" value={budget.startDate} onChange={handleOnChange} />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel>Valid Till</FormLabel>
                            <TextField size="small" type="date" name="endDate" value={budget.endDate} onChange={handleOnChange} />
                        </FormControl>
                    </Stack>

                    {/* Budget categories Section */}
                    <Stack justifyContent={"space-between"} alignItems={"center"} sx={{marginTop:"2rem"}} direction={"row"}>
                    <Typography color={red[900]} fontWeight={600}>
                        {isCategoryAmtExceeding && "Amount exceeding the budget"}
                    </Typography>
                    <Button variant="contained" size="small" sx={{ maxWidth: "max-content", marginLeft: "auto", backgroundColor: "var(--clr-0)" }} onClick={handleAddcategories}>
                        Add Categories
                    </Button>
                    </Stack>
                    <Stack spacing={2}>
                        {budget.categories.map((division) => (
                            <Stack key={division.id} direction="row" spacing={2} alignItems="center">
                                <TextField
                                error={isCategoryAmtExceeding}
                                    size="small"
                                    placeholder="Name"
                                    value={division.name}
                                    onChange={(e) => handleDivisionChange(division.id, "name", e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                error={isCategoryAmtExceeding}

                                    size="small"
                                    placeholder="Amount"
                                    value={division.amount}
                                    onChange={(e) => handleDivisionChange(division.id, "amount", e.target.value)}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    sx={{ fontSize: "1rem" }}
                                                    onClick={() =>
                                                        handleDivisionChange(
                                                            division.id,
                                                            "amountType",
                                                            division.amountType === "AMOUNT" ? "PERCENTAGE" : "AMOUNT"
                                                        )
                                                    }
                                                >
                                                    {division.amountType === "PERCENTAGE" ? "%" : getRupeeSymbol()}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <IconButton onClick={() => handleDelete(division.id)}>
                                    <DeleteIcon fontSize="small" sx={{ color: red[700] }} />
                                </IconButton>
                            </Stack>
                        ))}
                    </Stack>
                        <Stack justifyContent={"end"}>

                    <Button onClick={handleSubmit} variant="contained" size="small" color="primary" sx={{ maxWidth: "max-content", marginLeft: "auto", backgroundColor: "var(--clr-0)" }} >
                        Save Budget
                    </Button>
                        </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default AddBudget;
