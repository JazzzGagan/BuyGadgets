import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="w-full h-[60vh] flex flex-col text-xl font-medium items-center justify-center text-white bg-black">
      <div className="flex items-center justify-center w-full h-[20vh] text-m text-white bg-red-600">
        <div className="w-[95%] h-[12vh] flex items-center justify-between p-4 text-xl">
          <form action="#" className="space-y-4">
            <p>Weekly Newsletter</p>
            <input
              className="bg-transparent border-0 border-b-2 border-white text-white placeholder-white focus:outline-none"
              type="email"
              placeholder="Enter your email..."
            />
            <button className="font-bold">SUBSCRIBE</button>
          </form>
          <div className="quickLinks space-x-4 text-xl">
            <Link to="/home">Home</Link>
            <Link to="/Artists">Artists</Link>
            <Link to="/Merch">Merch</Link>
            <Link to="/CrowdFunding">Crowd Funding</Link>
          </div>
        </div>
      </div>
      <div className="container-bottom flex items-center justify-center  w-full min-w-14 flex-grow">
        <div className="w-[95%] h-[30vh] flex items-center justify-between m-auto ">
          <div className="w-[40%] h-[30vh] ">
            <div className="logo w-[20%] h-[10vh] ">
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <Link to="/About">About</Link>
            <br />
            <Link to="/Contact Us">Contact Us</Link>
            <div className="copyright mt-10">
              <p>© 2024 ByMusic</p>
              <br />
              <Link to="/About" className='font-thin'>Terms and Conditions</Link>&nbsp;
              <Link to="/About" className='font-thin'>Privacy Policy</Link>
            </div>
          </div>
          <div className="community w-[40%] h-[15vh] flex flex-col items-start justify-center mt-20">
            <div className="space-x-4 text-4xl">
              <a
                href="https://www.facebook.com/YourPage"
                target="_blank"
                rel="noopener noreferrer"
               
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.instagram.com/YourProfile"
                target="_blank"
                rel="noopener noreferrer"
               
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>

            <h2>JOIN THE BUYMUSIC COMMUNITY</h2>
            <h2>SPICE UP YOUR LOCAL MUSIC SCENE</h2>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
