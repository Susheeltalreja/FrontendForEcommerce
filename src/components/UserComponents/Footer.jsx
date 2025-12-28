import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
function UserFooter() {
  const date = new Date();
  return (
    <Fragment>
      <div className="h-64 bg-black w-full text-white py-10 grid grid-cols-1 md:grid-cols-3 md:px-20 px-6">
        <div className="space-y-4">
          <h4 className='text-lg font-bold'>eCommerce</h4>
          <p className='text-gray-400'>Your one stop shop</p>
          <p className='text-gray-400'>&copy; {date.getFullYear()} eCommerce Copy rights reserved</p>
        </div>
        <div className="">
          <ul className='space-y-2'>
            <h3 className='text-lg font-bold'>Quick Links</h3>
            <li><Link to="/User/home">Home</Link></li>
            <li><Link to="/User/accounts">Accounts</Link></li>
            <li><Link to="/User/productsList">Products</Link></li>
            <li><Link to=""></Link>Blogs</li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="space-x-2">
            <input type="text" name="" id="" className='w-64 border-b outline-none p-2' placeholder='Enter your email' />
            <Button className="bg-red-500 hover:bg-red-700">Send Mail</Button>
          </div>
          <div className="flex gap-2">
            <Facebook className='w-8 h-8 hover:text-blue-600 transition'/>
            <Instagram className='w-8 h-8 hover:text-pink-500 transition'/>
            <Twitter className='w-8 h-8 hover:text-blue-400 transition'/>
            <Linkedin className='w-8 h-8 hover:text-blue-500 transition'/>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default UserFooter