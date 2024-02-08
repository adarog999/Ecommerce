import React from 'react'
import '../../assets/css/seller/component/SellerOrders.css'
import { useState } from 'react'
const SellerOrders = () => {
  const [orders,setOrders] = useState([1,2,3,4,5,6,6,7,8,9,10,11,21,12,])
  return (
    <section className='s_orders_container'>

        <div className="s_order_header">
          <h2>SELLER ORDERS -</h2>
        </div>

        <div className="s_product_list_container">
      
        {orders.map((order,index) => (
          <div key={index} className="order_wrapper">
                  <div className="s_order_1st_row">
                      <div className="s_order_1st_col">
                        <div className="s_order_title">
                          <span>Lorem, ipsum dolor sit amet consectetur adipisicing..</span>
                        </div>
                        <div className="s_order_image">
                        <img src="https://www.investopedia.com/thmb/vbqJtFiJHnvoqwSpDRgArlgcBDs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Term-Definitions_Product-Line-Final-58870113a3ca4770a85cabf3549894bb.jpg" alt="img" />  
                        </div>  
                      </div>
                        <div className="s_order_1st_row_2nd_col o_1st_row_div">
                            <div>
                              <span>Quantity</span>
                            </div>
                            <div>
                              90
                            </div>
                        </div>
                        <div className="s_order_1st_row_3rd_col o_1st_row_div">
                          <div>
                            <span>Price</span>
                          </div>
                          <div>
                            200.00 PHP
                          </div>
                        </div>
                        <div className="s_order_1st_row_4th_col o_1st_row_div">
                          <div>
                          <span>Date Order</span>
                          </div>
                          <div>
                            <span>19/09/2</span>
                          </div>
                        </div>
                        </div>

                      <div className="s_order_2nd_row">
                        <div className="s_order_2nd_1st_col">

                        <div>
                          <span>Address:</span>
                          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, ipsa!</span>
                        </div>
                        <div>
                            <span>Client Name:</span>
                            <span>Lorem, ipsum dolor.</span>
                        </div>
                        <div>
                          <span>Client Contact</span>
                          <span>09561546548</span>
                        </div>
                        </div>
                      <div className="s_order_2nd_2nd_col">
                          <button>Confirm Order</button>
                          <button>Remove Order</button>
                      </div>                 
                      </div>
                  
              </div>
        ))}
        </div>



    </section>
  )
}

export default SellerOrders