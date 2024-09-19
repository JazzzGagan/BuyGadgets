import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Logo from '../assets/images/logo.jpg'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login = ({ toggleLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState()
  const [isVisible, setVisible] = useState(false)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  useEffect(() => {
    setVisible(true)
  }, [])

  const toogleForm = () => {
    setIsLogin(!isLogin)
  }

  const onSubmit = () => {
    if (Login) {
      console.log('Loggin in with ', { email, password })
    } else {
      console.log('Loggin in with ', { firstName, lastName, email, password })
    }
  }
  watch('password: ')

  return (
    <div
      className={`absolute inset-0 w-[50%] h-[70vh]  bg-black  text-white m-auto transform transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <FontAwesomeIcon
        icon={faXmark}
        className="text-3xl font-extralight absolute right-0 top-0 cursor-pointer  "
        style={{ fontWeight: 100 }}
        onClick={() => {
          setVisible(false)
          setTimeout(() => toggleLogin(), 500)
        }}
      />
      <div className="w-[60%] h-[70vh] flex flex-col items-center justify-start m-auto ">
        <div className="w-[90%] h-[20vh] flex flex-col items-center justify-center">
          <div className="w-[30%] h-[10vh] m-4 ">
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
        <div className="w-[100%] h-[60vh] m-6  flex flex-col items-center justify-start p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={
              isLogin
                ? 'flex flex-col items-center justify-center w-full '
                : 'flex flex-col items-center justify-evenly w-full space-y-4 '
            }
          >
            {!isLogin && (
              <>
                <input
                  {...register('firstName', {
                    required: 'First Name is required',
                  })}
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100 "
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <input
                  {...register('lastName', {
                    required: 'Last Name is required',
                  })}
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100 "
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
              </>
            )}

            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
              type="email"
              placeholder={isLogin ? 'Your email address...' : 'Your Email '}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              noValidate
              className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100 "
            />
            {errors.email && <p>{errors.email.message}</p>}
            <br />

            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              placeholder={isLogin ? 'Your password...' : 'Enter Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100 "
            />
            {errors.password && <p>{errors.password.message}</p>}

            {!isLogin && (
              <input
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100 "
              />
            )}
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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
                <div className="flex w-full items-center justify-around  p-2">
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
                  <button onClick={toogleForm}>
                    Not a member yet? Sign Up.
                  </button>
                </div>
              </>
            )}
            {!isLogin && (
              <div className="flex flex-col items-center justify-center m-4">
                <button onClick={toogleForm}>Already a member? Login.</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
