import React from 'react';

const divStyle = {
  width: '65px',
  height: '65px'
};

function Goals() {
  const containerStyle = {
    maxWidth: '600px',
  };

  const circleStyle = {
    width: '65px',
    height: '65px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div className="container-xxl py-5" id="goals">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={containerStyle}>
          <h1>Our Goals</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item bg-light rounded h-100 p-5">
              <div style={circleStyle}>
                <i className="fa fa-heartbeat text-danger fs-4"></i>
              </div>
              <h4 className="mb-3">Promote Lifesaving Donation</h4>
              <p className="mb-4">Our primary goal is to encourage and facilitate regular blood donations among students, faculty, and staff. We aim to create awareness about the constant need for blood in healthcare settings and motivate individuals to become regular blood donors, ultimately saving lives in our community.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="service-item bg-light rounded h-100 p-5">
              <div style={circleStyle}>
                <i className="fa fa-users text-danger fs-4"></i>
              </div>
              <h4 className="mb-3">Community Engagement and Education</h4>
              <p className="mb-4">We strive to engage with our university community through various awareness campaigns, workshops, and educational events.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="service-item bg-light rounded h-100 p-5">
              <div style={circleStyle}>
                <i className="fa fa-handshake text-danger fs-4"></i>
              </div>
              <h4 className="mb-3">Collaboration and Outreach</h4>
              <p className="mb-4">We aim to collaborate with local healthcare organizations, blood banks, and NGOs to strengthen the impact of our efforts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goals;
