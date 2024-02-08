import React from 'react'
import '../../assets/css/landing-page/HeroSection.css'
const HeroSection = () => {
  return (
    <section className='hero-section'>
        <div className="headline">
            <div className="head-txt">
            <h1>Embark on an Exceptional Product Journey with Us!</h1>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident illo expedita asperiores nisi consequatur dolorem recusandae necessitatibus molestiae eos?</span>
            </div>
            <div className="headline-btn">
            <button className='explore-btn'>Explore Now</button>
            <button className='contact'>Contact</button>
            </div>
        </div>
        <div className="image-banner">

        <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="d-block" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://t4.ftcdn.net/jpg/04/70/24/21/360_F_470242163_WUfWZM2eCfmieA0G8u3QRF1BoZMITozQ.jpg" className="d-block0" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kBfrAFJD7L8Cf7NwZDQxQ6YIMxSAuFWC8pc0deV2&s" className="d-block" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
            {/* <div className="image-wrapper">
                <img src="https://static.cdn.packhelp.com/wp-content/uploads/2018/09/06153909/olive_poem.png" alt="" />
            </div> */}
        </div>
    </section>
  )
}

export default HeroSection