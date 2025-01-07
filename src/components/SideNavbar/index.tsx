import React, { ReactNode, useContext } from 'react'
import "./index.css"
import { SectionTypes } from '../../types/types'
import { Context, ContextType } from '../../Context'
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
    <div onClick={(e)=>{
        
        handleOnClick(e,module.key)}} style={{display:"flex", alignItems:"center", justifyContent:"start",padding:".5rem", gap:'1rem'}} className={`nav-btn ${focused?"focused":""}`}>
        
            <img height={'20'}  src={module.icon}/>
        
        <div >
        {module.displayName}
        </div>
    </div>
  )
}

const index = () => {
      const {store,updateContextStore} = useContext(Context) as ContextType
    
    let modules : modulesType[] = [
        {
            key:"EXPENDITURES",
            displayName: "Expenditures",
            icon:'/Nav_Expenditures.png',
            path: "#Expenditures"
        },
        {
            key:"INCOMES",
            displayName: "Incomes",
            icon:'/Nav_Income.png',
            path: "#Incomes"
        },
        {
            key:"GOALS",
            displayName: "Goals",
            icon:'/Nav_Goal.png',
            path: "#Goals"
        },
        {
            key:"SAVINGS",
            displayName: "Savings",
            icon:'/Nav_Savings.png',
            path: "#Savings"
        },
        {
            key:"EMIS",
            displayName: "EMI",
            icon:"/Nav_EMI.png",
            path: "#EMI"
        },
    ]
    let handleOnClick = (e,key)=>{
        
        updateContextStore([["application.path",key ]])
        
    }
    let path = store?.application?.path??""
    let onFocus = store.application.path
  return (
    <div className='sidenav-container '>
        
        {
            
            modules.map((module,index)=>{
                return <NavItem module={module} focused={onFocus == module.key} handleOnClick={handleOnClick} />
            })
        }
    </div>
  )
}

export default index