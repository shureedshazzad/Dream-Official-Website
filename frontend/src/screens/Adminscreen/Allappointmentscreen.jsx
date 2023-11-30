import React from 'react'
import Loader from '../../components/Loader'
import {useGetAllAppointmentsQuery, useDeleteAppointmentMutation} from '../../slices/appointmentApiSlice.js';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faTimes,faInfo  } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';


function Allappointmentscreen() {

    const { data: appointments, refetch, isLoading, error } = useGetAllAppointmentsQuery();
    const [deleteAppointment, { isLoading: loadingDelete }] = useDeleteAppointmentMutation();


    
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete the appointment?')) {
      try {
        await deleteAppointment(id);
        toast.success('Appointment is deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading appointments</div>;
  }


  return (
    <div className="container mt-5">
    <h1 className="text-center mb-4 wow fadeInUp">ALL APPOINTMENTS</h1>

    {loadingDelete && <Loader />}
    <Table striped hover responsive className="table-sm wow fadeInUp">
      <thead>
        <tr>
          <th>ID</th>
          <th>Patient Name</th>
          <th>Patient Email</th>
          <th>Appointment Date</th>
          <th>Approved</th>
          <th>Doctor Name</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={appointment._id} className={`wow fadeInUp`} data-wow-delay={`0.${index + 1}s`}>
            <td>{appointment._id}</td>
            <td>{appointment.name}</td>
            <td>{appointment.email}</td>
            <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
            <td>
            {appointment.status ? (
                  <FontAwesomeIcon icon={faCheck} color="green" />
                ) : (
                  <FontAwesomeIcon icon={faTimes} color="red" />
            )}
            </td>
            <td>{appointment.doctor_id._id}</td>

            <td>
              <LinkContainer to={`/admin/appointment/${appointment._id}`}>
              <Button variant="info" >
                <FontAwesomeIcon icon={faInfo} />
              </Button>
              </LinkContainer>
            
            </td>

            <td>
              <Button variant="danger" onClick={() => deleteHandler(appointment._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
         
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  )
}

export default Allappointmentscreen