import React from 'react'
import Signup from "./pages/Signup";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './context/ContextProvider'; 

const App = () => {
  const {user}=useAuth();
  return (
    <BrowserRouter>
    <Routes>
     <Route 
          path="/" 
          element={user ? <Navigate to="/home" /> : <Signup />} 
        />

        <Route 
          path="/home" 
          element={user ? <Home /> : <Navigate to="/" />} 
        />

        <Route 
          path="/login" 
          element={user ? <Navigate to="/home" /> : <Login />} 
        />

        <Route 
          path="/register" 
          element={<Signup />} 
        />
    </Routes>
    <ToastContainer/>
    
    </BrowserRouter>
  )
}

export default App