import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './theme.css'
import App from './App.tsx'
import { ContextProvider } from './Context.tsx'
import { MemoryRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ContextProvider>
      <MemoryRouter>

    <App />
      </MemoryRouter>
     </ContextProvider>
  </StrictMode>,
)
