import React, { useState } from 'react';
import {useCreateDoctorMutation} from '../../slices/doctorsApiSlice.js';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';

function Createdoctorscreen() {


  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [specializedArea, setSpecializedArea] = useState('');
  const [availableDays, setAvailableDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  const [createDoctor, { isLoading }] = useCreateDoctorMutation();

  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/admin/doctor/all';



  const submitHandler = async (e) => {
    e.preventDefault();

    if (!/^(01[3-9]\d{8}|018\d{8})/.test(mobileNumber)) {
      //Check the phone number against the regular expression
      toast.error('Invalid Mobile Number')
      return;
   }

  

    // Add any additional validation logic if needed

    try {
      setLoading(true);

      // Use the createDoctor mutation
      const res = await createDoctor({
        name,
        mobileNumber,
        email,
        specializedArea,
        availableDays,
        availableTime: { startTime, endTime },
      }).unwrap();

      // Handle the response as needed (e.g., redirect or display a success message)
      console.log(res);
      toast.success('Doctor is created successfully');
      // Redirect to the appropriate page after doctor creation
      navigate(redirect);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create doctor');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="container-xxl py-5">
    <div className="container">

   

      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="bg-light rounded h-100 d-flex align-items-center p-5">
            <form onSubmit={submitHandler}>
              <h2 className="mb-4">Create A Doctor</h2>
              <div className="row g-3">


              
              
           <div className="col-12">
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
                    Create A Doctor
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
              src="/images/Doctor.jpeg"
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

export default Createdoctorscreen