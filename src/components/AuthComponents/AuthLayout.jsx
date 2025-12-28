import React from 'react'
import authImage from '../../images/authImage.jpg'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <>
    <div className='w-screen h-screen flex flex-wrap justify-center items-center gap-9'>
        <div className='hidden md:w-1/3 rounded-2xl h-96 border-1 md:flex justify-center items-center '>
        <img src={authImage} alt="" />
        </div>
        <div className='w-1/2 md:w-1/3 h-96 rounded-2xl border-1 flex justify-center items-center bg-blue-500'><Outlet /></div>
    </div>
    </>
  )
}

export default AuthLayout