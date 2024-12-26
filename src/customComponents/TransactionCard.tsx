import { Typography } from '@mui/material'
import { toLocal } from '../commonMethods/adapters';
import React, { ReactNode } from 'react';

export interface TransactionCardPropsType{
    name: string;
    amount: string;
    transactionType?: string;
    detailComponent?: ReactNode;
}
const TransactionCard = (props: TransactionCardPropsType) => {
    let name = props.name;
    let amount = toLocal(props.amount, 'currency') as string
    return (
        <div className='transaction_card' style={{
            display: 'grid',
            width: '100%',
            gridTemplateColumns: "0fr 3fr 1fr",
            // gridTemplateRows:"1fr 10fr 1fr",
            backgroundColor: 'white',
            height: "3.5rem",
            borderRadius: '.5rem',
            // boxShadow: "1px 1px 10px 1px grey",
            marginTop: '.5rem',
            padding:".5rem"
        }}>
            <div>

            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'start',
                alignItems:'center'
            }}>
                    <Typography>
                        {name}
                    </Typography>
                  
               
            </div>
            <div style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center'
            }}>
                <Typography>
                    {amount}
                </Typography>
            </div>
            {props.detailComponent && <>
            
            </>}

        </div>
    )
}

export default TransactionCard