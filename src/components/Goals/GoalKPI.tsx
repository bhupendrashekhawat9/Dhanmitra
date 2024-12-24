import { Stack, Typography } from '@mui/material'
import React from 'react'

const GoalKPI = () => {
  return (
    <Stack direction={'column'} height={'100%'}>
    <Typography fontWeight={600} variant='h6' textAlign={'center'}>

      Goals
    </Typography>
    <Stack direction={'column'} padding={'0rem 1rem'} height={"100%"} justifyContent={'center'} alignItems={'center'}>
      <Typography variant='h4' fontWeight={600} textAlign={'center'}>{2}</Typography>
      <div style={{
        height:'2px',
        border:"1px solid black",
        width:'100%',
        margin:'.5rem'
      }}></div>
      <Typography variant='h6' fontWeight={600} textAlign={'center'}>{1} source</Typography>

      <Typography variant='caption'>
    Set a goal to add 1 more source of income
      </Typography>
    </Stack>
    </Stack>
  )
}

export default GoalKPI