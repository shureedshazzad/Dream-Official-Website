import React, { useState } from 'react';
import { useGetDoctorsQuery } from '../slices/doctorsApiSlice';
import Loader from '../components/Loader';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';


function DoctorModel({ show, onHide, doctor }) {
    if (!doctor) {
      return null;
    }
  
    const handleCreateAppointment = () => {
      // Logic to handle creating an appointment
      // You can implement the desired functionality here
      // For example, redirecting to a new appointment creation screen
      // or triggering a function to initiate the appointment creation process.
    };
  
    return (
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Doctor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {doctor.name}</p>
          <p>Mobile Number: {doctor.mobileNumber}</p>
          <p>Email: {doctor.email}</p>
          <p>Specialized Area: {doctor.specializedArea}</p>
          <p>Working Days: {doctor.availableDays}</p>
          <p>Clinik Hours: {doctor.availableTime}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateAppointment} className="mx-auto">
            Create An Appointment <FontAwesomeIcon icon={faCalendarPlus} className="ml-2" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }


function Alldoctors() {

    const { data: doctors, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery();
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    
  if (doctorsLoading) {
    return <Loader />;
  }

  if (doctorsError) {
    return <div>Error loading doctors</div>;
  }


  return (
    <div className="container mt-5">
    <h1 className="text-center mb-4 wow fadeInUp">All Doctors</h1>

    <div className="row">
      {doctors.map((doctor, index) => (
        <div
          key={doctor._id}
          className={`col-lg-4 col-md-6 wow fadeInUp`}
          data-wow-delay={`0.${index + 1}s`}
        >
          <div className="service-item bg-light rounded h-100 p-5">
            <h4 className="mb-3">Name: {doctor.name}</h4>
            <p>Specialized Area: {doctor.specializedArea}</p>
            <div className="d-flex justify-content-between">
              <Button variant="info" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faInfo} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <CreateAppointmentModal show={showModal} onHide={() => setShowModal(false)} doctor={selectedDoctor} />
  </div>
  )
}

export default Alldoctors