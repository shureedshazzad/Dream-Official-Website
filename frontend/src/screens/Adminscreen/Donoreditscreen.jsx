import React from 'react'
import { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetDonorDetailsQuery,useUpdateDonorMutation,useUploadCommitteeMemberImageMutation } from '../../slices/donorsApiSlice';

const Donoreditscreen = () => {

  const { id: donorId } = useParams();
  const[name,setName] = useState('');
  const[dept,setDept] = useState('');
  const[batch,setBatch] = useState('');
  const[email,setEmail] = useState('');
  const[phoneNumber,setPhoneNumber] = useState('');
  const[bloodType,setBloodType] = useState('');
  const[isCommitteeMember,setIsCommitteeMember] = useState(false);
  const[committeeImage,setCommitteeImage] = useState('');
  const[committeePost,setCommitteePost] = useState('');
  const [loading, setLoading] = useState(false);

  const{
    data:donor,
    isLoading,
    error,
    refetch,
  } = useGetDonorDetailsQuery(donorId);

  const[updateDonor, {isLoading: loadingUpdate}] = useUpdateDonorMutation();

  const[uploadCommitteeMemberImage,{ isLoading: loadingUpload} ] = useUploadCommitteeMemberImageMutation();
  
  const navigate = useNavigate();


  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
      await updateDonor({donorId,isCommitteeMember,committeePost,committeeImage})
      toast.success("Donor is updated successfully");
      refetch();
      navigate('/admin/donorInfo');
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(()=>{
    if(donor){
      setName(donor.name);
      setDept(donor.dept);
      setBatch(donor.batch);
      setEmail(donor.email);
      setPhoneNumber(donor.phoneNumber);
      setBloodType(donor.bloodType);
      setIsCommitteeMember(donor.isCommitteeMember);
      setCommitteePost(donor.committeePost);
      setCommitteeImage(donor.committeeImage);
    }
  },[donor]);




 const uploadFileHandler = async (e) =>{
  const formData = new FormData();
  formData.append('image' , e.target.files[0]);
  try {
    const res = await uploadCommitteeMemberImage(formData).unwrap();
    toast.success(res.message);
    setCommitteeImage(res.image)
  } catch (err) {
    toast.error(err?.data?.message || err.error);
  }
 }
  
 

  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="bg-light rounded h-100 d-flex align-items-center p-5">
            <form onSubmit={submitHandler}>
              <h2 className="mb-4">Edit Donor Info</h2>
              <div className="row g-3">
                <div className="col-12">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={name}
                  />
                </div>
                <div className="col-12">
                  <label>Department:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={dept}
                  />
                </div>

                <div className="col-12">
                  <label>Batch:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={batch}
                  />
                </div>
                <div className="col-12">
                  <label>Email:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={email}
                  />
                </div>
                <div className="col-12">
                  <label>PhoneNumber:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={phoneNumber}
                  />
                </div>
                <div className="col-12">
                  <label>Blood Type:</label>
                  <input
                     type="text"
                     className="form-control border-0"
                     style={{ height: '55px' }}
                     value={bloodType}
                  />
                </div>

                <div className="col-12">
                  <label>Member Status:</label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={isCommitteeMember}
                    onChange={(e) => setIsCommitteeMember(e.target.checked)}
                  />
                </div>

                <div className="col-12">
                  <label>Post:</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={committeePost}
                    onChange={(e) => setCommitteePost(e.target.value)}
                  />
                </div>

                 <div className="col-12">
                  <label>Image</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={committeeImage}
                    onChange={(e) => setCommitteeImage(e.target.value)}
                  />

                  <input
                    type="file"
                    label="Choose file"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    onChange={uploadFileHandler}
                  />

                </div> 





                <div className="col-12">
                  <button
                    className="btn btn-danger w-100 py-3"
                    type="submit"
                    disabled={loading || loadingUpdate}
                  >
                    Update Donor
                  </button>
                  {loadingUpdate && <Loader />}
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* The image column, similar to Loginscreen */}
      </div>
    </div>
   </div>

   

  )
}

export default Donoreditscreen