import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { MyStore } from '../context/Auth'

const AuthRoute = () => {

  const { loggedInUser } = useContext(MyStore)
  
  if (loggedInUser) {
   return <Navigate to='/main' />
  }
  return <Outlet />
}

export default AuthRoute
