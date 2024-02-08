import { Link } from 'react-router-dom'
import { useState ,useContext, useEffect } from 'react'
import '../../assets/css/searchBar/searchBar.css'
import UserContext from '../contextProvider'
const SearchBar = (props) => {
  const {isMenu,setIsMenu,menuBg,setMenuBg} = props.toggle
  const data =  useContext(UserContext)
  const [url,setUrl] = useState(window.location.href)
  const [page,setPage] = useState(url.split("/").slice(-1)[0])
  const [cart_order , setCart_Order] = useState({cart:0,order:0})

  return (
    <header className='home-header'>
      
      <form action="" className="searchBar">
      <input type="text" />
      <button><i className="fa-solid fa-magnifying-glass"></i></button>
    </form>
    
    <div className='links'>
      {data !== "" ? 
       <div className="right-head">
      <Link to="/cart" className='cart-order'>
        {
          cart_order.cart !== 0 ? 
          <span>1</span>
          : ""
        }
    <i className="fa-solid fa-cart-shopping"></i>
      </Link>
      <Link to="/orders" className='cart-order'>
      {
      cart_order.order !== 0 ? 
      <span>1</span>
      : ""
      }
    <i className="fa-solid fa-rectangle-list"></i>
      </Link>
    </div>
      :""}
        <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to={"#"}>About</Link>
        </div>
          {data !== "" ? 
          <button className='settings' onClick={() => {
            setIsMenu(isMenu === "menu_close" || isMenu === "" ? "menu_open": "menu_close") 
            setMenuBg(true)
            }}>

            <div className='np_picture'>
            </div>
            <i className="fa-solid fa-gear"></i>
          </button> 
          :
          <div className="buttons">
          <Link to='signin'>Login</Link>
          <Link to='signup'>SignUp</Link>
        </div>
        }
    </div>

   
</header>
  )
}

export default SearchBar