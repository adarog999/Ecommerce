import React from 'react'
import '../../assets/css/product_view/ProductDescription.css'
const ProductDescription = (props) => {
  const {description} = props
  return (
    <section className='product_description'>
        <h1 className='description_header'>Product Description</h1>
        <div className='description_wrapper'>
          <div className="description_text">
        <span>{description}</span>
          </div>
          <div className="description_image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVxnVTq-f6zLfR2QSEJ52aQJfXAq576lhpQ&usqp=CAU" alt="person" />
          </div>
        </div>
    </section>
  )
}

export default ProductDescription

