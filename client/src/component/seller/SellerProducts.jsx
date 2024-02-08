import React, { useState } from 'react'
import '../../assets/css/seller/SellerProducts.css'
const SellerProducts = () => {
  const [products,setProducts] = useState([1,1,1,1,1,1])
  return (
    <section className='sp_container'>
        <div className="sp_search_bar">
          <input type="text" className='sp_search_inp'/>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        
        <div className="sp_product_list_container">
        {products.map((product,index) => (
          <div key={index} className="sp_product_wrapper">
                  <div className="sp_product">
                      <div className="sp_product_header">
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing..</span>
                        <div className='sp_product_select'>
                          <input type="checkbox" className='select' name="" id="" />
                        </div>
                      </div>
                      <div className="sp_product_image">
                      <img src="https://www.investopedia.com/thmb/vbqJtFiJHnvoqwSpDRgArlgcBDs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Term-Definitions_Product-Line-Final-58870113a3ca4770a85cabf3549894bb.jpg" alt="img" />  
                      </div>   
                      <div className="sp_product_price">
                        <span>200 PHP</span>
                      </div>
                      <div className="sp_product_action">
                          <button><i className="fa-solid fa-pen-to-square"></i></button>
                          <button><i className="fa-solid fa-trash-can"></i></button>
                      </div>                 
                  </div>
              </div>
        ))}
        </div>
    </section>
  )
}

export default SellerProducts