import React from 'react'
import '../../assets/css/product_view/ProductRating.css'
const ProductsRating = (props) => {
    const {product_preview} = props.rating
    const {product_rating} = props.rating
    const {rating_count} = props.rating
  return (
    <section className='rating_container'>

        <div className="rating_header">
            <h1>Product Rating</h1>
        </div>    

        <div className="rating_average">
            <h1>{product_rating && product_rating}</h1>
            <div className="star">
                {product_preview && Object.entries(product_preview).map(([key,value],index) => (
                            <div className="five_a" key={index}>
                            <span>{key}</span>
                            <div className='rating_bar'>
                                <div className="bar" style={{width:value > 0 ? `${(value/rating_count)*100}%`: "0%"}}></div>    
                            </div>
                            </div>
                ))}
              
                {/* <div className="four_a">
                    <span>4</span>
                    <div className='rating_bar'>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="three_a">
                    <span>3</span>
                    <div className='rating_bar'>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="two_a">
                    <span>2</span>
                    <div className='rating_bar'>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="one_a">
                    <span>1</span>
                    <div className='rating_bar'>
                        <div className="bar"></div>
                    </div>
                </div> */}
            </div>
        </div>

        <div className="add_rating">
            
        </div>
    </section>
  )
}

export default ProductsRating