import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import {useGetAllBloodRequestsQuery,
  useAcceptBloodRequestMutation
} from '../slices/privateBloodRequestApiSlice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';




function BloodRequestModal({ show, onHide, request }) {

  

   // Create a mutation hook instance
   const [acceptBloodReqeust, { isLoading }] = useAcceptBloodRequestMutation();

 

  if (!request) {
    return null;
  }

  


  const handleBloodRequestAccept = async (bloodRequstId) => {
    try {
;
      // Call the mutation function
      const result = await acceptBloodReqeust(bloodRequstId);

      // Handle success, if needed
      if (result.error) {
        // Handle any errors returned by the mutation
        toast.error('Failed to accept bloodRequest.');
      } else {
        // Handle success, if needed
        toast.success('Blood Request is approved successfully.');
        onHide();
  
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error accepting blood request:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Blood Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Request Sender:{request.donor_id.name}</p>
        <p>Patient Problem:{request.patientProblem}</p>
        <p>Blood Group: {request.bloodGroup}</p>
        <p>Amount Of Blood:{request.amountOfBlood} bags</p>
        <p></p>
        <p>Deadline For Donation: {new Date(request.deadlineForDonation).toDateString()}</p>
        <p>Contact Number: {request.contactNumber}</p>
        <p>Location: {request.location}</p>
        <p>Additonal Info: {request.additionalInfo}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
      <Button
          variant="success"
          onClick={() => handleBloodRequestAccept(request._id)}
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? <Loader /> : 'Accept'}
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Allbloodreqofadonorscreen() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('all');
  const { donorInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { data: bloodReqs = [], refetch, isLoading, error } = useGetAllBloodRequestsQuery();




  const handleShowDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading blood requests</div>;
  }

  const filterBloodReqs = () => {
    let filteredReqs = bloodReqs;

    if (selectedBloodGroup !== 'all') {
      filteredReqs = filteredReqs.filter((req) => req.bloodGroup === selectedBloodGroup);
    }

    if (donorInfo) {
      filteredReqs = filteredReqs.filter((req) => req.donor_id._id !== donorInfo._id);
    }

    // Filter out blood requests with a deadline that has already passed
    const currentDate = new Date();
    filteredReqs = filteredReqs.filter((req) => new Date(req.deadlineForDonation) >= currentDate);
    // Filter requests with state other than "pending"
    filteredReqs = filteredReqs.filter((req) => req.status == 'pending');

    return filteredReqs;
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

  return (
    <div className="container-xxl py-5" id="blood-requests">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Pending Blood Donation Requests</h1>
        </div>
        <div className="mb-3 wow fadeInUp" data-wow-delay="0.1s">
          <label>Select Blood Group:</label>
          <select
            className="form-control form-control-sm"
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
          >
            <option value="all">All Blood Groups</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        {filterBloodReqs().length === 0 ? (
          <h3 className="text-center">No Blood Donation Requests</h3>
        ) : (
          <div className="row g-4">
            {filterBloodReqs().map((request, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`0.${index + 1}s`}
              >
                <div className="bg-light rounded h-100 p-5">
                  <div style={circleStyle}>
                    <i className="fa fa-heartbeat text-danger"></i>
                  </div>
                  <h4 className="mb-3">Blood Group: {request.bloodGroup}</h4>
                  <p>Requet Sender:{request.donor_id.name}</p>
                  <p>Deadline For Donation: {new Date(request.deadlineForDonation).toDateString()}</p>
                  <p>Contact Number: {request.contactNumber}</p>
                  <p>Location: {request.location}</p>
             
                  <div className="d-flex justify-content-between">
                  <Button
                      rounded-5
                      variant="success"
                      onClick={() => handleShowDetails(request)}
                      style={{ marginRight: 'auto' }} // "Show Details" button to the left
                    >
                      Show Details
                    </Button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: 'auto' }} // "Delete" button to the right
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <BloodRequestModal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setSelectedRequest(null);
          }}
          request={selectedRequest}
        />
      </div>
    </div>
  );
}

export default Allbloodreqofadonorscreen;
