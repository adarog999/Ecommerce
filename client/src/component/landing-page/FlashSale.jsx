import React, { useRef, useState } from 'react'
import '../../assets/css/landing-page/FlashSale.css'
import { useCountdown } from './useCountdown'
const FlashSale = () => {
    const slideRef = useRef(null)
    const [move,setMove] = useState(0)
    const [x,setX] = useState(0)
    const [slide,setSlide] = useState({
        isDown: false,
        startX: 0,
        scrollLeft:0
    }) 
    let timeoutId;
    const SlideHandle = (e, param2) => {
        if (param2 === "mousedown") {
          setSlide({
            ...slide,
            startX: e.pageX - slideRef.current.offsetLeft,
            scrollLeft: slideRef.current.scrollLeft,
            isDown: true,
          });
        } else if (param2 === "mouseleave" || param2 === "mouseup") {
          setSlide({ ...slide, isDown: false });
        } else if (param2 === "mousemove" && slide.isDown) {
          e.preventDefault();
      
          const mouseX = e.pageX - slideRef.current.offsetLeft;
          const distance = mouseX - slide.startX;
          slideRef.current.scrollLeft = slide.scrollLeft - distance;
        }
      };
    const [item,setItem] = useState([1,1,1,1,1,1])
  return (
    <section className='flash_sale'>
        <div className="flash_header">
            <span>FLASH SALE</span>
            
            <div className='count_down'>
                <span>ENDS IN</span>
                <div className="timer">
                    <div className="days">
                        <span></span>
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                    <div className="hours">
                        <span></span>
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical"></i>

                    <div className="minutes">
                        <span></span>
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical"></i>

                    <div className="second">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>

        <div className="flash_list" ref={slideRef}
         onMouseDown={(e) => SlideHandle(e,"mousedown")}
         onMouseLeave={(e) => SlideHandle(e,"mouseleave")}
         onMouseUp={(e) => SlideHandle(e,"mouseup")}
         onMouseMove={(e) => SlideHandle(e,"mousemove")}>
            {item.map((key,index) => (
         
            <div className="flash_items" key={index}>
                <div className="percent">
                    <i className="fa-solid fa-bolt"></i>
                    <span>-50%</span>
                </div>
                <div className="flash_item_image">
                    <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="item_image" />
                </div>
                <div className="prev_price">
                    <span className='prev'>₱230</span>
                    <span className='pres'>₱120</span>
                </div>
            </div>
               ))}
        </div>

    </section>
  )
}

export default FlashSale