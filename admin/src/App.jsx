import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Order from './pages/Order'
import Login from './pages/Login'
import { adminDataContext } from './context/AdminContext'
 import { ToastContainer, toast } from 'react-toastify';

const App = () => {
    let {adminData} = useContext(adminDataContext)
  return (
    <>
      <ToastContainer />
    {!adminData ? <Login/> : <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/lists' element={<Lists/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </>
    }
    </>
    
  )
}

export default App