
import React, { useState } from 'react';
import { useGetEventsQuery } from '../slices/eventsApiSlice';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';

function Showallevents() {
  const { data: events, isLoading: eventsLoading, error: eventsError } = useGetEventsQuery();

  if (eventsLoading) {
    return <Loader />;
  }

  if (eventsError) {
    return <div>Error loading events</div>;
  }

  //Filter out events with endDate passed
  const filteredEvents = events.filter((event) => new Date(event. availableday.endDate) > new Date());

  //   Sort events based on startDate
   const sortedEvents = filteredEvents.sort((a, b) => new Date(a.availableday.startDate) - new Date(b.availableday.startDate));

  return (
    <div className="container py-5">
    {sortedEvents.length === 0 ? (
      <p>No events available.</p>
    ) : (
      <div className="row g-4">
        {sortedEvents.map((event) => (
          <div key={event.id} className="col-md-6 col-lg-4">
            <div className="card h-100 wow fadeInUp" data-wow-delay="0.1s">
              <div className="card-body bg-gray">
                <h5 className="card-title">{event.heading}</h5>
                <p className="card-text">{event.description.substring(0, 100)}...</p>
                <p>
                  <strong>Date Range:</strong>{' '}
                  {new Date(event.availableday.startDate).toLocaleDateString()} - {new Date(event.availableday.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <LinkContainer to={`/events/all/${event._id}`}>
                  <button className="btn btn-outline-primary">Read Details</button>
                </LinkContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}

export default Showallevents;
