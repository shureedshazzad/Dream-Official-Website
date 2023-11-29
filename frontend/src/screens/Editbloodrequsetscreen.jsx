import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBloodReqByIdQuery,useUpdateBloodReqMutation } from  '../slices/donorsApiSlice';
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';


const Editbloodrequsetscreen = () => {
  const { requestId } = useParams();

  const[patientProblem,setPatientProblem] = useState('');
  const[bloodGroup,setBloodGroup] = useState('');
  const[amountOfBlood,setAmountOfBlood] = useState(1);
  const[deadlineForDonation,setDeadLineForDonation] = useState('');
  const[contactNumber,setContactNumber] = useState('');
  const[location,setLocation] = useState('');
  const[additionalInfo,setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);






  // Fetch blood request details
  const { data: bloodReq  } = useGetBloodReqByIdQuery(requestId);

  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if(bloodReq){
      setPatientProblem(bloodReq.patientProblem);
      setBloodGroup(bloodReq.bloodGroup);
      setAmountOfBlood(bloodReq.amountOfBlood);
      setDeadLineForDonation(bloodReq.deadlineForDonation);
      setContactNumber(bloodReq.contactNumber);
      setLocation(bloodReq.location);
      setAdditionalInfo(bloodReq.additionalInfo);
    }
  }, [bloodReq]);




  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const { donorInfo } = useSelector((state) => state.auth);

  const [updateBloodReq, { isLoading }] = useUpdateBloodReqMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/pending-req';



  const submitHandler = async (e) => {
    e.preventDefault();
    if (!/^(01[3-9]\d{8}|018\d{8})/.test(contactNumber)) {
      //Check the phone number against the regular expression
      toast.error('Invalid Mobile Number')
      return;
   }
   else{
    try {
      setLoading(true);
      const dataToUpdate = {
        patientProblem,
        bloodGroup,
        amountOfBlood,
        deadlineForDonation,
        contactNumber,
        location,
        additionalInfo,
      };
       // Trigger the updateBloodReq mutation
      const res = await updateBloodReq({
          requestId,
          data: dataToUpdate,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success('Blood requsest is updated successfully');
      
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    finally {
      setLoading(false);
    }
  }
}








  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
              <form  onSubmit={submitHandler}>
                <h2 className="mb-4">Upadate The Blood Request</h2>
                <div className="row g-3">
                <div className="col-12">
                <label>Patient Problem:</label>
                    <textarea
                    className="form-control border-0"
                    style={{ height: '100px' }}  
                    value={patientProblem}
                    onChange={(e) => setPatientProblem(e.target.value)}
                   />
                </div>

                <div className="col-12">
                <label>Blood Group:</label>
                   <select
                  className="form-select border-0"
                  style={{ height: '55px' }}
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  >
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
                     
                    />
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
                     />
                  </div>
                </div>

                
             <div className="col-12">
             <label>Contact Number:</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    
                    />
             </div>


                <div className="col-12">
                <label>Location:</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      />
                   
                </div>


                <div className="col-12">
                <label>Additional Information:</label>
                    <textarea
                    className="form-control border-0"
                    style={{ height: '100px' }}  
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                   />
                </div>

                
                <div className="col-12">
                    <button className="btn btn-danger w-100 py-3" type="submit" disabled={isLoading || loading}>
                      Update Blood Request
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
};

export default Editbloodrequsetscreen;