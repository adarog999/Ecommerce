import React, { useEffect, useState ,useContext } from 'react'
import '../assets/css/orders/Orders.css'
import axios from 'axios'
import UserContext from '../component/contextProvider'

const Orders = () => {
  const userData = useContext(UserContext)
  const [orders,setOrders] = useState([])
  useEffect(() => {
    (() => {
      axios.get(`http://localhost:5000/order/myorders/${userData.userId}`)
      .then(res=> {
        console.log(res)
        setOrders(res.data.orders)
      })
      .catch(e => {
        console.log(e)
      })
    })()
  },[])
  return (
    <section className='order_container'>
        <div className='order_list'>
            {orders && orders.map((order,index) => {
              let variant = JSON.parse(order.variant)
         return <div className="order" key={index}>
              <div className="order_head">
                  <p className="name">{order.first_name} {order.last_name}</p>
                  <p className="address">{order.address}</p>
              </div>
              <div className="order_details">
                  <div className="order_image">
                    <img src={`http://localhost:5000/images/${order.thumbnail}`} alt="order-im" />
                  </div>
                  {/* order_info */}
                  <div className="order_info">
                  {/* first_info */}
                    <div className="first_info">

                 
                    
                    <div className="order_name">
                      <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, nemo.</span>
                    </div>

                    </div>
                  {/* first_info */}
                  
                  {/* second info  */}
                  <div className="second_info">
                    {Object.entries(variant).map(([key,value],index) => (

                      <div className="color" key={index}>
                      <span>{key}: </span><span>{value}</span>
                    </div>
                    ))}
                 
                  </div>
                  {/* second_info */}
                  <div className="quantity">
                    <span>Quantity: </span><span>{order.quantity}</span>
                  </div>
                  </div>
                  {/* order_info */}

                  <div className="order_charge_status">
                    
                    <div className="order_id_status">
                    <div className="order_id">
                    <span>ID: </span>
                    <span>lp9812gfa-9usd</span>
                    </div>
                    <button className='order_status'>
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      <span>Pending</span>
                    </button>
                    </div>

                    <div className='charge'>
                      <span>Charge: </span> <span>50.00 PHP</span>
                    </div>
                    <div className="total_ammount">
                      <span>Total Ammount: </span> <span>{order.total.toLocaleString()}.00 PHP</span>
                    </div>
                  </div>
              </div>
          </div>
})}

        </div>        

        <div className="side_bar">

        </div>
    </section>
  )
}

export default Orders