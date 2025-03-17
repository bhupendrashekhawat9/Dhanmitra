import { useContext, useEffect, useState } from 'react'
import './App.css'
import './index.css'

import { SectionTypes } from './types/types'
import { Context, ContextType } from './Context'
import { Haptics } from "@capacitor/haptics"
import AppRouter from './route/Router'
import Navbar from './components/Navigation/NavBar'
import RegisterUser from './components/User/Register/RegisterUser'

function App() {
  const [openActionDialog, setOpenActionDialog] = useState(false);

  const [sectionOnFocus, setsectionOnFocus] = useState<SectionTypes>("HOME")
  const { store, updateContextStore } = useContext(Context) as ContextType

  let applicationData: ContextType["store"]["application"] = store.application
  let focusedModule = applicationData.path
  const toggleDrawer = async () => {
    setOpenActionDialog(!openActionDialog);
    if (!openActionDialog) {
      await Haptics.vibrate()
    }
  }
  useEffect(() => {
    // handleFocusTarget()
    setsectionOnFocus(applicationData.path)
  }, [applicationData.path])

  let isUserRegistered = (store?.userData?.name)


  return (
<>
    {
      isUserRegistered && <div style={{
        maxWidth:"1200px",
        height:"100vh",
        overflow:"auto",
        margin:"auto",
        paddingBottom:"8rem"
      }} onDoubleClick={() => !openActionDialog ? toggleDrawer() : null}>    
        
        <AppRouter/>
         <Navbar/>
      </div>
    }
    {
      !isUserRegistered && <RegisterUser/>
    }
  
    </>

  )
}

export default App
