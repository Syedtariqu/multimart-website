import React from 'react'
import ProductCard from './ProductCard'
function ProductsList({data}) {
  return (
    <>
{data.map((item)=>( 
     <ProductCard item ={item} />
))
}
    </>
  )
}

export default ProductsList