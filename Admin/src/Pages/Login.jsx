import * as yup from 'yup'

import React, { useContext, useState } from 'react'

import Logo from '../assets/images/logo.jpg'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

const LoginTest2 = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const schema = loginSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    // watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  // const watchField = watch()

  // console.log(watchField)

  const onSubmit = async (data) => {
    setErrorMessage(''), setSuccessMessage('')

    try {
      const response = await axios.post(
        'http://localhost:3000/api/admin/login',
        {
          email: data.email,
          password: data.password,
        }
      )
      const { accessToken } = response.data
      login(accessToken)

      setSuccessMessage('Login SucessFully')
      setTimeout(() => {
        navigate('/'), resetForm()
      }, 1000)

      /* console.log(JSON.stringify(response.data)) */
      /*  const decode = jwtDecode(accessToken) */
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || 'An error occurred'
      setErrorMessage(errorMsg)
    }
  }

  return (
    <div className="absolute inset-0 w-[50%] h-[75vh] z-50 bg-black text-white m-auto ">
      <div className="w-[60%] h-[70vh] flex flex-col items-center justify-start m-auto">
        <div className="w-[90%] h-[20vh] flex flex-col items-center justify-center">
          <div className="w-[30%] h-[10vh] m-4">
            <img
              src={Logo}
              alt="logo"
              className="object-contain object-center"
            />
          </div>
          <h2 className="text-3xl font-medium">LOGIN</h2>
        </div>
        <div className="w-[100%] h-[60vh] m-6 flex flex-col items-center justify-start p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center w-full"
          >
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}

            <input
              {...register('email')}
              type="email"
              autoComplete="off"
              placeholder="Your email address..."
              className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
            />

            <p className="text-red-500">{errors.email?.message}</p>

            <br />

            <input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
              className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
            />

            <p className="text-red-500">{errors.password?.message}</p>

            <br />
            <button
              type="submit"
              className="w-full h-[5vh] font-bold bg-[#6c757d]"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default LoginTest2
