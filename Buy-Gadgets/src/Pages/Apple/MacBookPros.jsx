import React from 'react'
import ProductList from '../../Components/ProductList/ProductList'


const MacBookPros = () => {
  return (
    <div className="w-full h-auto flex flex-col space-y-8">
      <ProductList category="macbookpro" />
    </div>
  )
}

export default MacBookPros
