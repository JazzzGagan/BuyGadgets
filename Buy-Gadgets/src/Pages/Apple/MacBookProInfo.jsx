import React from 'react'
import { useLocation } from 'react-router-dom'

import ProductCard from '../../Components/ProductCard/ProductCard'

const MacBookProInfo = () => {
  const location = useLocation()
  const { product } = location.state || {}

  if (!product) {
    return <p>No product data available</p>
  }
  return <ProductCard product={product} />
}

export default MacBookProInfo
