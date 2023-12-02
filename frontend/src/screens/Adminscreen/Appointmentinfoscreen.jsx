import React from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useGetAppointmentByIdQuery,useConfirmAppointmentMutation } from '../../slices/appointmentApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Appointmentinfoscreen() {

    const { id: appointmentId } = useParams();

    const navigate = useNavigate();

    const { data: appointment, isLoading, error } = useGetAppointmentByIdQuery(appointmentId);


    // Add this line to get the mutation function
  const [confirmAppointment, { isLoading: confirmLoading }] = useConfirmAppointmentMutation();


  const handleApproveAppointment = async (appointmentId) => {
    try {
      // Call the mutation function
      const result = await confirmAppointment(appointmentId);

      // Handle success, if needed
      if (result.error) {
        // Handle any errors returned by the mutation
        toast.error('Failed to approve appointment.');
      } else {
        // Handle success, if needed
        toast.success('Appointment approved successfully.');
        navigate('/admin/appointment');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error approving appointment:', error);
      toast.error('An unexpected error occurred.');
    }
  };

 
    
   
 

    
    
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading appointment details</div>;
  }

  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <h2 className="mb-4">Appointment Details</h2>
          <ul>
            <li>
              <strong>ID:</strong> {appointment._id}
            </li>
            <li>
              <strong>Patient Name:</strong> {appointment.name}
            </li>
            <li>
              <strong>Patient Email:</strong> {appointment.email}
            </li>
            <li>
            <strong>Patient MobileNumber:</strong> {appointment.mobileNumber}
            </li>
            <li>
              <strong>Patien Problem:{appointment.patientProblem}</strong>
            </li>
            <li>
              <strong>Appointment Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
            </li>
            <li>
              <strong>Doctor Name:{appointment.doctor_id.name}</strong>
            </li>
            {/* Add more details as needed */}
          </ul>
          {!appointment.status && (
             <button
             className="btn btn-success" // Change to your preferred color (e.g., btn-primary, btn-info, etc.)
             onClick={() => handleApproveAppointment(appointment._id)}
             disabled={confirmLoading}
           >
             {confirmLoading ? <Loader size={24} /> : 'Approve'}
           </button>
           )}
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
        <img
            src="/images/app.jpg"
            alt="Login Image"
            className="img-fluid"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Appointmentinfoscreen