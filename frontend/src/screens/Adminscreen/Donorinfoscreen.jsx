import React from 'react'
import Loader from '../../components/Loader'
import { useGetDonorsQuery,useDeleteDonorsMutation } from '../../slices/donorsApiSlice'
import { Table ,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
const Donorinfoscreen = () => {

  const{ data: donors, refetch, isLoading, error} = useGetDonorsQuery();

  const[deleteDonor, {isLoading: loadingDelete}] = useDeleteDonorsMutation();

  const editHandler = (id) =>{
    console.log('edit');
  }

  const deleteHandler = async(id,isAdmin) => {

    if(isAdmin){
      toast.error("Cannot delete admin donor");
      return;
    }

    if(window.confirm("Are you sure you want to delete the donor?")){
      try {
        await deleteDonor(id);
        toast.success('Donor is deleted');
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
    return <div>Error loading donors</div>;
  }


 

  return (
    <div className="container mt-5">
    <h1 className="text-center mb-4 wow fadeInUp">Donors</h1>
    {loadingDelete && <Loader/>}
    <Table striped hover responsive className='table-sm wow fadeInUp'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Committee Member</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {donors.map((donor, index) => (
          <tr key={donor._id} className={`wow fadeInUp`} data-wow-delay={`0.${index + 1}s`}>
            <td>{donor._id}</td>
            <td>{donor.name}</td>
            <td>{donor.email}</td>
            <td>
              {donor.isAdmin ? (
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
              )}
            </td>
            <td>
              {donor.isCommitteeMember ? (
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
              )}
            </td>
            <td>
              <LinkContainer to = {`/admin/donor/${donor._id}/edit`}>
              <Button variant="info" onClick={() => editHandler(donor._id)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              </LinkContainer>
            </td>
            <td>
              <Button variant="danger" onClick={() => deleteHandler(donor._id,donor.isAdmin)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  );
}

export default Donorinfoscreen;