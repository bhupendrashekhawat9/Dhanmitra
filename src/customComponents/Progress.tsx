import { Typography } from '@mui/material';
import React from 'react'
import { toLocal } from '../methods/adapters';
import { orange, red } from '@mui/material/colors';

const Progress = ({ value, target, minValue, maxValue }) => {
    let totalValue = maxValue;
    let hasValueCrossedMax = false;

    if (value > maxValue) {
        totalValue = value;
        hasValueCrossedMax = true;
    }
    let maxValueLength = 0;
    let surplusLength = 0;
    if (value <= maxValue) {
        maxValueLength = ((value) / maxValue) * 100
    }
    if (value > maxValue) {
        maxValueLength = (maxValue / totalValue) * 100
        surplusLength = 100 - (maxValueLength)
    }

    return (
        <div style={{
            maxWidth: '100%',
            display: 'grid',
            gridTemplateColumns: `${maxValueLength}% ${surplusLength}%`,

        }}>
            <div style={{
                width: `${100}%`,
                backgroundColor: "var(--clr-1)",
                height: '1.8rem',
                borderRadius:"0rem",
                borderStartStartRadius:".5rem",
                borderBottomLeftRadius:".5rem",

                display: 'flex',
                justifyContent: "end",
                alignItems:"center",
                padding: '.1rem 0rem',
                position: 'relative',
                color:"var(--text-color)"
               
            }}>
                {/* <div style={{
                    width:"max-content",
                    position:"absolute",
                    bottom:"-100%",
                    
                    backgroundColor:"var(--clr-1)",
                    padding:".3rem .3rem",
                    textAlign:"center",
                    borderRadius:".2rem"
                }}> */}

                <Typography fontSize={'10px'} sx={{ zIndex: 1, marginRight: ".5rem" }}>
                    <span >
                        {value ? toLocal(value, "currency") : ""}
                    </span>
                </Typography>
                </div>

            {/* </div> */}
          
            {hasValueCrossedMax && <div aria-roledescription='min limit bar' style={{
                background: red[900],
                width: `${100}%`,
                display:'flex',
                justifyContent:'end',
                alignItems:"center",
                overflow:"hidden",
                borderTopRightRadius:".5rem",
            
                borderBottomRightRadius:".5rem",
            }}>
                <Typography fontSize={'10px'} sx={{ zIndex: 1, marginRight: ".5rem",color:'white' }}>
                    <span >
                        {hasValueCrossedMax ?  toLocal(value- maxValue, "currency") :""}
                    </span>
                </Typography>
            </div>}

        </div>
    )
}

export default Progress