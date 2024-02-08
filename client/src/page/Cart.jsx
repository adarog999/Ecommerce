import SearchBar from '../component/home/SearchBar'
import "../assets/css/cart/Cart.css"
import { useEffect, useState , useContext } from 'react'
import CartSummary from '../component/cart/CartSummary'
import axios from 'axios'
import UserContext from '../component/contextProvider'
import Checkout from '../component/Checkout/Checkout'
const Cart = () => {
  const [openCheckout,setOpenCheckout] = useState(false)
  const userData = useContext(UserContext)
  const [items,setItems] = useState([1,2,3,4,5])  
  const [myCart,setMyCart] = useState([])
  const [userInfo,setUserInfo] = useState({
    first_name:"",
    last_name:"",
    contact:"",
    address:""
  })

  useEffect(() => {
    (() => {
      axios.get(`http://localhost:5000/cart/mycart/${userData.userId}`)
      .then(res => {
        console.log(res.data.data)
        setMyCart(res.data.data)
      })
      .catch(e => {
        console.log(e)
      })
    })()
   
  },[])

  const SelectItem = (main_index,index) => {
    let newCart = [...myCart]
    let selected_val = newCart[main_index].cart_item[index].selected
    newCart[main_index].cart_item[index].selected = selected_val === 1 ? 0 : 1
    setMyCart(newCart)
  }

  const QuantityInput = (main_index,index) => {
    const {value} = e.target
    let updateCart = [...myCart]
    updateCart[main_index].cart_item[index].item_quantity = value
    setMyCart(updateCart)
  }

  const AddQuantity = (main_index,index) => {
    const newCart = [...myCart]
    const value = newCart[main_index].cart_item[index].item_quantity
    newCart[main_index].cart_item[index].item_quantity = value + 1
    setMyCart(newCart)
    console.log(value)
  }
  const MinusQuantity = (main_index,index) => {
    const newCart = [...myCart]
    const value = newCart[main_index].cart_item[index].item_quantity
    if(value === 1) return ;
    newCart[main_index].cart_item[index].item_quantity = value - 1
    setMyCart(newCart)
    console.log(value)
  }

  const [cartCount,setCartCount] = useState(0)
  const [totalAmmout,setTotalAmmount] = useState(0)
  const CheckOut = () => {
    setOpenCheckout(true)
  }
  const PlaceOrder = (e) => {
    e.preventDefault()
    let order = []
    for(let i = 0 ; i < myCart.length; i ++) {
        for(let j = 0 ; j < myCart[i].cart_item.length ; j ++) {
            if( myCart[i].cart_item[j].selected === 1) {
              order.push({...myCart[i].cart_item[j],seller:myCart[i].seller})
            }
        }
    }
    axios.post(`http://localhost:5000/order/${userData.userId}`,{order:order,userinfo:userInfo})
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    (() => {
      let cartLength = 0
      myCart.map(key => {
        let count = key.cart_item.filter(x => x.selected === 1)
        cartLength += count.length
      } )
      setCartCount(cartLength)

      let totalAmmount = 0
      for(let i = 0 ; i < myCart.length ; i ++) {
        let value = myCart[i].cart_item.filter(x=> x.selected === 1).reduce((acc,cur) => parseInt(acc) +( parseInt(cur.price)* parseInt(cur.item_quantity) ), 0 )
        totalAmmount += value
      }
      setTotalAmmount(totalAmmount)
    })();
  },[myCart])
  const Delete = (main_index,index,cart_id) => {

    axios.post(`http://localhost:5000/cart/deletecart/${cart_id}/${userData.userId}`)
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
    let newCart = [...myCart]
    newCart[main_index].cart_item = newCart[main_index].cart_item.filter((_,x) => x !== index)
    newCart = newCart.filter(x => x.cart_item.length !== 0)
    setMyCart(newCart)
  } 


  return (
    <>
    <section className="cart">
      <div className="cart_wrapper">
      <div className="cart_list">
      {myCart.length > 0 ?  myCart.map((cart,main_index) => (
        <div key={main_index}>
         <div className="item_wrapper">
          <div className='cart_head'>
            <div className="cart_seller">
              <span className='seller_name'>
              <i className="fa-solid fa-user"></i>
              <span>{cart.shopname}</span>
              </span>
              <button className='message_btn'><i className="fa-brands fa-rocketchat"></i><span>Message</span></button>
              <button className='view_shop'><i className="fa-solid fa-shop"></i><span>View Shop</span></button>
            </div>
            
          </div>
          {cart.cart_item.map((item,index) => {
              return <div className="items_container" key={index}>
                <div className='items_head'>
                <i className="fa-solid fa-ticket"></i><span>Unit Price: </span> <span>{item.price}.00 PHP</span>
                </div>
                <div className="items">
                <div className="select_item">
                  <input type="checkbox"  onChange={() => SelectItem(main_index,index)} checked={item.selected === 1}/>
                </div>
                <div className="item_image">
                  <img src={`http://localhost:5000/images/${item.thumbnail}`} alt="item" />
                </div>

                <div className="item_details">
                    {/* <span className='item_name'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, nemo.</span> */}
                    <span className="item_name">{item.title}</span>
                    <div className="item_variant">
                      {
                      Object.entries(item.choosen_variant).map(([key,value],index) => (
                      <div  className='variants' key={index}>
                      <span><strong>{key}</strong> :</span><span>{value}</span>
                      </div>
                      ))}
                      {/* <div className='variants'>
                        <span>Color :</span><span>RED</span>
                      </div>
                     
                      <div  className='variants'>
                        <span>Testing: </span><span>TESTING</span>
                      </div> */}
                      <i className="fa-regular fa-pen-to-square edit_variant"></i>
                    </div>
                    <div className="quantity">
                      <span>Quantity:</span>
                      <div  className='quantity_input'>
                      <button onClick={() => MinusQuantity(main_index,index)}>-</button>
                      <input 
                      onChange={(e) => QuantityInput(e,main_index,index)}
                      value={item.item_quantity} 
                      type="number" />
                      <button onClick={() =>AddQuantity(main_index,index)}>+</button>
                      </div>
                    </div>
                </div>

                <div className="total_price">
                  <span>TOTAL PRICE:</span>
                  <span className='price_num'>{(parseInt(item.price) * parseInt(item.item_quantity)).toLocaleString()} PHP</span>
                </div>
                <div className="actions">
                  <button onClick={() => Delete(main_index,index,item.cart_id)}>REMOVE</button>
                </div>
                </div>
              </div>
            })}
          </div>
        </div> 
      )) : "No Cart Item" }
        {/* {items.map((item,index) => (
          <div className="item_wrapper" key={index}>
          
          <div className="items" key={index}>
              
          </div>
          </div>
          ))} */}
      </div>

      </div>

      <CartSummary checkout={{CheckOut,totalAmmout,cartCount}}/>
        <Checkout state={{openCheckout,setOpenCheckout,cartCount,totalAmmout,PlaceOrder,userInfo,setUserInfo}}/>
    </section>
    </>
  )
}

export default Cart