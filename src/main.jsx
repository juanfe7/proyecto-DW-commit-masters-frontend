import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Renderiza la aplicacion React en el elemento con id 'root'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Componente principal de la aplicacion */}
  </StrictMode>,
)
