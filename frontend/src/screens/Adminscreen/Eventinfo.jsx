import React, { useState } from 'react';
import { useGetEventsQuery, useDeleteEventMutation } from '../../slices/eventsApiSlice';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function Eventinfo() {
  const { data: events, refetch, isLoading: eventsLoading, error: eventsError } = useGetEventsQuery();

  const [deleteEvent, { isLoading: loadingDelete }] = useDeleteEventMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete the event?')) {
      try {
        await deleteEvent(id);
        toast.success('Event is deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (eventsLoading) {
    return <Loader />;
  }

  if (eventsError) {
    return <div>Error loading events</div>;
  }

  // Filter out events with endDate passed
  const filteredEvents = events.filter((event) => new Date(event.availableday.endDate) > new Date());

  // Sort events based on startDate
  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.availableday.startDate) - new Date(b.availableday.startDate));

  return (
    <div className="container py-5 position-relative">
      {sortedEvents.length === 0 ? (
        <p>no events available.</p>
      ) : (
        <>
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
                    <LinkContainer to={`/admin/event/all/${event._id}`}>
                      <button className="btn btn-outline-primary">Read Details</button>
                    </LinkContainer>
                    <button className="btn btn-outline-danger" onClick={() => deleteHandler(event._id)}>
                      <faTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
        </>
      )}
        <div className="position-absolute top-0 end-0 m-3">
            <LinkContainer to="/admin/event/create">
              <button className="btn btn-danger">Create Event</button>
            </LinkContainer>
          </div>
    </div>
  );
}

export default Eventinfo;
