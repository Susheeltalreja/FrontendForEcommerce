import { HouseHeart, CircleUser, LogOut, HamburgerIcon, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { LogoutUser } from '@/ReduxStates/authentication'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import CartDetails from './CartDetails'


const LinksConfig = [
  {
    id: "home",
    label: "Home",
    path: "/User/home"
  },
  {
    id: "men",
    label: "Men",
    path: "/User/productsList"
  },
  {
    id: "women",
    label: "Women",
    path: "/User/productsList"
  },
  {
    id: "kids",
    label: "Kids",
    path: "/User/productsList"
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/User/productsList"
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/User/productsList"
  },
]

function NavLinks({ setOpen }) {
  return (
    <nav className='flex md:flex-row flex-col gap-3'>
      {
        LinksConfig.map(items => <Link className='font-bold' key={items.id} to={items.path}
          onClick={() => setOpen(false)}
        >{items.label}</Link>)
      }
    </nav>
  )
}

function RightSideComponent({setOpenCart}) {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.Auth);

  function handleLogout() {
    dispatch(LogoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success(`${data?.payload.message}`);
      } else {
        toast.error(`${data?.payload.message}`);
      }
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback className=" bg-black text-white font-bold cursor-pointer">{user.name.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" side='right'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/User/accounts" className='flex gap-2'>
            <CircleUser />
            <span className='font-medium'>Account</span></Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className='flex gap-2' onClick={handleLogout}>
            <LogOut />
            <span className='font-medium'>Logout</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button className="flex md:hidden w-full" variant="outline" size="icon" onClick={() => setOpenCart(true)}>
            <ShoppingCart />
            <span className='font-medium'>Cart</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



function UserNavbar() {
  const { isAuth } = useSelector(state => state.Auth);
  const [Open, setOpen] = useState(false);

  const [openCart, setOpenCart] = useState(false);

  return (
    <header className='h-16'>
      <div className="h-16 flex justify-between items-center border-b px-4 md:px-6 fixed top-0 w-full z-30 bg-white">
        <Link className="flex gap-2" to="/User/home">
          <HouseHeart />
          <span className='font-bold'>eCommerce</span>
        </Link>
        <div className='hidden md:block'>
          <NavLinks />
        </div>
        <div className='flex gap-2'>

          <Button className="flex md:hidden" variant="outline" size="icon"
            onClick={() => setOpen(true)}
          >
            <HamburgerIcon />
          </Button>
          {
            isAuth ? <div>
              <RightSideComponent setOpenCart={setOpenCart}/>
            </div> : "hello"
          }
          <Button className="md:flex hidden" variant="outline" size="icon" onClick={() => setOpenCart(true)}>
            <ShoppingCart />
          </Button>
        </div>


        <Sheet open={Open} onOpenChange={setOpen}>
          <SheetContent side='left' className="px-2 w-64">
            <SheetHeader>
              <SheetTitle>
                <span>Side Bar</span>
              </SheetTitle>
            </SheetHeader>
            <NavLinks setOpen={setOpen} />

          </SheetContent>
        </Sheet>
      </div>

      <CartDetails openCart={openCart} setOpenCart={setOpenCart}/>
    </header>
  )
}

export default UserNavbar