import React, { ReactNode, useState } from 'react'
import "./style.css"
import { SectionTypes } from '../../types/types'
import { ContextType, useContextv2 } from '../../Context'
import { useNavigate } from 'react-router'
import { FaChartPie } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import AddNewTxn from '../AddNew/AddNewTxn'
import { RiHomeLine } from "react-icons/ri";
interface modulesType {
    displayName: string,
    icon: ReactNode,
    path?: string
    key: string,
    id:number

}
interface props {
    module: modulesType,
    handleOnClick: (e: React.MouseEvent<HTMLElement>, key: SectionTypes) => void;
    focused: boolean
}
const NavItem = ({ module, handleOnClick, focused }: props) => {
    let navigate = useNavigate()
    return (
        <div onClick={(e) => navigate(module.path)} className={`navbar-btn`}>
            {module.icon}
            {
                focused && <>
                <div className='nav-btn_focused'>

                </div>
                </>
            }
        </div>
    )
}

const Navbar = () => {
    const { store } = useContextv2() as ContextType
    let navigate = useNavigate()
    const [openAddTransaction,setOpenAddTransaction] = useState(false);
    let handleOpenAddTransaction = ()=>{
        setOpenAddTransaction(prev=> !prev)
    }
    let modules: modulesType[] = [

        {
            id: -1,
            key: "HOME",
            displayName: "Home",
            icon: <RiHomeLine size={"1.5rem"}/>,
            path: "/"
        },
        {
            id: -1,
            key: "INCOMES",
            displayName: "Incomes",
            icon: <TbMoneybag size={"1.5rem"} />,
            path: "/Incomes"
        },
        {
            id: -1,
            key: "BUDGETS",
            displayName: "Budgets",
            icon: <FaChartPie size={"1.5rem"} />,
            path: "/Budgets"
        },
        {
            id: 0,
            key: "ADD",
            displayName: "",
            icon: <div onClick={handleOpenAddTransaction}  style={{
                padding: ".5rem",
                borderRadius: "50%",
                backgroundColor: "white",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                boxShadow:"1px 1px 1px grey",
                color:"black"
            }}>
               
                    <MdAdd size={"1.5rem"} />
               
            </div>
            
        },
        // {
        //     id: 1,
        //     key: "PLANS",
        //     displayName: "Plans",
        //     icon: <MdOutlineEventNote size={"2rem"} />,
        //     path: "/Plans"
        // },
       
    ]
    let handleOnClick = (path) => {
        navigate(path)
    }
    let path = store?.application?.path ?? ""
    let onFocus = store.application.path
    return (
        <>
         <AddNewTxn open={openAddTransaction} handleClose={handleOpenAddTransaction}/>
        <div className='navbar'>
           
                {/* <AddTransaction open={openAddTransaction} handleClose={handleOpenAddTransaction} /> */}
            <div>
                {
                    
                    modules.map((module, index) => {
                        return <NavItem module={module} focused={onFocus == module.key} handleOnClick={handleOnClick} />
                    })
                }
            </div>
        </div>
                </>
    )
}

export default Navbar