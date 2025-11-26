import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import Home from './pages/Home'
import ExploreMore from './pages/ExploreMore'
import SellerDashboard from './pages/SellerDashboard'
import Purchase from './pages/Purchase'
import Payment from './pages/Payment'
import AdminDashboard from './pages/AdminDashboard'

const App = () =>{
    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/explore' element={<ExploreMore/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/sellerdashboard' element={<SellerDashboard/>} />
            <Route path='/purchase/:artworkId' element={<Purchase/>} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/admindashboard' element={<AdminDashboard/>} />
        </Routes>
    )
}

export default App
