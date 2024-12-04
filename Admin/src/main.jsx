import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from '../../Buy-Gadgets/src/context/CartContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
