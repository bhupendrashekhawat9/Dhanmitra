import React from 'react'
import KPICard from '../../../customComponents/KPICard'
import GoalKPI from '../GoalKPI'

const GoalKpis = () => {
  return (
 <div className='kpiContainer' >
    
                <div className='kpiContainer-element'>

          <KPICard>
            <GoalKPI />
          </KPICard>
          </div>
    </div>
  )
}

export default GoalKpis