/* eslint-disable react/prop-types */
import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { json } from 'react-router-dom'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null)
  const [user, setUser] = useState(null)

  /*   const decode = jwtDecode(authToken)
  console.log(decode.user)
  
 */

  useEffect(() => {
    const storeToken = localStorage.getItem('authToken')

    if (storeToken) {
      try {
        const decode = jwtDecode(storeToken)
        setUser(decode.user)
      } catch (error) {
        console.error('Error decoding token', error)
      }
    } else {
      setUser(null)
    }
  }, [authToken])

  const login = (token) => {
    setAuthToken(token)

    localStorage.setItem('authToken', token)
    try {
      const decode = jwtDecode(token)
      setUser(decode.user)
    } catch (error) {
      console.error('Error decoding token', error)
    }
  }

  const logout = () => {
    setAuthToken(null)
    setUser(null)
    localStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider value={{ authToken, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
