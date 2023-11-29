import React from 'react';

function Goals() {
  const containerStyle = {
    maxWidth: '600px',
  };

  const imageStyle = {
    width: '100%', // Set the width to 100% to make it responsive
    height: 'auto', // Maintain the image's aspect ratio
    marginTop: '10px', // Adjust the margin-top as needed
  };

  const listItemStyle = {
    listStyleType: 'disc',
    marginLeft: '10px',
    fontSize: '18px',
    marginBottom: '10px', // Add margin between list items
  };

  const highlightedText = {
    color: 'red', // Text color in red
  };

  return (
    <div className="container-xxl py-5" id="eligibility">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={containerStyle}>
          <h1>Are You Ready For Donate?</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.1s">
            <ul style={{ padding: '0' }}>
              <li style={listItemStyle}><span style={highlightedText}>Age:</span> In many countries, you must be at least 17 years old to donate blood. Some places may have a higher age requirement, such as 18.</li>
              <li style={listItemStyle}><span style={highlightedText}>Weight:</span> There is often a minimum weight requirement for blood donors, typically around 110 pounds (50 kilograms).</li>
              <li style={listItemStyle}><span style={highlightedText}>Health:</span> Donors should be in good health and feeling well on the day of donation. You should not have any active infections or illnesses.</li>
              <li style={listItemStyle}><span style={highlightedText}>Medications:</span> Certain medications can disqualify you from donating blood. It's essential to disclose any medications you are taking to the blood donation center.</li>
              <li style={listItemStyle}><span style={highlightedText}>Travel And High-Risk Activities:</span> If you've recently traveled to areas with a high risk of infectious diseases or engaged in risky behaviors, such as intravenous drug use, you may be temporarily ineligible to donate blood.</li>
            </ul>
          </div>
          <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.3s">
            <img src="/images/e.jpg" alt="Big Image" style={imageStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goals;
