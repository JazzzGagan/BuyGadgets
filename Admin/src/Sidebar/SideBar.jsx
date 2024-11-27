import { useContext, useState } from 'react'
import LogoS from '../assets/images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaXmark, FaCaretDown, FaCaretUp } from 'react-icons/fa6'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import MenuData from '../Components/MenuData/MenuData'
import{faSignOut} from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ toogleSidebar, isVisible }) => {
  const { logout } = useContext(AuthContext)
  const [submenuOpen, setSubmenuOpen] = useState(false) // State to manage dropdown

  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen)

  return (
    <div
      className={`nav-bar w-56 h-full absolute top-0 left-0 z-3 bg-black text-white flex flex-col justify-between ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300`}
    >
      <button onClick={toogleSidebar}>
        <FaXmark className="text-4xl absolute right-2 top-4 cursor-pointer" />
      </button>
      <Link className="logo p-8" to="/">
        <img src={LogoS} alt="Logo" className="block m-auto h-auto w-full" />
      </Link>

      <nav className="flex flex-col items-start justify-evenly w-full h-[60vh] space-y-6 px-4 mt-10 text-2xl">
        {MenuData.map((item, index) => (
          <div key={index}>
            <NavLink
              className="flex items-center space-x-2 w-full py-3 pl-4 rounded-lg hover:bg-slate-500"
              exact="true"
              activeclassname="active"
              to={item.path}
              onClick={item.submenu ? toggleSubmenu : () => toogleSidebar()}
            >
              <FontAwesomeIcon icon={item.icon} color="#4d4d4e" />
              <p>{item.title}</p>
              {item.submenu && (
                <span className="ml-auto">
                  {submenuOpen ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              )}
            </NavLink>

            {/* Submenu for Products */}
            {item.submenu && submenuOpen && (
              <div className="ml-8">
                {item.submenu.map((subItem, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={subItem.path}
                    className="block py-2 pl-4 text-sm hover:bg-slate-400 rounded-lg"
                    onClick={toogleSidebar}
                  >
                    {subItem.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <ul className="w-full bg-slate-500 flex items-center justify-center text-2xl py-2">
        <li className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover: rounded-lg">
          <FontAwesomeIcon icon={faSignOut} color="#4d4d4e" />
          <p onClick={logout}>Logout</p>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
