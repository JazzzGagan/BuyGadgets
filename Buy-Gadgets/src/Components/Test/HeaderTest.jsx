import React, { useState, useContext, useEffect } from 'react'
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
import { AuthContext } from '../../context/AuthContext'
import DropDown from '../DropDown/DropDown'
import { dropDowndata } from '../DropDown/DropDownData'
import { CartContext } from '../../context/CartContext'

const HeaderTest = () => {
  const { user, logout } = useContext(AuthContext)
  const [showLogin, setShowLogin] = useState(false)
  const [dropdowns, setDropDowns] = useState({})
  const { cartCount } = useContext(CartContext)

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

      <header className="header-wrapper w-full h-[10vh] bg-black z-50">
        <div className="header-container w-[95%] h-[10vh] m-auto flex items-center justify-evenly">
          <div className="header-item w-[10%] h-[10vh] ">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="object-cover  cursor-pointer w-full h-full object-center"
              />
            </Link>
          </div>
          <nav className="header-item w-[80%] h-[10vh]  flex items-center text-sm justify-center">
            <ul className="flex space-x-5 items-center text-white cursor-pointer">
              {Object.keys(dropDowndata).map((brand, index) => (
                <li
                  key={index}
                  className="relative h-[10vh] flex items-center cursor-pointer  justify-center"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <Link to="/" className="hover:underline">
                    {brand.charAt(0).toUpperCase() + brand.slice(1)}{' '}
                    <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                  </Link>
                  {dropdowns[index] && <DropDown items={dropDowndata[brand]} />}
                </li>
              ))}
              {/* 
              <li
                className="relative h-[10vh] flex items-center cursor-pointer  justify-center"
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={() => handleMouseLeave(0)}
              >
                <Link to="/" className="hover:underline">
                  Apple <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[0] && <DropDown menuItems={dropDowndata.apple} />}
              </li>
               
              <li
                className="relative h-[10vh] flex items-center justify-center "
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={() => handleMouseLeave(1)}
              >
                <Link to="/" className="hover:underline">
                  Marshall{' '}
                  <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[1] && <DropDown  menuItems={dropDowndata.marshall}/>}
              </li>
              <li
                className="relative h-[10vh] flex items-center justify-center "
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={() => handleMouseLeave(2)}
              >
                <Link to="/" className="hover:underline">
                  Bose <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[2] && <DropDown />}
              </li>
              <li
                className="relative h-[10vh] flex items-center justify-center "
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={() => handleMouseLeave(3)}
              >
                <Link to="/" className="hover:underline">
                  JBL <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[3] && <DropDown />}
              </li>
              <li
                className="relative h-[10vh] flex items-center justify-center "
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
                className="relative h-[10vh] flex items-center justify-center "
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={() => handleMouseLeave(5)}
              >
                <Link className="hover:underline">
                  Belkin <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[5] && <DropDown />}
              </li>
              <li
                className="relative h-[10vh] flex items-center justify-center "
                onMouseEnter={() => handleMouseEnter(6)}
                onMouseLeave={() => handleMouseLeave(6)}
              >
                <Link to="/" className="hover:underline">
                  Momax <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[6] && <DropDown />}
              </li>
              <li
                className="relative h-[10vh] flex items-center justify-center "
                onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={() => handleMouseLeave(7)}
              >
                <Link to="/" className="hover:underline">
                  Brands <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
                {dropdowns[7] && <DropDown />}
              </li> */}
              <li className="relative h-[10vh] flex items-center justify-center ">
                <Link to="/" className="hover:underline">
                  Our Stores
                </Link>
              </li>
              <li className="relative h-[10vh] flex items-center justify-center ">
                <Link to="/" className="hover:underline">
                  EMI
                </Link>
              </li>
              <li className="relative h-[10vh] flex items-center justify-center ">
                <Link to="/" className="hover:underline">
                  Service <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </Link>
              </li>
              <li className="bg-[#ff0000] rounded-full p-3 hover:underline">
                <Link to="/">Special Deals </Link>
              </li>
            </ul>
          </nav>
          <div className="header-item w-[10%] h-[10vh]  text-white flex items-center justify-center text-xl space-x-3 cursor-pointer">
            <FontAwesomeIcon icon={faSearch} />
            <div className="w-6 h-12 mb-6 flex flex-col items-center justify-center cursor-pointer">
              {cartCount >= 0 && (
                <span className="bg-slate-200 text-black text-sm border text-center rounded-full w-5 h-5 mr-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <Link to="/cartitems">
                <span>
                  <FontAwesomeIcon icon={faBagShopping} />
                </span>
              </Link>
            </div>

            {user ? (
              <div
                className="relative hover:underline  h-[10vh] flex items-center justify-center text-base space-x-1 z-50"
                onMouseEnter={() => handleMouseEnter(8)}
                onMouseLeave={() => handleMouseLeave(8)}
              >
                <span>
                  {capitalInitialLetter(user)}{' '}
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
                {dropdowns[8] && (
                  <div className="dropdown absolute top-full right-0 w-[150px] h-[18vh] bg-[#eaeaea] text-black border border-[#bebfbf] shadow-md">
                    <div className="flex flex-col w-full h-full ">
                      <ul className="flex flex-col justify-evenly  h-full cursor-pointer">
                        <li className="text-center">My Account</li>
                        <Link to="/payment-sucess">
                          <li className="text-center cursor-pointer">
                            Order History
                          </li>
                        </Link>
                        <button
                          className="text-center cursor-pointer"
                          onClick={logout}
                        >
                          Logout
                        </button>
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

export default HeaderTest
