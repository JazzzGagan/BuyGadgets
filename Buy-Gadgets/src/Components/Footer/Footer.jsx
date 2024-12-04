import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* IonSphereTech Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">IonSphereTech</h2>
          <p>Apple Authorized Reseller</p>
          <p>Apple Authorized Service Provider</p>
          <p>1 Durbar Mall, 2nd Floor.</p>
          <p>Opposite to Durbar Marg Police Station.</p>
          <p>Kathmandu, Postal Code 44600</p>
          <p>Tel: +977 1 5312100</p>
          <p>Cell: +977 9801131696</p>
        </div>

        {/* Explore */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Explore</h2>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Store Location</li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>EMI</li>
            <li>Service</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li>Action Camera & Accessories</li>
            <li>iPhone 13 & 14 Cases</li>
            <li>iPhone 15 Cases & Tempered Glass</li>
            <li>iPad Accessories</li>
            <li>iPhone Cases</li>
            <li>Mac Accessories</li>
            <li>Cables & Data</li>
            <li>Cover and Cases</li>
            <li>Laptop Sleeves</li>
            <li>Backpacks</li>
            <li>Gaming Products</li>
            <li>Electronics</li>
            <li>Hard Drive and SSD</li>
            <li>Health and Care</li>
            <li>Projector and Accessories</li>
            <li>USB and SD cards</li>
          </ul>
        </div>

        {/* Brands and Contact */}
        <div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Brands</h2>
            <ul className="space-y-2">
              <li>Apple</li>
              <li>Marshall</li>
              <li>Bose</li>
              <li>JBL</li>
              <li>Case Logic</li>
              <li>Belkin</li>
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p>Evolution Trading Pvt. Ltd.</p>
            <p>Bakhundole, Lalitpur, Ward #1</p>
            <p>Postal Code 44700</p>
            <p>Email: info@ionspheretech.com</p>
            <p>Tel: 01-5454338, 01-5454339</p>
            <p>01-5454284, 01-5454285</p>
          </div>
        </div>
      </div>
      {/* Social Media */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center">
        <p className="mb-2">Follow Us On:</p>
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} size="lg" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
