import { useState } from 'react'
import '../../assets/css/landing-page/whychoose.css'
const WhyChoose = () => {
    const [tempState , setTempState] = useState([1,2,3,4])
    const [categories,setCategories] = useState([
        'DRESSESS',
        'TOPS',
        'BOTTOMS',
        'CO-ORDS',
        'LINGERIE & LOUNGEWEAR',
        'BEACHWEAR','SHOES','BAGS','ACCESSORIESS & JEWELRY' , 'BEAUTY & HEALTH','HOME &  LIVING','ELECTRONICS'
    ])
  return (
    <>
    <h1 className='cat-header'>SHOP BY CATEGORIES</h1>
    <section className="categories_container">
            {categories.map((name,index) => (
                <div className="categories" key={index}>
                    <div className="image">
                        <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="categories" />
                    </div>
                    <span>{name}</span>
                </div>
                    ))}
        {/* <div className="why-list">
            {tempState.map((key,index) => (

                <div className="list" key={index}>
                <div className="icon">
                    <i className="fa-solid fa-ship"></i>
                </div>
                <h1>Lorem ipsum </h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem ad velit aspernatur non eum quae corrupti vitae facere blanditiis voluptatibus.</p>
            </div>
                ))}
        </div>
        <div className="image">
                <img src="https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?cs=srgb&dl=pexels-pixabay-279906.jpg&fm=jpg" alt="shop" />
        </div> */}
    </section>
    </>
  )
}

export default WhyChoose