import { Dialog, DialogContent } from '@mui/material';
import AddExpenditure from '../Expenditure/ExpenditureForm';

interface AddTransactionProps {
  open: boolean;
  handleClose: () => void;
  data?: any
}

const AddTransaction = ({ open, handleClose,data }: AddTransactionProps) => {
  let scenario: "UPDATE"|"CREATE" = data ? "UPDATE":"CREATE"

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <AddExpenditure scenario={scenario} handleClose={handleClose} data ={data} /> 
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
