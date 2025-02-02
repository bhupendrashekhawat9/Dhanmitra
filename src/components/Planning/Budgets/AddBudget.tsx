import {
    Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel,
    IconButton, InputAdornment, Stack, TextField
} from "@mui/material";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { getRupeeSymbol } from "../../../commonMethods/adapters";
import { addData } from "../../../indexDB/database";

const AddBudget = ({ open, handleClose }) => {
    const [budget, setBudget] = useState({
        name: "",
        amount: "",
        startDate: "",
        endDate: "",
        budgetCategories: [
            {
                id: uuid(),
                name: "",
                amount: "",
                amountType: "AMOUNT",
            },
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
            budgetCategories: prev.budgetCategories.map((division) =>
                division.id === id ? { ...division, [field]: value } : division
            ),
        }));
    };

    // Adds a new budget division
    const handleAddcategories = () => {
        setBudget((prev) => ({
            ...prev,
            budgetCategories: [
                ...prev.budgetCategories,
                { id: uuid(), name: "", amount: "", amountType: "AMOUNT" },
            ],
        }));
    };

    // Deletes a budget division
    const handleDelete = (id) => {
        setBudget((prev) => ({
            ...prev,
            budgetCategories: prev.budgetCategories.filter((division) => division.id !== id),
        }));
    };
    const handleSubmit = async ()=>{
        await addData(budget,"budgets")
        handleClose()
    }
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
                    <Stack justifyContent={"end"} sx={{marginTop:"2rem"}}>

                    <Button variant="contained" size="small" sx={{ maxWidth: "max-content", marginLeft: "auto", backgroundColor: "var(--clr-0)" }} onClick={handleAddcategories}>
                        Add Categories
                    </Button>
                    </Stack>
                    <Stack spacing={2}>
                        {budget.budgetCategories.map((division) => (
                            <Stack key={division.id} direction="row" spacing={2} alignItems="center">
                                <TextField
                                    size="small"
                                    placeholder="Name"
                                    value={division.name}
                                    onChange={(e) => handleDivisionChange(division.id, "name", e.target.value)}
                                    fullWidth
                                />
                                <TextField
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
