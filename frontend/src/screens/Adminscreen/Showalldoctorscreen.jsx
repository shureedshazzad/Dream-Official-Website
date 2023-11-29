import React from 'react'
import Loader from '../../components/Loader'
import { useGetDoctorsQuery, useDeleteDoctorMutation} from '../../slices/doctorsApiSlice.js';
import { Table ,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';

const Showalldoctorscreen = () => {

    const{ data:doctors, refetch, isLoading, error} = useGetDoctorsQuery();

    const[deleteDoctor, {isLoading: loadingDelete}] = useDeleteDoctorMutation();
  
    const editHandler = (id) =>{
      console.log('edit');
    }

    const deleteHandler = async(id) => {

    
        if(window.confirm("Are you sure you want to delete the donor?")){
          try {
            await deleteDoctor(id);
            toast.success('Doctor is deleted');
            refetch();
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      }
    
      if (isLoading) {
        return <Loader />;
      }
    
      if (error) {
        return <div>Error loading doctors</div>;
      }
    
  


  return (
    <div className="container mt-5">

     <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center mb-4 wow fadeInUp">ALL DOCTORS</h1>
        <LinkContainer to="/admin/doctor/create">
          <Button variant="danger">Create Doctor</Button>
        </LinkContainer>
    </div>


    {loadingDelete && <Loader/>}
    <Table striped hover responsive className='table-sm wow fadeInUp'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor, index) => (
          <tr key={doctor._id} className={`wow fadeInUp`} data-wow-delay={`0.${index + 1}s`}>
            <td>{doctor._id}</td>
            <td>{doctor.name}</td>
            <td>{doctor.email}</td>
            <td>
            
              <Button variant="info" onClick={() => editHandler(doctor._id)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
           
            </td>
            <td>
              <Button variant="danger" onClick={() => deleteHandler(doctor._id)}>
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

export default Showalldoctorscreen
