import {APPOINTMENT_URL} from  "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const appointmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createAppointment: builder.mutation({
        query: (data) => ({
          url: `${APPOINTMENT_URL}/create`,
          method: 'POST',
          body: data,
        }),
      }),
  
      getAllAppointments: builder.query({
        query: () => ({
          url: `${APPOINTMENT_URL}/all`,
        }),
        providesTags: ['Appointments'],
        keepUnusedDataFor: 5,
      }),
  
      getAppointmentById: builder.query({
        query: (appointmentId) => ({
          url: `${APPOINTMENT_URL}/${appointmentId}`,
        }),
        keepUnusedDataFor: 5,
      }),
  
      deleteAppointment: builder.mutation({
        query: (appointmentId) => ({
          url: `${APPOINTMENT_URL}/${appointmentId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Appointments'],
      }),



      confirmAppointment: builder.mutation({
        query: (appointmentId) => ({
          url: `${APPOINTMENT_URL}/${appointmentId}`,
          method: 'POST',
        }),
        invalidatesTags: ['Appointments'],
      }),

   

    }),
  });
  
  export const {
    useCreateAppointmentMutation,
    useGetAllAppointmentsQuery,
    useGetAppointmentByIdQuery,
    useDeleteAppointmentMutation,
    useConfirmAppointmentMutation
  } = appointmentsApiSlice;