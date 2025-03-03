    import { Dialog, DialogContent, Stack } from '@mui/material'
    import React, { ReactNode, useEffect, useState } from 'react'
    import { useLocation } from 'react-router'
    import AddIncome from '../Assets & Income/AddIncome'
    import AddExpenditure from '../Expenditure/AddExpenditure'
    import AddBudget from '../Planning/Budgets/AddBudget'
    import Tab from '../../customComponents/Tab/Tab'
    import { FaDivide } from 'react-icons/fa'
    import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
    interface tabOption {
        id:number,
        title:string,
        value:string,
        path:string,
        component:ReactNode,
        icon?:ReactNode
    }


    const AddNewTxn = ({open,handleClose}) => {
        const location = useLocation()
        const [focusedScreen,setFocusedScreen] = useState(()=> location.pathname)
        const [sortedTabs,setSortedTabs] = useState<tabOption[]>([]);
        const tabOptions: {[key: string]: tabOption} =  {
            "/Income": {
                id:-1,
                title: "Income",
                value: "INCOME",
                path: "/Income",
                component: <AddIncome handleClose={handleClose}/>,
                icon:<MonetizationOnIcon/>
            },
            "/": {
                id:0,
                title: "Expense",
                value: "EXPENDITURE",
                path: "/",
                component: <AddExpenditure handleClose={handleClose} />,
                icon:<FaDivide/>


            },
            "/Budget": {
                id:-1,
                title: "Budget",
                value: "BUDGET",
                path: "/Budget",
                component: <AddBudget handleClose={handleClose}/>,
                icon:<FaDivide/>

            }
        }
        
        const getFocusedScreen = (options: {[key: string]: tabOption}, focusedModule:string )=>{
            return options[focusedModule]?.component

        }
        const reorderTabs = (tabs: tabOption[],focusedModule:string)=>{
            
            let lastFocuesed = tabs.find((i)=> i.id == 0);
            let currentFocus = tabs.find((i)=> i.path == focusedModule);
            return tabs.map((i)=>{
                if(i.path == lastFocuesed.path){
                    return {
                        ...i,
                        id: currentFocus.id
                    }
                }
                if(i.path == currentFocus?.path){
                    return {
                        ...i,
                        id:0
                    }
                }
                return i
            })
        }
        const handleTabFocus = (tab: unknown)=>{
            let tTab = tab as tabOption
            setFocusedScreen(tTab.path)
        }
        useEffect(()=>{
            setFocusedScreen(location.pathname)
            setSortedTabs(Object.values(tabOptions))
        },[])

        useEffect(()=>{
            setSortedTabs(reorderTabs(Object.values(tabOptions),focusedScreen))
        },[focusedScreen])
        console.log(sortedTabs)
    return (
        <div>
            
            <Dialog open={open}  onClose={handleClose}>
        <DialogContent>
            <Stack direction={"row"} justifyContent={'center'} gap={2} padding={'1rem'}>
                {
                    sortedTabs.map((i,index)=>{
                        return <>
                        <Tab label={i.title} onClick={()=> handleTabFocus(i)} icon={i.icon} focused={i.id == 0 ? true:false}/>
                        </>
                    })
                }
            </Stack>
            {getFocusedScreen(tabOptions,focusedScreen)}
        </DialogContent>
            </Dialog>

        </div>
    )
    }

    export default AddNewTxn