import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faBagShopping,
  faUser,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.jpg'
import LoginTest2 from '../../Pages/LoginTest2'

import DropDown from './DropDown/DropDown'

const Header = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [dropdowns, setDropDowns] = useState({})

  const capitalInitialLetter = (user) => {
    return user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)
  }

  const toggleLogin = () => {
    setShowLogin(!showLogin)
  }
  const handleMouseEnter = (index) => {
    setDropDowns((prev) => ({ ...prev, [index]: true }))
  }
  const handleMouseLeave = (index) => {
    setDropDowns((prev) => ({ ...prev, [index]: false }))
  }

  return (
    <>
      {showLogin && <LoginTest2 toggleLogin={toggleLogin} />}

      <header className=" font-avenir header-wrapper w-full h-[10vh] bg-black">
        <div className="header-container w-[95%] h-[10vh] m-auto flex items-center justify-evenly">
          <div className="header-item w-[10%] h-[10vh] ">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="object-cover cursor-pointer  w-full h-full object-center"
              />
            </Link>
          </div>
          <nav className="header-item w-[80%] h-[10vh]  flex items-center text-sm justify-center">
            <ul className="flex space-x-5 h-[10vh]  items-center text-white cursor-pointer">
              <li
                className="relative  bg-slate-400 "
                onMouseOver={() => handleMouseEnter(0)}
                onMouseLeave={() => handleMouseLeave(0)}
              >
                <Link to="/" className="hover:underline">
                  Apple <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[0] && <DropDown />}
              </li>
              <li
                className="relative "
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={() => handleMouseLeave(1)}
              >
                <Link to="/" className="hover:underline">
                  Marshall{' '}
                  <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[1] && <DropDown />}
              </li>
              <li
                className="relative "
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={() => handleMouseLeave(2)}
              >
                <Link to="/" className="hover:underline">
                  Bose <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[2] && <DropDown />}
              </li>
              <li
                className="relative "
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={() => handleMouseLeave(3)}
              >
                <Link to="/" className="hover:underline">
                  JBL <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[3] && <DropDown />}
              </li>
              <li
                className="relative "
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={() => handleMouseLeave(4)}
              >
                <Link to="/" className="hover:underline">
                  Accessories{' '}
                  <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[4] && <DropDown />}
              </li>
              <li
                className="relative "
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={() => handleMouseLeave(5)}
              >
                <Link className="hover:underline">
                  Belkin <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[5] && <DropDown />}
              </li>
              <li
                className="relative "
                onMouseOver={() => handleMouseEnter(6)}
                onMouseLeave={() => handleMouseLeave(6)}
              >
                <Link to="/" className="hover:underline">
                  Momax <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[6] && <DropDown />}
              </li>
              <li
                className="relative "
                onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={() => handleMouseLeave(7)}
              >
                <Link to="/" className="hover:underline">
                  Brands <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[7] && <DropDown />}
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Our Stores
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  EMI
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Service <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
              </li>
              <li className="bg-[#ff0000] rounded-full p-3 hover:underline">
                <Link to="/">Special Deals </Link>
              </li>
            </ul>
          </nav>
          <div className="header-item w-[10%] h-[10vh] bg-slate-500 text-white flex items-center justify-center text-2xl space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faBagShopping} />

            {user ? (
              <div
                className="relative hover:underline text-base space-x-1"
                onMouseEnter={() => handleMouseEnter(8)}
                onMouseLeave={() => handleMouseLeave(8)}
              >
                <span>
                  {capitalInitialLetter(user)}{' '}
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
                {dropdowns[8] && (
                  <div className="dropdown absolute  top-11 right-0 mt-2 mr-5 w-[150px] h-[18vh] bg-[#eaeaea] text-black border border-[#bebfbf] shadow-md">
                    <div className="flex flex-col w-full h-full ">
                      <ul className="flex flex-col justify-evenly  h-full cursor-pointer">
                        <li className="text-center">My Account</li>
                      <Link to="/payment-sucess">
                        <li className="text-center">Order History</li>
                      </Link>
                        <li className="text-center">Logout</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <FontAwesomeIcon icon={faUser} onClick={toggleLogin} />
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
