import '../../assets/css/home/main-content.css'
import { useState,useEffect } from 'react'
import {Link} from "react-router-dom"
import SearchBar from './SearchBar'



const MainContent = () => {
  const [ products , setProducts] = useState()

  useEffect(() => {
    const fetchFunction = async () => {
        const response = await fetch('http://localhost:5000/products')
        const data  = await response.json()
   
        setProducts(data.data)
        console.log(data.data)
    }
    fetchFunction()
   
  },[]) 

  return (
    <div className='main-content'>
        <div className="product-container">
            <div className="product-wrapper">
                {products&& products.map((item,index) => (
                    <Link to={`/product/${item.id}`} key={index} className='product-list'>
                        <div className="image">
                          <img src={`http://localhost:5000/images/${item.thumbnail}`} alt="asd" />
                        </div>
                        <div className="product-info">
                        <p>₱ {item.price}.00</p>
                        <p>{item.title.length > 19 ? item.title.slice(0,20) + "...":item.title}</p>
                        </div>
                    </Link>
                  
                ))}
            </div>
        </div>

    </div>
  )
}

export default MainContent