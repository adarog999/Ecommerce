import React, { useState } from 'react'
import '../../assets/css/home/asideLeft.css'
const AsideHome = () => {
  const [priceStart,setPriceStart] = useState(0)
  const [priceEnd,setPriceEnd] = useState(5000)
  const PriceRange = (e) => {
    if(parseInt(e.target.value) <= 10 ) return;
    setPriceEnd(e.target.value * 100)
  }
  
  return (
    <div className='aside-left'>
        <div className="head">
          <div className='filterAll'>
            <input type="checkbox" />
              <span>Filter All</span>
          </div>
          <div className='minimize'><i className="fa-solid fa-bars"></i></div>
        </div>
        <div className='filter_list'>
            <div className="list-wrapper">
              <div className="list-head">
              <i className="fa-solid fa-list"></i><span>Category</span>
              </div>
              <div className='choices'>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Shoes</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Aplliances</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">T-Shirt</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Gadgets</label>
                  </div>
              </div>
            </div>
            <div className="list-wrapper">  
            <div className="list-head">
              <i className="fa-solid fa-list"></i><span>Colors</span>
              </div>
              <div className='choices'>
                 
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Red</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Black</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Yellow</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Blue</label>
                  </div>
              </div>
            </div>
            <div className="list-wrapper">  
            <div className="list-head">
              <i className="fa-solid fa-list"></i><span>Colors</span>
              </div>
              <div className='choices'>
                 
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Red</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Black</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Yellow</label>
                  </div>
                  <div>
                    <input type="checkbox" id=''/>
                    <label htmlFor="">Blue</label>
                  </div>
              </div>
            </div>
        </div>
        <div className="add-range">
              <p>Price Range</p>
              <div className="priceDiv">
              <input onChange={PriceRange} type="range"/>
              </div>
              <div className="indicator">
                <span>₱{priceStart}</span>
                <span>₱{priceEnd.toLocaleString("en-US")}</span>
              </div>
            </div>
        <div className="apply-btn">
        <button>Apply Filter</button>
        </div>
    </div>
  )
}

export default AsideHome