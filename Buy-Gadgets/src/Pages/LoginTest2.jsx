import * as yup from 'yup'

import React, { useContext, useEffect, useState } from 'react'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

import { AuthContext } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../assets/images/logo.jpg'
import axios from 'axios'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from 'jwt-decode'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const LoginTest2 = ({ toggleLogin }) => {
  const { login } = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true)
  const [isVisible, setVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  const signupSchema = yup.object().shape({
    firstName: yup
      .string()
      .max(20, 'First name should be less then 20 characters')
      .required('firstname is required'),
    lastName: yup
      .string()
      .max(20, 'Last name should be less then 20 characters')
      .required('lastname is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })

  const schema = isLogin ? loginSchema : signupSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    // watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setVisible(true)
  }, [])

  const toggleForm = () => {
    setIsLogin((prev) => {
      resetForm()
      setErrorMessage('')

      return !prev
    })
  }

  // const watchField = watch()

  // console.log(watchField)

  const onSubmit = async (data) => {
    setErrorMessage('')
    resetForm()
    if (isLogin) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/users/login',
          {
            email: data.email,
            password: data.password,
          }
        )
        const { accessToken } = response.data
        login(accessToken)

        /* console.log(JSON.stringify(response.data)) */
        /*  const decode = jwtDecode(accessToken) */

        alert('Login successful!')
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || error.message || 'An error occurred'
        setErrorMessage(errorMsg)
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/users/register',
          {
            firstname: data.firstName,
            lastname: data.lastName,
            email: data.email,
            password: data.password,
          }
        )
        console.log(`Signing with: ${response.data}`)
        alert('Signup successful!')
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || error.message || 'An error occurred'
        setErrorMessage(errorMsg) // Set error message as a string
      }
    }
  }

  return (
    <div
      className={`absolute inset-0 w-[50%] h-[90vh] z-50 bg-black text-white m-auto transform transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <FontAwesomeIcon
        icon={faXmark}
        className="text-3xl font-extralight absolute right-0 top-0 cursor-pointer"
        style={{ fontWeight: 100 }}
        onClick={() => {
          setVisible(false)
          setTimeout(() => toggleLogin(), 500)
        }}
      />
      <div className="w-[60%] h-[70vh] flex flex-col items-center justify-start m-auto">
        <div className="w-[90%] h-[20vh] flex flex-col items-center justify-center">
          <div className="w-[30%] h-[10vh] m-4">
            <img
              src={Logo}
              alt="logo"
              className="object-contain object-center"
            />
          </div>
          <h2 className="text-3xl font-medium">
            {isLogin ? 'LOGIN' : 'SIGNUP'}
          </h2>
        </div>
        <div className="w-[100%] h-[60vh] m-6 flex flex-col items-center justify-start p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={
              isLogin
                ? 'flex flex-col items-center justify-center w-full'
                : 'flex flex-col items-center justify-evenly w-full space-y-4'
            }
          >
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            {!isLogin && (
              <>
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="First Name"
                  autoComplete="off"
                  className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
                />

                <p className="text-red-500">{errors.firstName?.message}</p>

                <input
                  {...register('lastName')}
                  type="text"
                  autoComplete="off"
                  placeholder="Last Name"
                  className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
                />

                <p className="text-red-500">{errors.lastName?.message}</p>
              </>
            )}

            <input
              {...register('email')}
              type="email"
              autoComplete="off"
              placeholder={isLogin ? 'Your email address...' : 'Your Email'}
              className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
            />

            <p className="text-red-500">{errors.email?.message}</p>

            <br />

            <input
              {...register('password')}
              type="password"
              placeholder={isLogin ? 'Enter your password' : 'your password...'}
              className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
            />

            <p className="text-red-500">{errors.password?.message}</p>

            {!isLogin && (
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm Password"
                className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
              />
            )}

            <p className="text-red-500">{errors.confirmPassword?.message}</p>

            <br />
            <button
              type="submit"
              className="w-full h-[5vh] font-bold bg-[#6c757d]"
            >
              {isLogin ? 'LOGIN' : 'SIGNUP'}
            </button>
            {isLogin && (
              <>
                <hr className="border-t-2 border-[#6c757d] w-full my-2" />
                <h2>Login with your social media account</h2>
                <div className="flex w-full items-center justify-around p-2">
                  <a
                    href="https://www.linkedin.com/in/gagan-sunar-01375322a/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-700 w-40 h-10 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faGoogle} className="anchor-icon" />
                    &nbsp;Google
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gagan-sunar-01375322a/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-700 w-40 h-10 flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="anchor-icon"
                    />
                    &nbsp;Facebook
                  </a>
                </div>
                <div className="flex flex-col items-center justify-center m-4">
                  <p>Forgot Password?</p>
                  <button onClick={toggleForm}>
                    Not a member yet? Sign Up.
                  </button>
                </div>
              </>
            )}
            {!isLogin && (
              <div className="flex flex-col items-center justify-center m-4">
                <button onClick={toggleForm}>Already a member? Login.</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
export default LoginTest2
