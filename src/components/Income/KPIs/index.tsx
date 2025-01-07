import React from 'react'
import KPICard from '../../../customComponents/KPICard'
import IncomeKPI from '../IncomeKPI'

const IncomeKpis = () => {
  return (
    <div className='kpiContainer' >
    
    <div className='kpiContainer-element'>
            
          <KPICard>

            <IncomeKPI/>

          </KPICard>
        </div>
    </div>
  )
}

export default IncomeKpis