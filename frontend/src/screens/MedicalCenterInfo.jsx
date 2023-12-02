import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faBed, faPhone, faUserNurse, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MedicalCenterInfo = () => {
  return (
    <div className="container">
      <h1 className="text-center">Kuet Medical Center</h1>
      <hr />
      <div className="row">
        <div className="col-sm-8">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed/v1/place?q=KUET+Medical+Center,+KUET+Road,+Khulna,+Bangladesh&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            width="100%"
            height="320"
            frameBorder="0"
            style={{ border: '0' }}
            allowFullScreen
          ></iframe>
        </div>

        <div className="col-sm-4" id="contact2">
          <h3>Information</h3>
          <hr align="left" width="50%" />
          
          <h5 className="pt-2"> <FontAwesomeIcon icon={faBed} style={{ color: '#000' }} /> Number of Beds: <small style={{color: ""}}>50</small></h5>
          <h5 className="pt-2"> <FontAwesomeIcon icon={faUserDoctor} style={{ color: '#000' }} /> Number of Doctors: <small style={{color: ""}}>5</small></h5>
          <h5 className="pt-2"> <FontAwesomeIcon icon={faUserNurse} style={{ color: '#000' }} /> Number of Nurses: <small style={{color: ""}}>3</small></h5>
          <h5 className="pt-2"> <FontAwesomeIcon icon={faClock} style={{ color: '#000' }} /> Opening Hours: <small style={{color: ""}}>9:00 AM - 5:00 PM</small></h5>
         <br />
        </div>
      </div>

      <br /><br />
      
        <div>
         <Link to="/doctors"><Button className='row bg-danger' style={{ width: '100%', fontWeight: "bold" }}>Doctor Appointments</Button></Link>
        </div>
        
      </div>
  
  );
};

export default MedicalCenterInfo;
