import React from 'react'
import cod from '../../assets/images/cod.png'
import americanExpress from '../../assets/images/american-express.jpg'
import conntectIps from '../../assets/images/connectips.png'
import esewa from '../../assets/images/Esewa.png'
import imePay from '../../assets/images/ime_pay.png'
import unionPay from '../../assets/images/union-pay.jpg'
import khalti from '../../assets/images/khalti.png'
import nicAisa from '../../assets/images/logo-nic-asia.jpg'
import visa from '../../assets/images/visa.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SafePayment = () => {
  const paymentOptions = [
    { src: esewa, alt: 'esewa' },
    { src: imePay, alt: 'imePay' },
    { src: khalti, alt: 'khalti' },
    { src: conntectIps, alt: 'connectIps' },
    { src: nicAisa, alt: 'nicAisa' },
    { src: cod, alt: 'cash on delivery' },
    { src: visa, alt: 'visa' },
    { src: unionPay, alt: 'unionpay' },

    { src: americanExpress, alt: 'americanExpress' },
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
  }

  return (
    <section className="hero-section text-center  w-full h-auto">
      <Slider {...settings}>
        {paymentOptions.map((option, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={option.src}
              alt={option.alt}
              className="object-contain w-[200px] h-auto"
            />
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default SafePayment
