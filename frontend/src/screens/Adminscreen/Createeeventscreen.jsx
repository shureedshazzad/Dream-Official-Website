import React,{ useState }  from 'react'
import { useCreateEventMutation,useUploadImageMutation } from '../../slices/eventsApiSlice'
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';

function Createeeventscreen() {

    const [heading,setHeading] = useState('');
    const [description,setDescription] = useState('');
    const [image,setImage] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    const [createEvent, { isLoading }] = useCreateEventMutation();

    const[uploadImage,{ isLoading: loadingUpload} ] = useUploadImageMutation();

    const navigate = useNavigate();
  
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || "/admin/event/all";


    const submitHandler = async (e) => {
        e.preventDefault();
    
        
 
      
    
    
        try {
          setLoading(true);
    
          // Use the createDoctor mutation
          const res = await createEvent({
            heading,
            description,
            image,
            availableday: { startDate, endDate },
          }).unwrap();
    
          // Handle the response as needed (e.g., redirect or display a success message)
          console.log(res);
          toast.success('Event is created successfully');
          // Redirect to the appropriate page after doctor creation
          navigate(redirect);
        } catch (err) {
          console.error(err);
          toast.error('Failed to create event');
        } finally {
          setLoading(false);
        }
      };


      
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
              <h2 className="mb-4">Create Event</h2>
              <div className="row g-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder='Enter the heading of event'
                    style={{ height: '55px' }}
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    required
                  />
                </div>


                <div className="col-12">
                    <textarea
                      className="form-control border-0"
                      placeholder="Enter The Description"
                      style={{ height: '200px' }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
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
                    required
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
                    required
                  />
           </div>



                 <div className="col-12">
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{ height: '55px' }}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
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
                    Create Event
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

export default Createeeventscreen