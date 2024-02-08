import React from 'react'
import '../../assets/css/checkout/Checkout.css'
const Checkout = (props) => {
  const {openCheckout,setOpenCheckout,cartCount,totalAmmout,PlaceOrder,userInfo,setUserInfo} = props.state
  const InfoHandle = (e) => {
    const {value,name} = e.target
    setUserInfo(prev => ({...prev, [name]:value}))
  }
  return (
    <section className='checkout_container' style={{display:openCheckout ? "flex":"none"}} >
      <form action="" className="checkout_form" onSubmit={PlaceOrder}>
      <i className="fa-solid fa-xmark close_co" onClick={() => {
        setOpenCheckout(false)}}></i>
          <h3>CHECKOUT</h3>
              <div className="input">
                <label htmlFor="">First Name</label>
                <input 
                value={userInfo.first_name}
                name='first_name'
                onChange={InfoHandle}
                type="text" />
              </div>
              <div className="input">
                <label htmlFor="">Last Name</label>
                <input 
                value={userInfo.last_name}
                name='last_name'
                onChange={InfoHandle}
                type="text" />
              </div>
          <div className='input'>
              <label htmlFor="">Contact No.</label>
              <input 
              value={userInfo.contact}
              name='contact'
              onChange={InfoHandle}
              type="text" />
          </div>
          <div className="input">
            <label htmlFor="">Address</label>
            <input 
            value={userInfo.address}
            name='address'
            onChange={InfoHandle}
            type="text" />
          </div>
          <div className='ta_container'>
              <div>
                <span>ITEM</span> <span>({cartCount})</span>
              </div>
              <div>
                  <span>SHIPPING COST</span> <span>50.00</span>
              </div>
              <div>
                <span>DISCOUNT</span> <span>0.00</span>
              </div>
              <div>
                <span>TOTAL AMMOUNT</span> <span>{totalAmmout.toLocaleString("en-US")}.00 PHP</span>
              </div>
          </div>
          <button className='place_order_btn'>PLACE ORDER</button>
      </form>
    </section>
  )
}

export default Checkout