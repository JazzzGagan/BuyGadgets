import React from 'react'
import './HeroSection.css'
import Slider from 'react-slick'

// Example images for the slider
import heroImage1 from '../../assets/images/hero_img_01.jpg'
import heroImage2 from '../../assets/images/hero_img_02.jpg'
import heroImage3 from '../../assets/images/hero_img_03.jpg'
import heroImage4 from '../../assets/images/hero_img_04.jpg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
  }

  return (
    <section className="hero-section  w-full  h-auto">
      <Slider {...settings}>
        <div>
          <img
            src={heroImage1}
            alt="Hero 1"
            className="object-contain w-full h-full"
          />
        </div>
        <div>
          <img
            src={heroImage2}
            alt="Hero 2"
            className="object-contain w-full h-full"
          />
        </div>
        <div>
          <img
            src={heroImage3}
            alt="Hero 3"
            className="object-contain w-full h-full"
          />
        </div>
        <div>
          <img
            src={heroImage4}
            alt="Hero 3"
            className="object-contain w-full h-full"
          />
        </div>
      </Slider>
    </section>
  )
}

export default HeroSection
