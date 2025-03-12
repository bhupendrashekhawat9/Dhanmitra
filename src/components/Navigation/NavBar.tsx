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
import QrReader from 'react-qr-scanner'
import { Button } from '@mui/material'
import { QrScanner } from '@diningcity/capacitor-qr-scanner'

import { Browser } from '@capacitor/browser';


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
    const [Scanned, setScanned] = useState(true)
    let handleOpenAddTransaction = ()=>{
        setOpenAddTransaction(prev=> !prev)
    }
    let toggleScan = ()=>{
        setScanned(prev=> !prev)
    }
    let handleScan = (data)=>{
        if(data){
            toggleScan()
            console.log(data,"QR-Data")
        }else{
            console.log("No data")
        }
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
    const previewStyle = {
        height: 240,
        width: 320,
      }
    const handleError = ()=>{
        
    }
    const scanQrCode = async () => {
        
        const { result } = await QrScanner.scanQrCode();
        openPaymentApp()
        console.log(result);
        // Handle the scanned QR code data here
      };

      const openPaymentApp = async () => {
        const url = 'phonepe://pay?pa=user123@upi&pn=User123&tn=Test_Payment&am=20&cu=INR&mc=1234&tr=01234';
        await Browser.open({ url });
      };
    return (
        <>
        {!Scanned &&
         <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />}
          <Button onClick={scanQrCode}>
            scan
          </Button>
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