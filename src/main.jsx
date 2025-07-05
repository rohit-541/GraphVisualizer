import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { GraphContextProvider } from './Context/GraphContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GraphContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GraphContextProvider>
  </StrictMode>,
)
