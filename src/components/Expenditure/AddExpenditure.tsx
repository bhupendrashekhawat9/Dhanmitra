import { Stack, Typography, FormControl, FormLabel, TextField, Select, MenuItem, Button, Chip } from '@mui/material';
import { useContext, useEffect, useState, useCallback } from 'react';
import { savingsQuotes } from '../../variables/Variables';
import { capitalize } from '../../methods/adapters';
import { Context, ContextType } from '../../Context';
import { Transactions } from '../../types/types';
import { addTransaction } from '../../methods/fetchMethods';

interface Props {
  handleClose?: () => void;
}

const AddExpenditure = ({ handleClose }: Props) => {
  const { store, refreshContextStore } = useContext(Context) as ContextType;

  const [expenditure, setExpenditure] = useState<Transactions>({
    amount: '',
    name: '',
    createdDate: new Date().toISOString().split('T')[0],
    budgetId: '',
    budgetCategoryId: '',
    userId: 0,
    module: 'EXPENDITURE',
    transactionType: 'DEBIT',
    wallet: 'CASH'
  });

  const [budgetCategoryOptions, setBudgetCategoryOptions] = useState([]);

  const activeBudgets = store.budgets.activeBudget;
  const todaysQuote = savingsQuotes[new Date().getDate()];

  useEffect(() => {
    if (activeBudgets.length === 1) {
      setExpenditure(prev => ({
        ...prev,
        budgetId: activeBudgets[0]?.id || ''
      }));
    }
  }, [activeBudgets]);

  useEffect(() => {
    const budget = activeBudgets.find(i => i.id === expenditure.budgetId) ?? { categories: [] };
    setBudgetCategoryOptions(budget.categories ?? []);
  }, [expenditure.budgetId, activeBudgets]);

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    if (name) {
      setExpenditure(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleUpdatePaymentSource = useCallback((value: "LOAN"|"CASH") => {
    setExpenditure(prev => ({ ...prev, wallet: value }));
  }, []);

  const handleAddTransaction = async () => {
    if (!expenditure.name || !expenditure.amount || !expenditure.budgetId) return;
    await addTransaction(expenditure);
    refreshContextStore('transactions');
    handleClose?.();
  };

  const paymentTypes:{
    title:string,value: Transactions["wallet"]
  }[] = [
    { title: 'Cash', value: 'CASH' },
    { title: 'Loan', value: 'LOAN' }
  ];

  return (
        <div className='form-content '>
    <Stack spacing={2}>

    <div className="form-content-header">
            <h1 className="page-title">Add New Spend</h1>
          </div>
      {/* Quote Section */}
      <Stack justifyContent="center" alignItems="center">
        <Typography variant="caption" textAlign="center" mt={1}>
          {todaysQuote}
        </Typography>
      </Stack>

      {/* Transaction Form */}
      <FormControl>
        <FormLabel>Description</FormLabel>
        <TextField size="small" name="name" onChange={handleOnChange} value={expenditure.name} />
      </FormControl>


     
      <FormControl>
        <FormLabel>Budget</FormLabel>
        <Select size="small" name="budgetId" value={expenditure.budgetId} onChange={handleOnChange}>
          {activeBudgets.map(i => (
            <MenuItem key={i.id} value={i.id}>
              {capitalize(i.name, 'FIRST LETTER OF ALL')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select size="small" name="budgetCategoryId" value={expenditure.budgetCategoryId} onChange={handleOnChange}>
          {budgetCategoryOptions.map(i => (
            <MenuItem key={i.id} value={i.id}>
              {capitalize(i.name, 'FIRST LETTER OF ALL')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Amount</FormLabel>
        <TextField size="small" name="amount" type="number" onChange={handleOnChange} value={expenditure.amount} />
      </FormControl>

      {/* Payment Method Selection */}
      <Stack direction="row" spacing={1} pt={1}>
        {paymentTypes.map(i => (
          <Chip
            key={i.value}
            sx={{
              padding: '0.8rem',
              backgroundColor: expenditure.wallet === i.value ? 'var(--primary)' : 'transparent',
              color: expenditure.wallet === i.value ? 'white' : 'black',
              border: expenditure.wallet === i.value ? 'none' : '1px solid #1976d2',
              ":hover":{
                backgroundColor: 'var(--primary-light)'
              
              }
            }}
            label={i.title}
            clickable
            variant={expenditure.wallet === i.value ? 'filled' : 'outlined'}
            onClick={() => handleUpdatePaymentSource(i.value)}
          />
        ))}
      </Stack>

      {/* Date Picker */}
      <FormControl>
        <FormLabel>Date</FormLabel>
        <TextField size="small" type="date" name="createdDate" value={expenditure.createdDate} onChange={handleOnChange} />
      </FormControl>

      {/* Submit Button */}
      <Stack alignItems={'end'}>

      <Button  onClick={handleAddTransaction} variant="contained" sx={{ backgroundColor: 'var(--primary)', width:"max-content", marginLeft:"auto" }} disabled={!expenditure.name || !expenditure.amount || !expenditure.budgetId}>
        Add
      </Button>
      </Stack>

    </Stack>
      </div>
  );
};

export default AddExpenditure;
