import React, { useEffect, useState } from 'react'
import Login from '../../Pages/Login'

import axios from 'axios'
import HeroSection from './HeroSection'
import SafePayment from './SafePayment'

const Home = () => {
  const [users, setUsers] = useState([])
  const renderItems = users.map((user) => <li key={user.age}>{user.name}</li>)
  /* 
  useEffect(() => {
    axios.get('http://127.0.0.1:3000').then((Response) => {
      setUsers(Response.data.users)
    })
  }, [users]) */

  return (
    <div className="w-full h-[140vh] flex flex-col   ">
      <HeroSection />

      <SafePayment />
    </div>
  )
}

export default Home
