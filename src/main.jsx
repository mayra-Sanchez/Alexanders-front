import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RoutesProject from './router/RoutesProject.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesProject />
  </StrictMode>,
)
