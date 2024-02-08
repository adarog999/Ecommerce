import { useEffect, useRef, useState ,useContext } from 'react'
import '../../assets/css/product_view/Product.css'
import ProductDescription from './ProductDescription'
import ProductsRating from './ProductsRating'
import AddRating from './AddRating'
import RatingList from './RatingList'
import { useParams } from "react-router-dom"
import UserContext from '../contextProvider'
import axios from 'axios'
const Products = () => {
  const userData = useContext(UserContext)
  const {id} = useParams()
  const [images,setImages] = useState([])
  const [data,setData] = useState("")
  const [variants , setVariants] = useState("") 
  const [choosedVariants,setChoosedVariants] = useState({})
  const [addToCartErr,setAddToCartErr] = useState("")
  const [quantity,setQuantity] = useState(1)
  const [seller,setSeller] = useState({})
  const [popUp,setPopup] = useState(false)
  useEffect(() => {
    const getProduct = async () => {
        const response = await fetch(`http://localhost:5000/products/getproduct/${id}`)
        const data = await response.json()
        const product = await data.data
        let variants = JSON.parse(product.variant)
        setVariants(JSON.parse(product.variant))
        setData(product)
        setImages([product.thumbnail,...product.images])
        setSeller(product.seller)
      variants.map(key => {
        setChoosedVariants(prev => ({...prev , [Object.keys(key)[0]] : ""}))
        })
      //   console.log(targetData.variants)
    }
    getProduct()
  },[])

  
  const [paginateCount,setPaginateCount] = useState(0)
  const [paginateMove,setPaginateMove] = useState(0)
  const PaginateImage = (angle) => {
      if(angle === 'right') {
          setPaginateCount(prev => prev +1)
      }else{
        console.log('left')
        if(paginateCount === 0) return;
        setPaginateCount(prev => prev - 1)
      }
  }
  useEffect(() => {
    setPaginateMove(paginateCount * 150)
  },[paginateCount])

  const ChooseVariantBtn = (value,variant_name) => {
    console.log(choosedVariants)
    setChoosedVariants(prev => ({...prev,[variant_name]: value}))
  }
  

  const hasChosenVariant = (variant) => {
    
      for (const key in variant) {
        if (variant[key] === '') {
          setAddToCartErr(`Please select ${key}`)
          return false
        }
      }
      setAddToCartErr(""); // Return true if no empty value is found
      return true
  }

  const QuantityHandle = (e) => {
    setQuantity(e.target.value)
  }
  const QuantityBtn = (operator) => {
    if(operator === "plus") {
      setQuantity(parseInt(quantity) + 1)
    }else {
      if(quantity === 1) return;
      setQuantity(parseInt(quantity) - 1)
    }
  }

  const AddToCart = () => {
    console.log(data.variant)
    if(userData === "") {
      return setAddToCartErr("Please Login")
    }
    if(!hasChosenVariant(choosedVariants)) {
      return console.log("Please choose variants")
    }
    else if(parseInt(quantity) < 1) {
      setAddToCartErr(`Quantity must be greater to 1`)
      return console.log("Quantity must be greater to 1")
    }
    setAddToCartErr(``)
    console.log(userData.userId)
    console.log(seller.id)
    console.log(id)
    console.log(JSON.stringify(choosedVariants))
    const formData ={
        user: userData.userId,
        seller: seller.id,
        product: id,
        variant: JSON.stringify(choosedVariants),
        variant_choice: data.variant,
        quantity: parseInt(quantity)
    }
    axios.post('http://localhost:5000/cart/addtocart',formData)
    .then(res => {
      setPopup(true)
      console.log(res)
      setTimeout(() => {
      setPopup(false)
      },500)
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <section className='product'>
        <div className="product_item">
    {/* image_side */}
          <div className="image_side">
           
          <div id="carouselExampleIndicators" className="carousel slide">
 
  <div className="carousel-inner">
  {images && images.map((image, index) => (
        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <img src={`http://localhost:5000/images/${image}`} alt={index} />
        </div>
    ))}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
          <div className="item_more_image_container">
            {paginateCount !== 0 &&
            <button className="angle_left" onClick={()=> PaginateImage("left")}>
          <i className="fa-solid fa-angle-left "></i>
            </button>
            }

          <div className="item_more_image">
          {images && images.map((image,index) => (
              <div 
              className="images active" key={index}
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              style={{transform: `translateX(-${paginateMove}px)`}}
              >
                <img src={`http://localhost:5000/images/${image}`} alt={index} />
              </div>
          ))} 
          </div>
          <button className="angle_right" onClick={()=> PaginateImage("right")}>
          <i className="fa-solid fa-angle-right "></i>
          </button>
          </div>
          </div>
    {/* image_side */}
            

          <div className="item_details">
              <div className="details">
                  <div className="title">
                  <h1>{data.title}</h1>
                  <p>{data.price}</p>
                  </div>
                  <div className="variants">
                    <span className='variants_head'>Variants</span>
                      <div className="variants_container">
                      {variants && variants.map((variant,main_index) => {
                        const variant_name = Object.keys(variant)[0]
                          
                        return <div className="variants_list" key={main_index}>
                          <span>{variant_name.toUpperCase()}</span>

                            <div>
                          {variant[Object.keys(variant,variant_name)].map((value,index) => (
                            <button
                              style={
                                {
                                  backgroundColor: choosedVariants[variant_name] === value ? "black" :'',
                                  color: choosedVariants[variant_name] === value ? "#fff" :'black',
                                }}
                              key={index}
                              onClick={() => ChooseVariantBtn(value,variant_name)}
                             >{value}</button>
                            ))
                          }
                          </div>
                      </div>
                        })}
                     
                      </div>
                  </div>
                  <div className="quantity">
                    <span className='quantity_head'>Quantity</span>
                    <div className='input_quant_div'>
                    <button onClick={() => QuantityBtn("minus")}>-</button>
                    <input onChange={QuantityHandle} value={quantity} type="number" name="" id="" />
                    <button  onClick={() => QuantityBtn("plus")}>+</button>
                    </div>
                  </div>
              </div>
              <div className="add_buy">
                  <div>
                    <span>{addToCartErr}</span>
                  </div>
                  <div className="button">
                    <button onClick={AddToCart}>Add to Cart</button>
                    <button>Buy Now</button>
                  </div>
              </div>
          </div>
        </div>
        {popUp &&
        <div className="add_cart_pop_up"> 
          <h1>Item Added to Cart</h1>
        </div>
        }

        <div className='product_seller'>
            <div className="seller_info">
              <div className="seller_image">
                <img src={seller.image} alt="" />
              </div>
              <div className="seller_name">
                <span>{seller.shopname}</span>
                <div className='seller_action'>
                  <button>Chat now</button>
                  <button>View Shop</button>
                </div>
              </div>
            </div>

            <div className="seller_metrics">
                <div className="metric1 metric">
                    <div className="metric_info">
                      <span>Ratings</span>
                      <span>{seller.rating}</span>
                    </div>
                    <div className="metric_info">
                      <span>Response Rate</span>
                      <span>97%</span>
                    </div>
                </div>
                <div className="metric2 metric">
                    <div className="metric_info">
                      <span>Products</span>
                      <span>{seller.products}</span>
                    </div>
                    <div className="metric_info">
                      <span>Response Time</span>
                      <span>within minutes</span>
                    </div>
                </div>
            </div>

            <div className="seller_follow_likes">
              <div className="follower">
                <span>Follower</span>
                <span>{seller.followers}</span>
              </div>
              <div className="likes">
                <span>Likes</span>
                <span>{seller.likes}</span>
              </div>
            </div>

        </div>

        <ProductDescription description={data.description}/>

        <ProductsRating rating={{product_preview:data.rating_preview,product_rating:data.product_rating,rating_count: data.ratings_count}}/>

        < AddRating />

        <RatingList/>
    </section>
  )
}

export default Products