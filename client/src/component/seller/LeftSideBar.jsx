import React from 'react'
import '../../assets/css/seller/LeftSideBar.css'
import { Link } from 'react-router-dom'
const LeftSideBar = () => {
  return (
    <aside className='left_side_bar'>
        
        <header className='left_side_header'>
            <div className="image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt="seller_image" />
            </div>
            <h1>SELLER SHOP</h1>
        </header>
        <div className="navigation">
            <Link to={"/seller"} className="dashboard link">
                <i className="fa-solid fa-table-columns"></i>
                <span >Dashboard</span>
            </Link>
            <Link to={"addproduct"} className="dashboard link">
            <i className="fa-solid fa-square-plus"></i>
            <span >Add Product</span>
            </Link>
            <Link to={"orders"} className="dashboard link">
            <i className="fa-solid fa-list"></i>
                <span >
                Orders
                </span>
            </Link>
            <Link to={"products"} className="dashboard link">
                <i className="fa-solid fa-box-open"></i>
                <span >Products</span>
            </Link>
            <Link to={"account"} className="dashboard link">
                <i className="fa-solid fa-gear"></i>
                <span >Setting</span>
            </Link>
        </div>
    </aside>
  )
}

export default LeftSideBar