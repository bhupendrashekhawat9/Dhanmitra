import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { ContextType, useContextv2 } from '../../Context'

const Layout = ({children}) => {
    let {updateContextStore} = useContextv2() as ContextType;
    let handleBack = ()=>{
        
        updateContextStore([["application.path","HOME"]])
    }
  return (
    <div style={{
        width:"100%",

    }}>
    <div style={{
        padding:"1rem .5rem"
    }}>
        <IconButton onClick={handleBack}>
          <ArrowBack/>
        </IconButton>
      </div>
      {
        children
      }
    </div>
  )
}

export default Layout