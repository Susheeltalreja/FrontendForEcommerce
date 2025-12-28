import { ShieldUser } from 'lucide-react'
import React, { Fragment } from 'react'

import { useNavigate } from 'react-router-dom'

import { LayoutDashboard, ShoppingCart, ListOrdered } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const SideBarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/product",
    icon: <ShoppingCart />
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ListOrdered />
  }
]

function SideBarMenu({setOpen}) {
  const navigate = useNavigate();
  return (
    <nav className='mt-1 flex flex-col gap-3'>
      {SideBarItems.map((items) => (
        <div key={items.id} className='flex gap-4 cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-md'
         onClick={() => {
          navigate(items.path)
          setOpen ? setOpen(false) : null
          }}>
          <span>{items.icon}</span>
          <h3 className='font-bold'>{items.label}</h3>
        </div>
      ))}

    </nav>
  )
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className="w-64">
          <SheetHeader>
            <SheetTitle>
              <div className='flex gap-2 items-center cursor-pointer' onClick={() => navigate('/admin/dashboard')}>
                <ShieldUser size={30} />
                <h1 className='font-bold'>Admin Dashboard</h1>
              </div>
            </SheetTitle>
          </SheetHeader>
          <SideBarMenu setOpen={setOpen} />
        </SheetContent>
      </Sheet>


      <aside className='hidden w-64 flex-col shadow-2xl py-4 items-center lg:flex border-r'>
        <div className='flex gap-2 items-center cursor-pointer' onClick={() => navigate('/admin/dashboard')}>
          <ShieldUser size={30} />
          <h1 className='font-bold'>Admin Dashboard</h1>
        </div>
        <SideBarMenu />
      </aside>
    </Fragment>
  )
}

export default AdminSideBar