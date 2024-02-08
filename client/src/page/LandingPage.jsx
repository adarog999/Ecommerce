import React from 'react'
import HeroSection from '../component/landing-page/HeroSection'
import Footer from '../component/Footer'
import Sample from '../component/landing-page/Sample'
import WhyChoose from '../component/landing-page/WhyChoose'
import FlashSale from '../component/landing-page/FlashSale'
const LandingPage = () => {
  return (
    <>
        <HeroSection />
        <Sample />
        <WhyChoose />
        <FlashSale />
        <Footer />
    </>
  )
}

export default LandingPage