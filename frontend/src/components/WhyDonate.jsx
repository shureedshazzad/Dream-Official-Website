import React from 'react';

const containerStyle = {
  maxWidth: '600px',
};

const imageStyle = {
  width: '150px',  // Adjust the image size
  height: '150px', // Adjust the image size
};

function WhyDonate() {
  return (
    <div className="container-xxl py-5" id="why-donate">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={containerStyle}>
          <h1>Why Donate Blood</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item bg-danger rounded h-100 p-5">
              <img src='/images/heart.jpg' alt="Image 1" style={imageStyle} />
              <h4 className="mb-3">Reduced Risk Of Heart Diseases</h4>
              <p className="mb-4">When you have a rich diet, the level of iron in the body increases, and since only limited proportions of this iron can be absorbed, excess of it gets stored in the heart, liver, and pancreas. Excess iron levels in the heart can lead to heart diseases.</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="service-item bg-danger rounded h-100 p-5">
              <img src='/images/cancer.jpg' alt="Image 1" style={imageStyle} />
              <h4 className="mb-3">Reduces Risk Of Cancer</h4>
              <p className="mb-4">When you donate, the iron storage levels in the body are maintained at a healthy level. High levels of iron have been linked to a high cancer risk.</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="service-item bg-danger rounded h-100 p-5">
              <img src='/images/blood.jpg' alt="Image 1" style={imageStyle} />
              <h4 className="mb-3">Replenishes Your Blood Cells</h4>
              <p className="mb-4">By donating blood, your cells are replenished, which helps in maintaining good health.</p>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="service-item bg-danger rounded h-100 p-5">
              <img src='/images/lives.jpg' alt="Image 1" style={imageStyle} />
              <h4 className="mb-3">Saves Lives</h4>
              <p className="mb-4">Voluntary blood donation saves lives by ensuring a consistent and safe supply of blood for medical treatments, emergencies, and surgeries. This selfless act contributes to public health and plays a pivotal role in healthcare systems. It reduces the risk of disease transmission and promotes community support. Ultimately, voluntary blood donation reflects humanitarian values and directly impacts the well-being of individuals in need of blood transfusions, making it a critical lifeline in the healthcare ecosystem.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyDonate;
