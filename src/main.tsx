import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AgentProvider } from './Provider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AgentProvider>
      <App />
    </AgentProvider>
  </StrictMode>,
)
