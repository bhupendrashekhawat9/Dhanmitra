import { Stack, Typography } from '@mui/material'

const GoalKPI = () => {
  return (
    <Stack direction={'column'} height={'100%'}>
    <Typography fontWeight={600} variant='h6' textAlign={'center'}>

      Goals
    </Typography>
    <Stack direction={'column'} padding={'0rem 1rem'} height={"100%"} justifyContent={'center'} alignItems={'center'}>
      <Typography variant='h6' fontWeight={600} textAlign={'center'}>No Goals Set</Typography>     
    </Stack>
    </Stack>
  )
}

export default GoalKPI