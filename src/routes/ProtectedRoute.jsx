import React, { useContext } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { MyStore } from '../context/Auth'

const ProtectedRoute = () => {

    const navigate=useNavigate()
    const { loggedInUser } = useContext(MyStore)
    
    if (!loggedInUser) {
        return <Navigate to='/' />
    }

  return <Outlet />
}

export default ProtectedRoute
