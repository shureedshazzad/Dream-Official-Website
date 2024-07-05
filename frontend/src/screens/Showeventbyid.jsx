import React from 'react';
import { useGetEventByIdQuery } from '../slices/eventsApiSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function Showeventbyid() {
  const { id: eventId } = useParams();

  const {
    data: event,
    isLoading,
    error,
    refetch,
  } = useGetEventByIdQuery(eventId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading event details</div>;
  }

  // Check if the event heading is 'Tshirt Event' or 'Hoodie Event'
  const isSubmitVisible = event.heading === 'Tshirt Event' || event.heading === 'Hoodie Event';

  return (
    <div className="container py-5">
      <div className="row wow fadeInUp" data-wow-delay="0.1s">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title fw-bold">{event.heading}</h5>
              <p>
                <strong>Date Range:</strong>{' '}
                {new Date(event.availableday.startDate).toLocaleDateString()} -{' '}
                {new Date(event.availableday.endDate).toLocaleDateString()}
              </p>
              <p className="card-text">{event.description}</p>
              {isSubmitVisible && (
                <button className="btn btn-primary">Submit</button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={event.image} // Replace with the actual image source from your API
            alt={event.heading}
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default Showeventbyid;
