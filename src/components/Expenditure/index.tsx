import React, { useContext, useEffect, useState } from 'react'
import KPICard from '../../customComponents/KPICard'
import ExpenditureKPI from './ExpenditureKPI'
import { IncomeType, SegrigationDataType } from '../../types/Income'
import { ExpenditureType } from '../../types/Expenditure'
import { Context, ContextType } from '../../Context'
import { toLocal } from '../../commonMethods/adapters'
import { getAllData } from '../../indexDB/database'
import KPIs from './KPIs'
import ExpenditureExtendedKPI from './ExpenditureExtendedKpi'

const ExpenditurePage = () => {
  

  let kpiList = [
    {
      title:""
    }
  ]
  
 
  return (
    <div>
         <KPIs/>
         <ExpenditureExtendedKPI/>
    </div>
  )
}

export default ExpenditurePage