import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteBloodReqMutation } from '../slices/donorsApiSlice';
import { setCredentials } from '../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Pendingbloodreqscreen() {
  const [bloodReqs, setBloodReqs] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('all'); // Default to show all
  const { donorInfo } = useSelector((state) => state.auth);

  const [deleteReq] = useDeleteBloodReqMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (donorInfo && donorInfo.bloodReqs) {
      const validBloodReqs = donorInfo.bloodReqs.filter(
        (req) => new Date(req.deadlineForDonation) >= new Date()
      );
      setBloodReqs(validBloodReqs);
    }
  }, [donorInfo]);

  const reloadPage = () => {
    const confirmed = window.confirm("Are you sure you want to reload the page?");
    if (confirmed) {
      window.location.reload();
    }
  };

  const editHandler = (id) => {
    console.log('edit');
  };

  const handleDeleteBloodReq = async (requestId) => {
    if (window.confirm("Are you sure you want to delete the donor?")) {
      try {
        await deleteReq(requestId);
        toast.success('Blood request is deleted');
        const updatedDonorInfo = { ...donorInfo, bloodReqs: bloodReqs.filter(req => req._id !== requestId) };
        dispatch(setCredentials(updatedDonorInfo));
        setBloodReqs(updatedDonorInfo.bloodReqs);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

 

  const filterBloodReqs = () => {
    if (selectedBloodGroup === 'all') {
      return bloodReqs;
    } else {
      return bloodReqs.filter(req => req.bloodGroup === selectedBloodGroup);
    }
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
          <h1>Blood Donation Requests</h1>
          <button onClick={reloadPage} className="btn btn-danger">
            If you don't see your request click here to reload.
          </button>
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
                <div className="service-item bg-light rounded h-100 p-5">
                  <div style={circleStyle}>
                    <i className="fa fa-heartbeat text-danger"></i>
                  </div>
                  <h4 className="mb-3">Blood Group: {request.bloodGroup}</h4>
                  <p>Deadline For Donation: {new Date(request.deadlineForDonation).toDateString()}</p>
                  <p>Contact Number: {request.contactNumber}</p>
                  <p>Location: {request.location}</p>
                  <div className="d-flex justify-content-between">
                    <LinkContainer to={`/blood-req/${request._id}`}>
                      <Button variant="info" onClick={() => editHandler(request._id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </LinkContainer>
                    <Button variant="info" onClick={() => handleDeleteBloodReq(request._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pendingbloodreqscreen;
