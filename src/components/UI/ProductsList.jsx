import React from 'react'
import ProductCard from './ProductCard'
function ProductsList({data}) {
  return (
    <>
{data.map((item , index)=>( 
     <ProductCard  key= {index} item ={item} />
))
}
    </>
  )
}

export default ProductsList