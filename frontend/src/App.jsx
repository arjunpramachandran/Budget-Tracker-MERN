import React from 'react'
import { BrowserRouter as Router ,Routes,Route,Navigate} from 'react-router-dom'
import { Login } from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import Income from './Pages/Dashboard/Income'
import Home from './Pages/Dashboard/Home'
import Expense from './Pages/Dashboard/Expense'
import { UserProvider } from './Context/userContext'


const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/dashboard' element={<Home/>} />
          <Route path='/income' element={<Income/>} />
          <Route path='/expense' element={<Expense/>} />
        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App

const Root = () => {
  const isAuthentiated = !!localStorage.getItem('token');
  
  if(isAuthentiated){
    return <Navigate to = '/dashboard' />
  }else{
    return <Navigate to = '/login' />
  }
}