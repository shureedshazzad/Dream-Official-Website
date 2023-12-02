import React from 'react'

const footerWidth = {
    maxWidth: '400px',
};
const logoStyle = {
    height: "40px",
    width: "40px"
  };

function Footer() {
  return (
    <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-4">
                    <h5 className="text-light mb-4">Address</h5>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Khulna University of Engineering & Technology, Khulna</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                    <div className="d-flex pt-2">
                        <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="col-lg-9 col-md-6" style={{marginTop: "100px"}}>
                At Dream Blood Donation Club of KUET, our commitment revolves around the noble cause of preserving lives through voluntary blood donation. We invite you to join hands with us in creating a profound difference, one pint at a time. Your participation can be the lifeline that makes a lasting impact on the well-being of those in need
                <p style={{marginTop: "5px"}}>
                    Powered by: 
                </p>
                <p>
                <img src="/images/logo.png" alt="Logo" className="mr-2" style={logoStyle}/>
                <img src="/images/kuetLogo.png" alt="Logo" className="mr-2" style={{ ...logoStyle, marginLeft: "15px" }}
/>
                </p>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a href="#">dream.com</a>, All Right Reserved.
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        Designed By <a href="https://github.com/shureedshazzad" style={{ color: '#3498db', textDecoration: 'underline' }}>Shureed Shazzad</a> &
                <a href="https://github.com/Sk-Azraf-Sami" style={{ color: '#3498db', textDecoration: 'underline' }}> Azraf Sami</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer