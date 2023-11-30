import React, { useState } from 'react';
import { useGetDoctorsQuery } from '../slices/doctorsApiSlice';
import Loader from '../components/Loader';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';

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
        <p>Clinik Hours: {doctor.availableTime.startTime}-{doctor.availableTime.endTime}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <LinkContainer to={`/doctors/appointment/${doctor._id}`} >
        <Button variant="primary" onClick={handleCreateAppointment} className="mx-auto">
          Create An Appointment <FontAwesomeIcon icon={faCalendarPlus} className="ml-2" />
        </Button>
        </LinkContainer>
      </Modal.Footer>
    </Modal>
  );
}

function Alldoctors() {
  const { data: doctors, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery();
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecializedArea, setSelectedSpecializedArea] = useState(null);

  if (doctorsLoading) {
    return <Loader />;
  }

  if (doctorsError) {
    return <div>Error loading doctors</div>;
  }

  const editHandler = (doctorId) => {
    const selectedDoctor = doctors.find(doctor => doctor._id === doctorId);
    setSelectedDoctor(selectedDoctor);
    setShowModal(true);
  };

  const circleStyle = {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    background: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Get unique specialized areas from the doctors
  const specializedAreas = [...new Set(doctors.map(doctor => doctor.specializedArea))];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 wow fadeInUp">All Doctors</h1>

      <div className="mb-4">
        <label htmlFor="specializedAreaSelect" className="form-label">
          Select Specialized Area:
        </label>
        <select
          id="specializedAreaSelect"
          className="form-select"
          onChange={(e) => setSelectedSpecializedArea(e.target.value)}
        >
          <option value="">All</option>
          {specializedAreas.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        {doctors
          .filter((doctor) => !selectedSpecializedArea || doctor.specializedArea === selectedSpecializedArea)
          .map((doctor, index) => (
            <div
              key={doctor._id}
              className={`col-lg-4 col-md-6 wow fadeInUp`}
              data-wow-delay={`0.${index + 1}s`}
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div style={circleStyle}>
                  <i className="fas fa-user-md text-danger"></i>
                </div>
                <h4 className="mb-3">Name: {doctor.name}</h4>
                <p>Specialized Area: {doctor.specializedArea}</p>
                <div className="d-flex justify-content-between">
                  <Button variant="info" onClick={() => editHandler(doctor._id)}>
                    Show Info
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <DoctorModel show={showModal} onHide={() => setShowModal(false)} doctor={selectedDoctor} />
    </div>
  );
}

export default Alldoctors;
