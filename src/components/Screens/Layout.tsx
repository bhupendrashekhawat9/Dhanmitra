import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { ContextType, useContextv2 } from '../../Context'
import { useNavigate } from 'react-router'

const Layout = ({children}) => {
    let {updateContextStore} = useContextv2() as ContextType;
    let navigate = useNavigate();
    let handleBack = ()=>{
        navigate(-1)
        updateContextStore([["application.path","HOME"]])
    }
  return (
    <div style={{
        width:"100%",
        
    }}>
    <div style={{
        padding:"1rem .5rem"

    }}>
        {/* <IconButton onClick={handleBack}>
          <ArrowBack/>
        </IconButton> */}
      </div>
      
      {
        children
      }
    </div>
  )
}

export default Layout