import {EVENT_URL,UPLOAD_URL} from  "../constants.js";
import { apiSlice } from "./apiSlice.js";


export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createEvent: builder.mutation({
        query: (data) => ({
          url: `${EVENT_URL}/create`,
          method: 'POST',
          body: data,
        }),
      }),
  
      getEvents: builder.query({
        query: () => ({
          url: EVENT_URL,
        }),
        providesTags: ['Events'],
        keepUnusedDataFor: 5,
      }),
  
      getEventById: builder.query({
        query: (eventId) => ({
          url: `${EVENT_URL}/${eventId}`,
        }),
        keepUnusedDataFor: 5,
      }),
  
      updateEvent: builder.mutation({
        query: (data ) => ({
          url: `${EVENT_URL}/${data.eventId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Events'],
      }),
  
      deleteEvent: builder.mutation({
        query: (eventId) => ({
          url: `${EVENT_URL}/${eventId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Events'],
      }),


      uploadImage: builder.mutation({
        query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: 'POST',
            body: data,
        }),
    }),


    }),
  });

  export const {
    useCreateEventMutation,
    useGetEventsQuery,
    useGetEventByIdQuery,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useUploadImageMutation
  } = eventsApiSlice;
