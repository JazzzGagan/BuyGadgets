import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../Home/HeroSection'
import axios from 'axios'

const Apple = ({ category }) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setData(response.data) // Assuming response.data is an array of objects
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatProductName = (name) => {
    return name.toLowerCase().replace(/\s/g, '')
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="w-full h-auto flex flex-col space-y-8">
      <HeroSection />

      {Object.keys(data).map((brand) => (
        <div key={brand} className="w-[90%] h-auto m-auto">
          {Object.keys(data[brand]).map((cat) => {
            console.log('test', category)

            if (cat.toLowerCase() === category) {
              return (
                <ul
                  key={cat}
                  className="grid grid-cols-4 gap-5 text-center m-8 cursor-pointer"
                >
                  {data[brand][cat].map((product, index) => (
                    <li
                      key={index}
                      className="flex flex-col items-center justify-center"
                    >
                      <Link
                        to={`${formatProductName(product.productname)}`}
                        state={{ product: product }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.productname}
                          className="w-[180px] h-auto object-center mx-auto"
                        />
                        <div className="hover:underline">
                          <p>{product.productname}</p>
                          <p>{product.overview}</p>{' '}
                          {/* Changed to overview for clarity */}
                        </div>
                        <strong className="line-through text-red-500">
                          NPR {product.price}
                        </strong>
                        <br />
                        <strong>NPR {product.discount}</strong>
                        <br />
                        <br />
                        <button className="border border-black rounded-full  p-2">
                          Choose Specs
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            }
            return null // If cat is not "macbookair", return null
          })}
        </div>
      ))}
    </div>
  )
}

export default Apple
