import React,{useState} from 'react'
import { useGetDonorsQuery } from '../slices/donorsApiSlice'
import Loader from '../components/Loader';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

function Alldonors() {

    const { data: donors, refetch: refetchDonors, isLoading: donorsLoading, error: donorsError } =
    useGetDonorsQuery();

    const { donorInfo } = useSelector((state) => state.auth); 
    const [selectedBloodType, setSelectedBloodType] = useState(null);

    const editHandler = (id) =>{
      console.log('edit');
    }
  

    
  if (donorsLoading) {
    return <Loader />;
  }

  if (donorsError) {
    return <div>Error loading donors</div>;
  }

  const currentDate = new Date();

  const filteredDonors = donors
  .filter((donor) => donor.email !== donorInfo?.email && !donor.isAdmin &&
  (!selectedBloodType || donor.bloodType === selectedBloodType))
  .map((donor) => {
    let status = '❌';

    if (
      donor.lastDonationDate === null ||
      (new Date(donor.lastDonationDate) < currentDate &&
        monthsDiff(new Date(donor.lastDonationDate), currentDate) > 4)
    ) {
      status = '✔️';
    }

    return {
      ...donor,
      status,
    };
  });




// Function to calculate the difference in months between two dates
function monthsDiff(date1, date2) {
  let months;
  months = (date2.getFullYear() - date1.getFullYear()) * 12;
  months -= date1.getMonth();
  months += date2.getMonth();
  return months <= 0 ? 0 : months;
}

  const circleStyle = {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    background: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };






  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 wow fadeInUp">Donors</h1>

      <div className="mb-4">
        <label htmlFor="bloodTypeSelect" className="form-label">
          Select Blood Type:
        </label> 
        <select
          id="bloodTypeSelect"
          className="form-select"
          onChange={(e) => setSelectedBloodType(e.target.value)}
        >
          <option value="">All</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          {/* Add more blood type options as needed */}
        </select>
      </div>

      <div className="row">
        {filteredDonors.map((donor, index) => (
          <div
            key={`${donor._id}-${index}`}
            className={`col-lg-4 col-md-6 wow fadeInUp`}
            data-wow-delay={`0.${index + 1}s`}
          >
            <div className="service-item bg-light rounded h-100 p-5">

            <div>
            <i className="fa fa-user" style={{ width: '30px', height: '30px', borderRadius: '50%' }}></i>
            </div>

              <h4 className="mb-3">Name: {donor.name}</h4>
              <p>Batch: {donor.batch}</p>
              <p>Email: {donor.email}</p>
              <p>Phone Number: {donor.phoneNumber}</p>
              <p>Blood Type: {donor.bloodType}</p>
              <p>Current Location:{donor.currentLocation}</p>
              <p>Status: {donor.status}</p>

              <div className="text-center mt-3">
              {donor.status === '✔️' && ( // Check if status is '✔️'
                 <LinkContainer to={`/${donor._id}/create_send`}>
                <Button onClick={() => editHandler(donor._id)}>
                Send Request
              </Button>
             </LinkContainer>
             )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Alldonors