import { Typography } from '@mui/material'
import { toLocal } from '../methods/adapters';
import React, { ReactNode } from 'react';

export interface TransactionCardPropsType{
    name?: string;
    amount?: string;
    transactionType?: string;
    detailComponent?: ReactNode;
    children: ReactNode
}
const TransactionCard = (props: TransactionCardPropsType) => {
    
    return (
        <div className='transaction_card' style={{
         
            width: '100%',
           backgroundColor:"var(--clr-0-light)",
            height: "max-content",
            borderRadius: '.5rem',
            // boxShadow: "1px 1px 10px 1px grey",
            marginTop: '.5rem',
            padding:".5rem"
        }}>
         {props.children}
            {props.detailComponent && <>
            
            </>}

        </div>
    )
}

export default TransactionCard