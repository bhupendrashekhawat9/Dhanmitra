import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ContextType, useContextv2 } from '../../../Context'
import { v4 } from 'uuid'
import { updateUser } from '../../../methods/fetchMethods'
import { capitalize } from '../../../methods/adapters'

const RegisterUser = () => {
    let {store,methods}  = useContextv2() as ContextType;
    const [user, setUser] = useState<ContextType["store"]["userData"]>({
        id: v4(),
        name:""
    })
      const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser(prev => ({
          ...prev,
          [name]: capitalize(value)
        }))
      }
    const handleSubmit = ()=>{
        updateUser(user)
        methods.fetchUserData()
    }
  return (
    <div style={{
        height:"100vh"
    }}>
        <Stack justifyContent={'center'} alignItems={'center'} height={"100vh"} sx={{backgroundColor:"rgba(243,236,216,255)"}} >
          
                <Stack>
                    <img style={{width:"10rem"}} src='./Dhanmitra.png'/>
                    <Typography textAlign={'center'} fontWeight={600} marginTop={'2rem'} >
                        Welcome to Dhanmitra,
                    </Typography>
                    <Typography variant='caption' marginTop={".2rem"} textAlign={"center"} fontWeight={600} sx={{color:"var(--color-75)"}}>
                        Your finance friend
                    </Typography>
                </Stack>
                <Stack margin={'2rem 0'}>
                    <Typography sx={{
                        fontSize:".8rem",marginBottom:".5rem"
                    }} fontWeight={600}>
                        I would like to call you by a name
                    </Typography>
                    <TextField fullWidth size='small' sx={{fontSize:".8rem"}} placeholder='Nickname' name='name' onChange={handleOnChange} value={user.name} / >
                </Stack>
                    <Button
                    onClick={handleSubmit}
                    variant='contained'
                    sx={{
                        textTransform:"none",
                        background:"var(--color-100)",
                        marginTop:"1rem",
                        borderRadius:"10rem",
                    }}>
                        Proceed
                    </Button>
           
        </Stack>
    </div>
  )
}

export default RegisterUser