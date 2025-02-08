import React, { ReactNode, useState } from 'react'
import "./style.css"
import { SectionTypes } from '../../types/types'
import { ContextType, useContextv2 } from '../../Context'
import { useNavigate } from 'react-router'
import { FaChartPie } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import AddTransaction from '../Transactions/AddTransaction'
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

        // {
        //     id: -1,
        //     key: "ASSETS",
        //     displayName: "Assets",
        //     icon: <MdSavings size={"2rem"} />,
        //     path: "/Assets"
        // },
        {
            id: -1,
            key: "INCOMES",
            displayName: "Incomes",
            icon: <TbMoneybag size={"2rem"} />,
            path: "/Incomes"
        },
        {
            id: 0,
            key: "ADD",
            displayName: "",
            icon: <div onClick={handleOpenAddTransaction}  style={{
                padding: "1rem",
                borderRadius: "50%",
                backgroundColor: "white",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                boxShadow:"1px 1px 1px grey",
                color:"black"
            }}>
               
                    <MdAdd size={"2rem"} />
               
            </div>
            
        },
        // {
        //     id: 1,
        //     key: "PLANS",
        //     displayName: "Plans",
        //     icon: <MdOutlineEventNote size={"2rem"} />,
        //     path: "/Plans"
        // },
        {
            id: 1,
            key: "BUDGETS",
            displayName: "Budgets",
            icon: <FaChartPie size={"2rem"} />,
            path: "/Budgets"
        }
    ]
    let handleOnClick = (path) => {
        navigate(path)
    }
    let path = store?.application?.path ?? ""
    let onFocus = store.application.path
    return (
        <div className='navbar'>
                <AddTransaction open={openAddTransaction} handleClose={handleOpenAddTransaction} />
            <div>
                {

                    modules.map((module, index) => {
                        return <NavItem module={module} focused={onFocus == module.key} handleOnClick={handleOnClick} />
                    })
                }
            </div>
        </div>
    )
}

export default Navbar