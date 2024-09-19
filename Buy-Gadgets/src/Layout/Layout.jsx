import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderTest from '../Components/Test/HeaderTest'
import Footer from '../Components/Footer/Footer'

const Layout = () => {
  return (
    <>
      <HeaderTest />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
