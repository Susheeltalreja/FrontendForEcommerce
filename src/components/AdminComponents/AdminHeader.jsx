import React from 'react'

import { Menu, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '@/ReduxStates/authentication';
import { toast } from 'sonner';

function AdminHeader({setOpen}) {

  const dispatch = useDispatch();
  function handleLogout(){
    dispatch(LogoutUser()).then((data) => {
      if(data?.payload?.success){
        toast.success(`${data?.payload.message}`);
      }else{
        toast.error(`${data?.payload.message}`);
      }
    })
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <button onClick={() => setOpen(true)} className='lg:hidden block bg-black px-2 py-1 rounded-md text-white cursor-pointer'>
        <Menu />
      </button> 
      <div className="flex justify-end w-full">
        <button className='bg-black px-2 py-1 rounded-md text-white cursor-pointer flex gap-2'
        onClick={handleLogout}
        >
          <LogOut />
          <span className='font-bold'>Logout</span>
        </button>
      </div>
    </header>
  )
}

export default AdminHeader