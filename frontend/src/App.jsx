import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import Home from './pages/Home'
import ExploreMore from './pages/ExploreMore'

const App = () =>{
    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/explore' element={<ExploreMore/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
    )
}

export default App
