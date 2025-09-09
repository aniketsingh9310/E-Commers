import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContex from './context/authContex.jsx'
import UserContex from './context/UserContex.jsx'
import ShopContext from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContex>
      <UserContex>
      <ShopContext>
        <App />
      </ShopContext>
      </UserContex>
    </AuthContex> 
  </BrowserRouter>,
)
