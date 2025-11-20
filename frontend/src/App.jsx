import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import Income from './Pages/Dashboard/Income'
import Home from './Pages/Dashboard/Home'
import Expense from './Pages/Dashboard/Expense'
import DashboardLayout from './Components/Layouts/DashboardLayout'
import Category from './Pages/Dashboard/Category'
import Reports from './Pages/Dashboard/Reports'
import { UserProvider } from './Context/UserContext'




const App = () => {
  return (

    
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              <Route path='/reports' element={<Reports />} />,
              <Route path="/categories" element={<Category />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    

  )
}

export default App

const Root = () => {
  const isAuthentiated = !!localStorage.getItem('token');

  if (isAuthentiated) {
    return <Navigate to='/dashboard' />
  } else {
    return <Navigate to='/login' />
  }
}