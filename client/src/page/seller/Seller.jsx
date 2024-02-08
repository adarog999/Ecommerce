import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSideBar from '../../component/seller/LeftSideBar'
import RightSideBar from '../../component/seller/RightSideBar'
import '../../assets/css/seller/Seller.css'
const Seller = () => {
  return (
  <section className="seller_container">
    <LeftSideBar/>
    <section className="outlet_content">
    <Outlet />
    </section>
    <RightSideBar/>
  </section>    
  )
}

export default Seller