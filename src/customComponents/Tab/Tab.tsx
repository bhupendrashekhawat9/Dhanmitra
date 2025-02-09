import { Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react'
import "./style.css"
interface props{
    focused?:boolean;
    onClick:(tab:unknown)=>void;
    label: string,
    icon: ReactNode
}
const Tab = (props:props) => {
    const [focused, setFocused] = useState(false)

    let handleOnClick = ()=>{

    }
  return (
    <div {...props} className={`tab ${props.focused ? "focued":""}`}>
        <>
        {
            props.icon
        }
        {
            props.focused &&(
                <Typography fontSize={".8rem"}>
                    {props.label}
                </Typography>
            ) 
            
        }
        </>
    </div>
  )
}

export default Tab