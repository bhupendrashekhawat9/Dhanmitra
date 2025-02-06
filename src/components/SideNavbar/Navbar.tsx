import React, { ReactNode, useContext } from 'react'
import "./index.css"
import { SectionTypes } from '../../types/types'
import { Context, ContextType, useContextv2 } from '../../Context'
import { Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
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
    let navigate = useNavigate()
  return (
    <div  onClick={(e)=> navigate(module.path)} style={{display:"flex", alignItems:"center", justifyContent:"center",textAlign:"center",padding:"1rem", width:"8rem", borderRadius:"1rem", margin:""}} className={`nav-btn focused`}>
        
            <img height={'20'}  src={module.icon}/>
        
        <Typography >

        {module.displayName}
        </Typography>
    </div>
  )
}

const Navigation = () => {
      const {store,updateContextStore} = useContextv2() as ContextType
    let navigate = useNavigate()
    let modules : modulesType[] = [
        
        {
            key:"ASSETS",
            displayName: "Assets",
            icon:'/Nav_Income.png',
            path: "/Assets"
        },
        {
            key:"INCMOES",
            displayName: "Incomes",
            icon:'/Nav_Income.png',
            path: "/Incomes"
        },
        {
            key:"PLANS",
            displayName: "Plans",
            icon:'/Nav_Planning.png',
            path: "/Plans"
        },
        {
            key:"BUDGETS",
            displayName: "Budgets",
            icon:'/Nav_EMI.png',
            path: "/Budgets"
        }
    ]
    let handleOnClick = (path)=>{
        debugger
    navigate(path)
        
    }
    let path = store?.application?.path??""
    let onFocus = store.application.path
  return (
    <div style={{width:"100%",
        display:"grid",
        gridTemplateColumns:"8rem 8rem 8rem 8rem 8rem",
        gridTemplateRows:"8rem",
        columnGap:"1rem"
        
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