import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import {useMakeBloodReqMutation} from '../slices/donorsApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';





function Blooddonationreqscreen() {

    const[patientProblem,setPatientProblem] = useState('');
    const[bloodGroup,setBloodGroup] = useState('');
    const[amountOfBlood,setAmountOfBlood] = useState(1);
    const[deadlineForDonation,setDeadLineForDonation] = useState('');
    const[contactNumber,setContactNumber] = useState('');
    const[location,setLocation] = useState('');
    const[additionalInfo,setAdditionalInfo] = useState('')
    const [loading, setLoading] = useState(false);
  


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[bloodReq,{isLoading}] = useMakeBloodReqMutation();

    const{ donorInfo } =  useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

      
 


  
    useEffect(() => {
      if (!donorInfo) {
        alert('Please log in to access this page.');
        navigate(`/login?redirect=${redirect}`);
      
      }
    }, [donorInfo, redirect, navigate]);
    const submitHandler = async (e) =>{
      e.preventDefault();
      if (!/^(01[3-9]\d{8}|018\d{8})/.test(contactNumber)) {
        //Check the phone number against the regular expression
        toast.error('Invalid Mobile Number')
        return;
     }
     else{
      try {
        setLoading(true);
        const res = await bloodReq({
          patientProblem,
          bloodGroup,
          amountOfBlood,
          deadlineForDonation,
          contactNumber,
          location,
          additionalInfo,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
   
        console.log(res);
        toast.success('Blood Donation Request Successful');
        navigate(redirect);

        
        
      } catch (err) {
        toast.error('Request Error');
      }
      finally{
        setLoading(false);
      }
    }
     

    }


    const currentDate = new Date().toISOString().split('T')[0];

    
  return (
    <div className="container-xxl py-5">
      <div className="container">

     

        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
              <form onSubmit={submitHandler}>
                <h2 className="mb-4">Create A Blood Request</h2>
                <div className="row g-3">
                    
                <div className="col-12">
                    <textarea
                    className="form-control border-0"
                    placeholder="Patient Problem"
                    style={{ height: '100px' }}  
                    value={patientProblem}
                    onChange={(e) => setPatientProblem(e.target.value)}
                    required
                   />
                </div>

                <div className="col-12">
                   <select
                  className="form-select border-0"
                  style={{ height: '55px' }}
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  required>
                  <option value="">Select Blood Group</option>
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


               <div className="col-12">
                  <div className="input-group">
                      <span className="input-group-text" style={{ width: '50%' }}>
                       Amount Of Blood Needed:
                      </span>
                      <input
                       type="number"
                       className="form-control border-0"
                       style={{ height: '35px', width: '10%', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
                       min="1" // Minimum allowed value (1 for positive integers)
                      step="1" // Increment step (1 for integers)
                      value={amountOfBlood}
                      onChange={(e) => setAmountOfBlood(e.target.value)}
                    required/>
                  <span className="input-group-text" style={{ width: '35%' }}>
                 Bags
               </span>
           </div>
         </div>



                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text" style={{ width: '60%' }}>
                      Last Date Of Donation:
                    </span>
                    <input
                      type="date"
                      className="form-control border-0"
                      style={{ height: '35px', width: '40%' }}
                      value={deadlineForDonation}
                      onChange={(e) => setDeadLineForDonation(e.target.value)}
                      min={currentDate} // Set the minimum date to the current date
                     required/>
                  </div>
                </div>

                
             <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Contact Number"
                      style={{ height: '55px' }}
                      value={contactNumber}
                     onChange={(e) => setContactNumber(e.target.value)}
                      required
                    />
             </div>


                <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Location"
                      style={{ height: '55px' }}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    required/>
                </div>


                <div className="col-12">
                    <textarea
                    className="form-control border-0"
                    placeholder="Addition Info"
                    style={{ height: '100px' }}  
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                   />
                </div>


                <div className="col-12">
                    <button className="btn btn-danger w-100 py-3" type="submit" disabled={isLoading || loading}>
                      Request Blood Donation
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
                src="/images/bloodreqpic.jpg"
                alt="Login Image"
                className="img-fluid"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default Blooddonationreqscreen ;
