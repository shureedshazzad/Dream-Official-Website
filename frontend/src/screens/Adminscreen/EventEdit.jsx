import React from 'react'
import { useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useGetEventByIdQuery,useUpdateEventMutation,useUploadImageMutation} from '../../slices/eventsApiSlice';


function EventEdit() {

  const { id: eventId } = useParams();

  
  const [heading,setHeading] = useState('');
  const [description,setDescription] = useState('');
  const [image,setImage] = useState('');
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [loading, setLoading] = useState(false);


  const{
    data:event,
    isLoading,
    error,
    refetch,
  } = useGetEventByIdQuery(eventId);

  const[updateEvent, {isLoading: loadingUpdate}] = useUpdateEventMutation();

  
  const[uploadImage,{ isLoading: loadingUpload} ] = useUploadImageMutation();

  const navigate = useNavigate();


  const submitHandler = async (e) =>{
    e.preventDefault();


    try {
      await updateEvent({eventId,heading,description,image,   availableday: { startDate, endDate }})
      toast.success("Event is updated successfully");
      refetch();
      navigate('/admin/event/all');
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    finally {
      setLoading(false);
    }

  }

  
  useEffect(()=>{
    if(event){
      setHeading(event.heading);
      setDescription(event.description);
      setImage(event.image);
      setStartDate(event.startDate);
      setEndDate(event.endDate);
    }
  },[event]);


  const uploadFileHandler = async (e) =>{
    const formData = new FormData();
    formData.append('image' , e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
              <h2 className="mb-4">Update Event</h2>
              <div className="row g-3">
                <div className="col-12">
                  <label>Heading</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder='Enter The Event Heading'
                    style={{ height: '55px' }}
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                  
                  />
                </div>


                <div className="col-12">
                  <label>Description</label>
                    <textarea
                      className="form-control border-0"
                      placeholder="Enter The Event Description"
                      style={{ height: '200px' }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  
                    />
                  </div>

                <div className="col-12">
                    <label>StartDay</label>
                  <input
                    type="date"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={startDate}
                    min={currentDate} 
                   onChange={(e) => setStartDate(e.target.value)}
                
                  />
           </div>



           <div className="col-12">
            <label>Endday</label>
                  <input
                    type="date"
                    className="form-control border-0"
               
                    style={{ height: '55px' }}
                    value={endDate}
                    min={startDate} 
                   onChange={(e) => setEndDate(e.target.value)}
                
                  />
           </div>



                 <div className="col-12">
                  <label>Image</label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                 
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
                    disabled={loading || isLoading}
                  >
                    Update Event
                  </button>
                  {loading && <Loader />}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <img
              src="/images/event.jpg"
              alt="Login Image"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

      </div>
    </div>
   </div>

  )
}

export default EventEdit