import { useState } from 'react'
import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'
import LandingPage from './page/LandingPage'
import Nav from './component/Nav'
import Home from './page/Home'
import Cart from './page/Cart'
import ProductView from './page/ProductView'
import SignIn from './page/SignIn'
import Orders from './page/Orders'
import SignUp from './page/SignUp'

// seller
import Seller from './page/seller/Seller'
import Dashboard from './component/seller/Dashboard'
import Main from './component/seller/Main'
import AddProduct from './component/seller/AddProduct'
import SellerOrders from './component/seller/SellerOrders'
import SellerAccount from './component/seller/SellerAccount'
import SellerProducts from './component/seller/SellerProducts'
// seller

import Cookie from 'js-cookie'
import decode from 'jwt-decode'
import UserContext from './component/contextProvider'

function App() {
    const token = Cookie.get("token") || "";
    const userData = token !== "" ? decode(token) : "";

    return (
      <Router>
        <UserContext.Provider value={userData}>
        <Nav/>
        <Routes>
          {/*Iwant the nav only inside this */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/signup" element={<SignUp />} />
          {/*Iwant the nav only inside this */}

          {/* seller */}
          <Route path="/seller" element={<Seller />}>
            <Route path="" element={<Dashboard />} />
            <Route path="main" element={<Main />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="account" element={<SellerAccount />} />
            <Route path="products" element={<SellerProducts />} />
          </Route>
          {/* seller */}

        </Routes>
        </UserContext.Provider>

      </Router>
  )
}

export default App
