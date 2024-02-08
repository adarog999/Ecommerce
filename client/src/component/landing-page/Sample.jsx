import { useState } from 'react'
import '../../assets/css/landing-page/sample.css'
const Sample = () => {
    const [target,setTarget] = useState(1)
    const [product , setProduct] = useState([
        {1:1},
        {2:2},
        {3:3},
        {4:4},
        {5:5},
    ])
    const Next = () => {
        if(target === 5 ) return ;
        setTarget(target + 1)
    }
    const Prev = () => {
        if(target === 1) return ;
        setTarget(target - 1)
    }
  return (
    <section className='sample-list'>

        <div className="sample-main">
            <div className="image">
                <img src="https://cdn.thewirecutter.com/wp-content/media/2023/05/running-shoes-2048px-9718.jpg" alt="shoes" />
            </div>
        
            <div className="sale_text">
                <div className="sale_title">
                <h1>Lorem, ipsum.</h1>
                <p>Up to %50 off</p>
                </div>
                <div>
                    <button>SHOP NOW</button>
                </div>
            </div>


        {/* {product.map((item,index) => (
            <div className="sample-container" style={{display: item[index + 1] === target ? "" : "none"}} key={index}>
                <div className="details">
                    <h1>Lorem {item[index + 1]} ipsum dolor sit amet consectetur.</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores harum enim laudantium culpa quae autem libero! Distinctio molestiae laudantium a.</p>
                    <button>Shop Now -</button>
                </div>
                <div className="sample-image">
                    <img src="https://cdn.thewirecutter.com/wp-content/media/2023/05/running-shoes-2048px-9718.jpg" alt="" />
                </div>
            </div>
        ))} */}
            
            {/* <div className="more_btn">
                <button onClick={Prev}>Prev</button>
                <div className="indicator">
                {product.map((key,index) => (
                    <i key={index} className="fa-regular fa-circle-dot" style={{color: key[index + 1] === target ? "white": ""}}></i>
                ))}
                </div>
                <button onClick={Next}>Next</button>
            </div> */}
        </div>  
        
    </section>
  )
}

export default Sample