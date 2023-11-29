import React from 'react'
import pic1 from './header_img/pic1.jpg';
import pic2 from './header_img/pic2.jpg';
import pic3 from './header_img/pic3.jpg';



function Header() {
  return (
    <div className="container-fluid header bg-danger p-0 mb-5">
        <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
            <div className="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
                <h1 className="display-10 text-white mb-5 font-italic">At Dream Blood Donation Club, we're dedicated to saving lives through voluntary blood donation. Join us in making a meaningful impact, one pint at a time.</h1>
                <div className="row g-4">
                </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <div className="owl-carousel header-carousel">
                    <div className="owl-carousel-item position-relative">
                        <img className="img-fluid" src={pic1} alt=""/>
                    </div>
                    <div className="owl-carousel-item position-relative">
                        <img className="img-fluid" src={pic2} alt=""/>
                    </div>
                    <div className="owl-carousel-item position-relative">
                        <img className="img-fluid" src={pic3} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header