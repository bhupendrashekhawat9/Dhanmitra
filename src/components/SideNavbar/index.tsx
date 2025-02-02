import React, { ReactNode, useContext } from 'react'
import "./index.css"
import { SectionTypes } from '../../types/types'
import { Context, ContextType, useContextv2 } from '../../Context'
import { Stack, Typography } from '@mui/material'
interface modulesType {
    displayName:string,
    icon: string,
    path:string
    key: SectionTypes

}
interface props {
    module: modulesType,
    handleOnClick:(e: React.MouseEvent<HTMLElement>,key: SectionTypes)=> void;
    focused: boolean
}
const NavItem = ({module,handleOnClick,focused}:props) => {
  return (
    <div  onClick={(e)=>{
        
        handleOnClick(e,module.key)}} style={{display:"flex", alignItems:"center", justifyContent:"center",textAlign:"center",padding:"1rem", gap:'1rem', maxWidth:"max-content", borderRadius:"1rem", margin:".5rem"}} className={`nav-btn focused`}>
        
            <img height={'20'}  src={module.icon}/>
        
        <Typography >

        {module.displayName}
        </Typography>
    </div>
  )
}

const Navigation = () => {
      const {store,updateContextStore} = useContextv2() as ContextType
    
    let modules : modulesType[] = [
        
        {
            key:"ASSETS",
            displayName: "Assets & Incomes",
            icon:'/Nav_Income.png',
            path: "#Incomes"
        },
        {
            key:"PLANS",
            displayName: "Plans & Budgets",
            icon:'/Nav_Planning.png',
            path: "#Plans"
        }
    ]
    let handleOnClick = (e,key)=>{
        
        updateContextStore([["application.path",key ]])
        
    }
    let path = store?.application?.path??""
    let onFocus = store.application.path
  return (
    <div style={{width:"100%",
        display:"grid",
        gridTemplateColumns:"max-content max-content max-content max-content max-content"
        
    }}>
        
        {
            
            modules.map((module,index)=>{
                return <NavItem module={module} focused={onFocus == module.key} handleOnClick={handleOnClick} />
            })
        }
    </div>
  )
}

export default Navigation