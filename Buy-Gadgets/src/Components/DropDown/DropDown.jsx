import React from 'react'
import { Link } from 'react-router-dom'

const DropDown = ({ items }) => {
  // Validate items to make sure it's an object and has valid data
  if (typeof items !== 'object' || items === null) {
    return <div>No items available</div>
  }

  return (
    <div className="dropdown absolute top-full left-0 mr-3 cursor-pointer w-[500px] h-[70vh] bg-[#eaeaea] text-black border border-[#bebfbf] shadow-md z-10">
      <ul className=" grid grid-cols-3 font-extrabold cursor-pointer ">
        {Object.keys(items).map((category, index) => (
          <li key={index} className="font-bold text-lg mb-2 py-8 pl-4">
            {category}

            <ul className="ml-4">
              {Array.isArray(items[category]) ? (
                items[category].map((item, itemIndex) => (
                  <li key={itemIndex} className="py-3 text-sm font-normal">
                    <Link to={item.path} className=" hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No items available</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DropDown
