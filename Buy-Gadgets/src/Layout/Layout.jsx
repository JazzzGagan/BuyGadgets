import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderTest from '../Components/Test/HeaderTest'
import Footer from '../Components/Footer/Footer'
import SafePayment from '../Components/Home/SafePayment'

const Layout = () => {
  return (
    <>
      <HeaderTest />
      <Outlet />
      <div className='relative top-[500px]'>
        <SafePayment />
        <Footer />
      </div>
      
    </>
  )
}

export default Layout
