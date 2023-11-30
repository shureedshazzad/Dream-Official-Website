import React, { useState } from 'react';
import { useGetDoctorByIdQuery } from '../slices/doctorsApiSlice';
import { useCreateAppointmentMutation} from '../slices/appointmentApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';


function Appointmentscreen() {

  const { id: doctorId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [appointmentDate,setAppointmentDate] = useState('');
  const [patientProblem, setPatientProblem] = useState('');
  const [loading, setLoading] = useState(false)

  const { data: doctorData, error: doctorError } = useGetDoctorByIdQuery(doctorId);

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/doctors';

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!/^(01[3-9]\d{8}|018\d{8})/.test(mobileNumber)) {
      //Check the phone number against the regular expression
      toast.error('Invalid Mobile Number')
      return;
   }

  

    try {
      setLoading(true);

      // Use the createAppointment mutation
      const res = await createAppointment({
        doctor_id: doctorId,
        name,
        email,
        mobileNumber,
        appointmentDate,
        patientProblem
      }).unwrap();

      // Handle the response as needed (e.g., redirect or display a success message)
      console.log(res);
      toast.success('Appointment created successfully');
      navigate(redirect);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create appointment');
    } finally {
      setLoading(false);
    }
  }

  const currentDate = new Date().toISOString().split('T')[0];



  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <p className="d-inline-block border rounded-pill py-1 px-4">Appointment</p>
            <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
            <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
              <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ width: '55px', height: '55px' }}>
                <i className="fa fa-phone-alt text-danger"></i>
              </div>
              <div className="ms-4">
                <p className="mb-2">Call Us Now</p>
                <h5 className="mb-0">+012 345 6789</h5>
              </div>
            </div>
            <div className="bg-light rounded d-flex align-items-center p-5">
              <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ width: '55px', height: '55px' }}>
                <i className="fa fa-envelope-open text-danger"></i>
              </div>
              <div className="ms-4">
                <p className="mb-2">Mail Us Now</p>
                <h5 className="mb-0">info@example.com</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
              <form onSubmit={submitHandler}>
                <div className="row g-3">
                  <div className="col-12">
                    <input type="text" className="form-control border-0" placeholder="Your Name" style={{ height: '55px' }}
                     value={name}
                     onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="col-12">
                    <input type="email" className="form-control border-0" placeholder="Your Email" style={{ height: '55px' }}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="col-12 ">
                    <input type="text" className="form-control border-0" placeholder="Your Mobile" style={{ height: '55px' }}
                         value={mobileNumber}
                         onChange={(e) => setMobileNumber(e.target.value)} required />
                  </div>
    
                  <div className="col-12 ">
                  <div className="input-group">
                    <span className="input-group-text" style={{ width: '60%' }}>
                      Appointment Date:
                    </span>
                    <input
                      type="date"
                      className="form-control border-0"
                      style={{ height: '35px', width: '40%' }}
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      min={currentDate} // Set the minimum date to the current date
                     required/>
                  </div>

                </div>
                  <div className="col-12">
                    <textarea className="form-control border-0" rows="5" placeholder="Describe your problem"
                    value={patientProblem}
                    onChange={(e) => setPatientProblem(e.target.value)}
                    required></textarea>


                  </div>

                  
                  
                <div className="col-12">
                    <button className="btn btn-danger w-100 py-3" type="submit" disabled={isLoading || loading}>
                     Book An Appointment
                    </button>
                    {loading && <Loader />}
              </div>


                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointmentscreen;
