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
            <div className="service-item bg-light rounded h-100 p-5">
              <img src='/images/heart.png' alt="Image 1" style={imageStyle} />
              <h4 className="mb-3">Reduced Risk Of Heart Diseases</h4>
              <p className="mb-4">A diet rich in iron can elevate iron levels in the body. However, the human body can only absorb limited proportions of this iron, resulting in an accumulation of excess iron in vital organs such as the heart, liver, and pancreas. This surplus of iron can contribute to the development of heart diseases. By donating blood regularly, you actively help regulate iron levels in your body, reducing the risk of iron-related heart complications. This simple yet impactful act supports cardiovascular health, fostering a preventive approach to maintaining a healthy heart and overall well-being.</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="service-item bg-light rounded h-100 p-5">
              <img src='/images/cancer.png' alt="Image 1" style={imageStyle} />
              <h4 className="mb-3">Reduces Risk Of Cancer</h4>
              <p className="mb-4">When you donate blood, the iron storage levels in the body are maintained at a healthy level. This is crucial because elevated levels of iron have been scientifically linked to an increased risk of developing various types of cancer. By regularly donating blood, you actively contribute to maintaining optimal iron levels in your body, thereby diminishing the potential risk associated with high iron concentrations and promoting a healthier lifestyle.</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="service-item bg-light rounded h-100 p-5">
              <img src='/images/blood.png' alt="Image 1" style={imageStyle} />
              <h4 className="mb-3">Replenishes Your Blood Cells</h4>
              <p className="mb-4">Donating blood goes beyond the act of generosity; it plays a crucial role in maintaining overall health. When you donate blood, your body initiates the process of replenishing the blood cells lost during the donation. This regeneration not only ensures a consistent and healthy blood supply but also stimulates the production of new, vibrant blood cells. The rejuvenation of blood cells contributes significantly to your general well-being, supporting vital bodily functions and promoting optimal health. By engaging in regular blood donation, you actively participate in this self-sustaining cycle of wellness, fostering not only your health but the well-being of those who benefit from your altruism.</p>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="service-item bg-light rounded h-100 p-5">
              <img src='/images/lives.png' alt="Image 1" style={imageStyle} />
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
