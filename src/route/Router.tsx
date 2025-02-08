import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router";
import Home from '../components/Home/Home';
import Budget from '../components/Planning/Budgets';
import Incomes from '../components/Assets & Income';
import Plans from '../components/Planning/Plans';
import { ContextType, useContextv2 } from '../Context';
const AppRouter = () => {
    let {store} = useContextv2() as ContextType;
    const [indexComponent, setIndexComponent] = useState(<Home/>)
    useEffect(()=>{
        // if(!store.userData.name){
        //     setIndexComponent(<RegisterUser/>)
        // }

    },[store.userData])
    return (


            <Routes>
                <Route index element={indexComponent} />
                <Route path="Budgets" element={<Budget />} />

                <Route path='Incomes'>
                    {/* <Route path="addIncome" element={<AddIncome />} /> */}
                    <Route index element={<Incomes />} />
                </Route>

                <Route path="Budgets">
                    <Route index element={<Budget />} />
                </Route>
                <Route path="Plans">
                    <Route index element={<Plans />} />
                </Route>
            </Routes>
   
    )
}

export default AppRouter