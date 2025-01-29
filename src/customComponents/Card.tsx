import { Stack } from '@mui/material'
import React from 'react'

const Card = ({sx={},children,...props}) => {
  return (
    <Stack {...props}  sx={{
        backgroundColor: "var(--clr-0-light)",
        padding: "1rem 3rem",
        borderRadius: "1rem",
        marginTop:".5rem",
        ...sx
    }}>
{children}


    </Stack>
  )
}

export default Card