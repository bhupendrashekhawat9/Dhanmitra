import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from '../components/Home/Home';
import Budget from '../components/Planning/Budgets';
import Incomes from '../components/Assets & Income';
import AddIncome from '../components/Assets & Income/AddIncome';
import Plans from '../components/Planning/Plans';
const AppRouter = () => {
    return (


            <Routes>
                <Route index element={<Home />} />
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