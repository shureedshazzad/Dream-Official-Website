import React, { useState,createContext } from 'react';
import { useGetDonorsQuery } from '../slices/donorsApiSlice';
import Loader from '../components/Loader';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


// Create a context
const BloodRequestContext = createContext();
function BloodRequestModal({ show, onHide, request, donorName }) {
  if (!request) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Blood Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Blood Group: {request.bloodGroup}</p>
        <p>Deadline For Donation: {new Date(request.deadlineForDonation).toDateString()}</p>
        <p>Contact Number: {request.contactNumber}</p>
        <p>Location: {request.location}</p>
        <p></p>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Otherbloodrequestsscreen() {
  const { data: donors, refetch: refetchDonors, isLoading: donorsLoading, error: donorsError } =
    useGetDonorsQuery();

  const { donorInfo } = useSelector((state) => state.auth); 
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);


  if (donorsLoading) {
    return <Loader />;
  }

  if (donorsError) {
    return <div>Error loading donors</div>;
  }

  const circleStyle = {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    background: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const editHandler = (requestId) => {
    const selectedRequest = donors
      .flatMap(donor => donor.bloodReqs)
      .find(request => request._id === requestId);

    setSelectedRequest(selectedRequest);
    setShowModal(true);
  };

  const currentDate = new Date();

  const noRequests = donors.every(donor => donor.bloodReqs.length === 0);

  if (noRequests) {
    return <div className="container mt-5">No available blood requests.</div>;
  }

  // Filter out blood requests of the currently logged-in donor
  const filteredDonors = donors
    .filter(donor => donor.email !== donorInfo?.email)
    .map(donor => ({
      ...donor,
      bloodReqs: donor.bloodReqs.filter(request => !selectedBloodGroup || request.bloodGroup === selectedBloodGroup),
    }));

     // Calculate the total count of blood requests for filtered donors
  const totalBloodRequestCount = filteredDonors.reduce(
    (count, donor) => count + donor.bloodReqs.length,
    0
  );

  console.log(totalBloodRequestCount);

    


  return (
    <BloodRequestContext.Provider value={totalBloodRequestCount}>
    <div className="container mt-5">
      <h1 className="text-center mb-4 wow fadeInUp">Blood Requests</h1>

      <div className="mb-4">
        <label htmlFor="bloodGroupSelect" className="form-label">
          Select Blood Group:
        </label>
        <select
          id="bloodGroupSelect"
          className="form-select"
          onChange={e => setSelectedBloodGroup(e.target.value)}
        >
          <option value="">All</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          {/* Add more blood group options as needed */}
        </select>
      </div>

      <div className="row">
        {filteredDonors.map((donor, index) =>
          donor.bloodReqs.map((request, reqIndex) => {
            const isDeadlinePending = new Date(request.deadlineForDonation) > currentDate;

            if (isDeadlinePending) {
              return (
                <div
                  key={`${donor._id}-${reqIndex}`}
                  className={`col-lg-4 col-md-6 wow fadeInUp`}
                  data-wow-delay={`0.${index + 1}s`}
                >
                  <div className="service-item bg-light rounded h-100 p-5">
                    <div style={circleStyle}>
                      <i className="fa fa-heartbeat text-danger"></i>
                    </div>
                    <h4 className="mb-3">Blood Group: {request.bloodGroup}</h4>
                    <p>Request Sender: {donor.name}</p>
                    <p>Deadline For Donation: {new Date(request.deadlineForDonation).toDateString()}</p>
                    <p>Contact Number: {request.contactNumber}</p>
                    <p>Location: {request.location}</p>
                    <div className="d-flex justify-content-between">
                   
                        <Button variant="info" onClick={() => editHandler(request._id)}>
                          <FontAwesomeIcon icon={faInfo} />
                        </Button>
                   
                      <Button variant="info">
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })
        )}
      </div>

      <BloodRequestModal
        show={showModal}
        onHide={() => setShowModal(false)}
        request={selectedRequest}
        donorName={selectedRequest?.donorName}
      />

     

    </div>
    </BloodRequestContext.Provider>
  );
}

export default Otherbloodrequestsscreen; 
export {BloodRequestContext};