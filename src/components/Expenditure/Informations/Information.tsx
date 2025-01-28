import { Typography } from '@mui/material'
import React from 'react'
import { toLocal } from '../../../commonMethods/adapters'

interface propsType {
  data: {
    dayLimit: number,
    daySpent: number
  }
}
const Information = (props:propsType) => {
  let balance = props.data.dayLimit-props.data.daySpent
  return (
    <div style={{
        padding:'1rem'
    }}>
        <Typography variant='h6' sx={{
            fontWeight:"600",
            padding:'.5rem'
        }}>
            You are left with <span style={{fontSize:"1.2rem",fontWeight:"800"}}> {toLocal(balance,"currency")}</span> for today
        </Typography>
    </div>
  )
}

export default Information