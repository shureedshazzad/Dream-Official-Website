import React from 'react'
import { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import {  useGetDoctorByIdQuery,useUpdateDoctorMutation} from '../../slices/doctorsApiSlice.js';

function Doctoreditscreen() {

  const { id: doctorId } = useParams();

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [specializedArea, setSpecializedArea] = useState('');
  const [availableDays, setAvailableDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  const{
    data:doctor,
    isLoading,
    error,
    refetch,
  } = useGetDoctorByIdQuery(doctorId);

  const[updateDoctor, {isLoading: loadingUpdate}] = useUpdateDoctorMutation();

    
  const navigate = useNavigate();

  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
      await updateDoctor({doctorId,name,mobileNumber,email,specializedArea,availableDays, availableTime: { startTime, endTime }})
      toast.success("Doctor is updated successfully");
      refetch();
      navigate('/admin/doctor/all');
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(()=>{
    if(doctor){
      setName(doctor.name);
      setMobileNumber(doctor.mobileNumber);
      setEmail(doctor.email);
      setSpecializedArea(doctor.specializedArea);
      setAvailableDays(doctor.availableDays);
      setStartTime(doctor.availableTime.startTime);  // Corrected
      setEndTime(doctor.availableTime.endTime);   
    }
  },[doctor]);



  return (
    <div className="container-xxl py-5">
    <div className="container">

   

      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="bg-light rounded h-100 d-flex align-items-center p-5">
            <form onSubmit={submitHandler}>
              <h2 className="mb-4">Update Doctor</h2>
              <div className="row g-3">


              
              
           <div className="col-12">
            <label>Name:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Enter Name"
                    style={{ height: '55px' }}
                    value={name}
                   onChange={(e) => setName(e.target.value)}
                  required/>
           </div>


           <div className="col-12">
           <label>Speciality:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Enter Speciality"
                    style={{ height: '55px' }}
                    value={specializedArea}
                   onChange={(e) => setSpecializedArea(e.target.value)}
                  required/>
           </div>




           <div className="col-12">
           <label>Mobile Number:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Enter Mobile Number"
                    style={{ height: '55px' }}
                    value={mobileNumber}
                   onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
           </div>


           <div className="col-12">
           <label>Email:</label>
                  <input
                    type="email"
                    className="form-control border-0"
                    placeholder="Enter Email"
                    style={{ height: '55px' }}
                    value={email}
                   onChange={(e) => setEmail(e.target.value)}
                    required
                  />
           </div>


           <div className="col-12">
           <label>Starttime:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Enter StartTime"
                    style={{ height: '55px' }}
                    value={startTime}
                   onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
           </div>



           <div className="col-12">
            <label>Endtime</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Enter End Time"
                    style={{ height: '55px' }}
                    value={endTime}
                   onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
           </div>


           <div className='col-12'>
           <label>AvailAble Days:</label>
            <input
            type="text"
            className="form-control"
            id="availableDays"
            value={availableDays}
            onChange={(e) => setAvailableDays(e.target.value.split(','))}
            placeholder="Enter Availble Days(e.g., Monday,Wednesday)"
            required/>
           </div>



           


              <div className="col-12">
                  <button className="btn btn-danger w-100 py-3" type="submit" disabled={isLoading || loading}>
                   Update Doctor
                  </button>
                  {loading && <Loader />}
            </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="d-flex align-items-center justify-content-center h-100">
            <img
              src="/images/Doctor.jpg"
              alt="Doctor Image"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    
    </div>
  </div>
  )
}

export default Doctoreditscreen