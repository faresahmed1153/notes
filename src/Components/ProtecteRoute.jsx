import jwt_decode from 'jwt-decode'
import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from './Home'

function ProtecteRoute() {
  
    const token = localStorage.getItem("token")

    try{
        jwt_decode(token)
    }catch(error){
        return <Navigate to="/login"/>
    }
    return <Home/>
    
}

export default ProtecteRoute
