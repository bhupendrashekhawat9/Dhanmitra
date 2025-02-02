import React, { useState } from "react";
import AddBudget from "./AddBudget";

const Budget = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Budget Dialog</button>
            <AddBudget open={open} handleClose={handleClose} />
        </div>
    );
};

export default Budget;
