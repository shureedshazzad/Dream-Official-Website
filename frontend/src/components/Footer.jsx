import React from 'react';

const footerStyle = {
  backgroundColor: '#343a40', // Dark background color
  color: '#fff',             // Text color
  padding: '40px 0',         // Padding top and bottom
};

const addressStyle = {
  marginBottom: '20px',       // Margin bottom for the address
};

const copyrightStyle = {
  borderTop: '1px solid rgba(255, 255, 255, 0.2)', // Border color
  paddingTop: '20px',                              // Padding top
};

const Footer = () => {
  return (
    <div className="container-fluid" style={footerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center" style={addressStyle}>
            <p>
              Address: Khulna University of Engineering & Technology, Khulna, Bangladesh | Phone: +123 456 789 | Email: info@example.com
            </p>
          </div>
        </div>
        <div className="row">
          {/* Additional content or columns can be added here */}
        </div>
        <div className="row">
          <div className="col-md-12 text-center" style={copyrightStyle}>
            <p>
              &copy; 2023 DREAM.com. All Rights Reserved. | Designed By <a href="https://github.com/shureedshazzad" style={{ color: '#3498db', textDecoration: 'underline' }}>Shureed Shazzad</a> &
              <a href="https://github.com/Sk-Azraf-Sami" style={{ color: '#3498db', textDecoration: 'underline' }}> Azraf Sami</a>
            
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
