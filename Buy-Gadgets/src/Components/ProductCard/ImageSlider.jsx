import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ImageSliderWithThumbnails = ({ images }) => {
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0) // Track the current slide

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next), // Update current slide
  }

  return (
    <div className="w-full flex flex-col items-center justify-center h-auto">
      {/* Main Slider Container */}
      <div className="w-[90%] h-auto flex  mt-40 items-center justify-center bg-[#f4f4f6] p-4 rounded-lg shadow-md">
        <Slider className="w-full h-auto" ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Thumbnail Container */}
      <div
        className="thumbnail-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => sliderRef.current.slickGoTo(index)}
            style={{
              width: '100px',
              height: 'auto',
              cursor: 'pointer',
              margin: '0 5px',
              borderRadius: '4px',
              backgroundColor:
                currentSlide === index ? '#f4f4f6' : 'transparent',
              transition: 'transform 0.2s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px',
                opacity: currentSlide === index ? 1 : 0.7, // Dim the non-current thumbnails
                transition: 'opacity 0.2s', // Smooth opacity transition
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageSliderWithThumbnails
