import { Typography } from '@mui/material';
import React from 'react'
import { toLocal } from '../commonMethods/adapters';
import { red } from '@mui/material/colors';

const Progress = ({ value, target }) => {
    let completedPercentage = ((value / target) * 100)
    let isProgressExceedingTheLimit = completedPercentage > 100;

    console.log(value,100-(completedPercentage-100),completedPercentage-100)
    return (
        <div style={{
            width: '100%',
            
        }}>
            <div style={{
                width: `${isProgressExceedingTheLimit ? 100-(completedPercentage-100) : completedPercentage}%`,
                backgroundColor: "var(--primary-color)",
                height: '1.2rem',
                borderRight:'3px solid black',
                display: 'flex',
                justifyContent: "end",
                padding: '.1rem 0rem',
                position: 'relative'


            }}>
                <Typography fontSize={'10px'} sx={{ zIndex: 1,marginRight:".5rem" }}>
                    <span >
                        {value ? toLocal(value, "currency") : ""}
                    </span>
                </Typography>
               
            </div>
               {isProgressExceedingTheLimit &&  <div style={{
                    background:red[900],
                    width: `${completedPercentage-100}%`
                }}>

                </div>}

        </div>
    )
}

export default Progress