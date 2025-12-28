import React from 'react'

import UserNavbar from './Navbar';
import UserFooter from './Footer';

import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
      <div className='flex flex-col w-full'>
        {/* navbar  */}
        <UserNavbar />
        <main className='flex flex-col w-full'>
          <Outlet />
        </main>
        <UserFooter />
      </div>
    </>
  )
}

export default UserLayout;