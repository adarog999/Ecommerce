import React from 'react'
import '../../assets/css/cart/CartSummary.css'
const CartSummary = (props) => {
    const {CheckOut,totalAmmout,cartCount} = props.checkout
  return (
    <section className='cart_detail'>
        <h1>Cart Summary</h1>
        
        <div className="cart_detail_container">

        <div className="cart_total_detail">

        <div className="voucher">
            <span>VOUCHER</span>
            <button>Select or Enter Code</button>
        </div>

        <div className='div'>
            <span>Item</span>
            <span>({cartCount})</span>
        </div>

        <div className='div'>
            <span>Subtotal</span>
            <span>{totalAmmout.toLocaleString("en-US")}.00 PHP</span>
        </div>

        <div className='div'>
            <span>Shipping Charge</span>
            <span>50.00 PHP</span>
        </div>
        <div className='div total_ammount'>
            <span>Total Ammount</span>
            <span>{totalAmmout.toLocaleString("en-US")}.00 PHP</span>
        </div>
        </div>

        <div className='checkout_btn_div'>
            <button onClick={CheckOut}>CHECKOUT</button>
        </div>

        </div>

    </section>
  )
}

export default CartSummary