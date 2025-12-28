import React, {useState} from 'react'

import AdminSideBar from './Sidebar'

import AdminHeader from './AdminHeader'

import { Outlet } from 'react-router-dom'

function AdminLayout() {
  const [openSideBar, setSideBarOpen] = useState(false);
  return (
    <>
      <div className='flex min-h-screen w-full'>
        {/* {Side bar} */}
        <AdminSideBar open={openSideBar} setOpen={setSideBarOpen} />
        <div className='flex flex-1 flex-col'>
          <AdminHeader setOpen={setSideBarOpen} />
          <main className='flex flex-1 bg-muted/40 p-4 md:p-6 flex-col'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminLayout