import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import Information from '../Expenditure/Informations/Information'
import KPIs from './KPIs'
import { ContextType, useContextv2 } from '../../Context'
import Transactions from '../Transactions'
import BudgetDetails from './Budget/BudgetDetails'
import moment from 'moment'
import BudgetSummary from './Budget/BudgetSummary'
import { capitalize } from '../../methods/adapters'

const getPhaseOfDay = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Morning"
  if (hour >= 12 && hour < 15) return "Afternoon"
  if (hour >= 15 && hour <=24 ) return "Evening"
  return "Night"
}

const Home = () => {
  const phaseOfDay = getPhaseOfDay()
  const [openAddScreen, setOpenAddScreen] = useState(false)
  const { store } = useContextv2() as ContextType
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [allBudgets, setAllBudgets] = useState([])
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const todaysBudget = store.budgets.activeBudget.filter(budget => 
      moment(budget.startDate).isSameOrBefore(today) && moment(budget.endDate).isSameOrAfter(today)
    )
    
    setAllBudgets(todaysBudget)
    setSelectedIndex(0)
  }, [store])

  const handlers = useSwipeable({
    onSwipedLeft: () => setSelectedIndex(prev => (prev + 1) % allBudgets.length),
    onSwipedRight: () => setSelectedIndex(prev => (prev - 1 + allBudgets.length) % allBudgets.length),
    preventScrollOnSwipe: true,
    trackMouse: true
  })

  return (
    <div onDoubleClick={() => setOpenAddScreen(prev => !prev)} style={{ maxWidth: "100rem",  background:"url()"}}>
      <Stack sx={{ padding: "2rem" ,marginTop:"3rem"}}>
        <Typography fontWeight="800" sx={{ color: "var(--color-75)", fontSize: "2rem", letterSpacing: "1.8px" }}>
          Good {phaseOfDay},  {capitalize(store.userData.name)}
        </Typography>
        <Typography variant="h5" fontWeight="800" sx={{ fontSize: "2rem", letterSpacing: "1.8px" }} color="black">
         
        </Typography>
      </Stack>
 {/* Dots Indicator */}
 <Stack direction="row" justifyContent="center" sx={{ mt: 2,mb:2 }}>
        {allBudgets.map((_, index) => (
          <div key={index} 
               onClick={() => setSelectedIndex(index)} 
               style={{
                 width: "10px",
                 height: "10px",
                 borderRadius: "50%",
                 margin: "0 5px",
                 backgroundColor: selectedIndex === index ? "black" : "gray",
                 cursor: "pointer"
               }} />
        ))}
      </Stack>
      <div {...handlers}>
        {allBudgets.length > 0 && <BudgetSummary budget={allBudgets[selectedIndex]} />}
      </div>

      <Stack sx={{ marginTop: "1rem", padding: "0 0 0 1rem" }}>
        <Typography variant="h6" fontWeight={600} sx={{ padding: ".5rem" }}>Todays Summary</Typography>
        <KPIs activeBudget={allBudgets[selectedIndex]} />
        {/* <Information data={{ dayLimit: 0, daySpent: 0 }} /> */}
        {allBudgets.length > 0 && <BudgetDetails budgetData={allBudgets[selectedIndex]} />}
      </Stack>

      <Stack>
        <Transactions budget={allBudgets[selectedIndex]??{}} />
      </Stack>

     
    </div>
  )
}

export default Home
