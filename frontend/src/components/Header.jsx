import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import pic1 from './header_img/pic1.jpg';
import pic2 from './header_img/pic2.jpg';
import { faItalic } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container-fluid header bg-danger p-0 mb-5">
      <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
        {/* Text Column */}
        <div className="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
          <h1 className="display-10 text-white mb-5" style={{fontStyle: 'italic', fontSize: '30px'}}>At Dream Blood Donation Club of KUET, our commitment revolves around the noble cause of preserving lives through voluntary blood donation. We invite you to join hands with us in creating a profound difference, one pint at a time. Your participation can be the lifeline that makes a lasting impact on the well-being of those in need</h1>
          <div className="row g-3">
            {/* Additional content if needed */}
          </div>
        </div>

        {/* Image Slider Column */}
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <div className="slider-container" style={{marginLeft: 200}}>
            <Slider {...settings}>
              <div>
                <img className="img-fluid" src={pic1} alt="Header Image 1" />
              </div>
              <div>
                <img className="img-fluid" src={pic2} alt="Header Image 2" />
              </div>
              {/*<div>
                <img className="img-fluid" src={pic1} alt="Header Image 3" />
              </div>*/}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
