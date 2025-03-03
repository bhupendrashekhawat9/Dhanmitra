import { Dialog, DialogContent, DialogTitle, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';
import AddExpenditure from '../Expenditure/AddExpenditure';
import AddIncome from '../Assets & Income/AddIncome';

interface AddTransactionProps {
  open: boolean;
  handleClose: () => void;
}

const AddTransaction = ({ open, handleClose }: AddTransactionProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Transaction</DialogTitle>
      <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
        <Tab label="Expenditure" />
        <Tab label="Income" />
      </Tabs>
      <DialogContent>
        {activeTab === 0 ? <AddExpenditure handleClose={handleClose} /> : <AddIncome handleClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
