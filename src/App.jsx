import './App.css'

import { Routes, Route } from 'react-router-dom'
//Admin Layout
import AdminLayout from './components/AdminComponents/Layout'

// Admin pages 
import AdminDashboard from './pages/adminPages/dashboard'
import AdminOrders from './pages/adminPages/orders'
import AdminProducts from './pages/adminPages/products'

//User Layout
import UserLayout from './components/UserComponents/UserLayout'
//User Pages
import UserHome from './pages/userPages/Home'
import UserProducts from './pages/userPages/Listing'
import UserCheckout from './pages/userPages/checkOut'
import UserAccounts from './pages/userPages/accounts'

//Auth Layout
import AuthLayout from './components/AuthComponents/AuthLayout'
//Auth Pages
import Login from './pages/authPages/Login'
import Register from './pages/authPages/Register'
import NotFoundPage from './pages/notFoundPage/notfound'
import OtpVerificationForm from './pages/authPages/OtpVerificationForm'
import ForgetPasswordF1 from './pages/authPages/ForgetPasswordForm1'
//authentication component
import RouteAuth from './components/CommonComponents/authentiction'

//useSelector() => redux => help us to get / use the state from redux store

import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { CheckUser } from './ReduxStates/authentication'
import ForgetPasswordF2 from './pages/authPages/ForgetPasswordForm2'
import RenderRootPage from './components/CommonComponents/RenderRootPage'


function App() {

  const {isAuth, user, authLoad} = useSelector(state => state.Auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckUser())
  }, [dispatch])

  if(!authLoad) return <div>Loading....</div>
  // console.log(user);

  return (
    <>
      <Routes>
        <Route path='/' element={<RenderRootPage />}></Route>
        {/* Admin Routes  */}
        <Route path='/admin' element={
          <RouteAuth isAuth={isAuth} UserData={user}>
            <AdminLayout />
          </RouteAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />}></Route>
          <Route path='orders' element={<AdminOrders />}></Route>
          <Route path='product' element={<AdminProducts />}></Route>
        </Route>

        {/* User Routes  */}
        <Route path='/User' element={<RouteAuth isAuth={isAuth} UserData={user}>
          <UserLayout />
        </RouteAuth>}>
          <Route path='home' element={<UserHome />}></Route>
          <Route path='productslist' element={<UserProducts />}></Route>
          <Route path='checkout' element={<UserCheckout />}></Route>
          <Route path='accounts' element={<UserAccounts />}></Route>
        </Route>

        {/* Auth Components  */}
        <Route path='/auth' element={
          <RouteAuth isAuth={isAuth} UserData={user}>
            <AuthLayout />
          </RouteAuth>
        }>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='otp' element={<OtpVerificationForm />}></Route>
          <Route path="forget" element={<ForgetPasswordF1/>}></Route>
          <Route path='update' element={<ForgetPasswordF2 />}></Route>
        </Route>

        {/* Not found page  */}
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  )
}

export default App
