import React from 'react'
import Nav from './components/Nav'
import { Outlet } from 'react-router'
import SideBar from './components/SideBar'

const App = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Nav />
      <div className='grid grid-cols-[20%_80%] flex-1 h-full overflow-hidden'>
        <SideBar />
        <div className='overflow-y-auto h-full bg-[#F7F8FF]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
