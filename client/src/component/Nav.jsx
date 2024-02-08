import { Link } from 'react-router-dom'
import '../assets/css/Nav.css'
import { useState , useContext } from 'react'
import SearchBar from './home/SearchBar'
import UserContext from './contextProvider'
import Cookies from 'js-cookie'
const Nav = () => {
    const userData = useContext(UserContext)
    console.log(userData)
    const [isMenu,setIsMenu] = useState("")
    const [menuBg,setMenuBg] = useState(false)
    const OpenCloseMenu = () => {
        if(isMenu === "menu_close" || isMenu === "") {
            setIsMenu("menu_open")
            setMenuBg(true)
        }else {
            setIsMenu("menu_close")
            setMenuBg(false)
        }
    }
    const Logout = () => {
        Cookies.remove('token')
        window.location.replace("/signin")
    }
  return (
    <>
    <nav className='nav-bar'>
        <div className='nav-wrapper'>
        <Link to={'/'} className='banner'>FLECKERS</Link>
        <SearchBar toggle={{setIsMenu,isMenu,menuBg,setMenuBg}}/>
        </div>
    </nav>
    {menuBg && 
        <div className="menu_bg" onClick={OpenCloseMenu}>

        </div>
    }
    {isMenu && 
    <div style={{animationName: isMenu}} className="menu-container">
        <i className="fa-solid fa-xmark close-menu" onClick={OpenCloseMenu}></i>
        <ul>
            <Link className='links'>
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
            </Link>
            <Link className='links'>
            <i className="fa-solid fa-info"></i>
            <span>About</span>
            </Link>
            <Link className='links'>
            <i className="fa-solid fa-tags"></i>
            <span>Product</span>
            </Link>
            <Link className='links'>
            <i className="fa-solid fa-phone"></i>
            <span>Contact</span>
            </Link>
            {userData !== "" ?
            <button className='logout' onClick={Logout}>
                <span>Logout</span>
                <i class="fa-solid fa-right-from-bracket"></i></button>
            : 
            <div className="sign">
            <Link to="#" className='signUp'>
            <i className="fa-solid fa-user-plus"></i>
            <span> Sign Up</span>
            </Link>
            <Link to="/signin" className='signIn'>
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>Sign In</span></Link>
            </div>
            }

        </ul>

    </div>
    }
    </>
  )
}

export default Nav