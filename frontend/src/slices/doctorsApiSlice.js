import {DOCTOR_URL} from  "../constants.js";
import { apiSlice } from "./apiSlice.js";


export const doctorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createDoctor: builder.mutation({
        query: (data) => ({
          url: `${DOCTOR_URL}/create`,
          method: 'POST',
          body: data,
        }),
      }),
  
      getDoctors: builder.query({
        query: () => ({
          url: DOCTOR_URL,
        }),
        providesTags: ['Doctors'],
        keepUnusedDataFor: 5,
      }),
  
      getDoctorById: builder.query({
        query: (doctorId) => ({
          url: `${DOCTOR_URL}/${doctorId}`,
        }),
        keepUnusedDataFor: 5,
      }),
  
      updateDoctor: builder.mutation({
        query: (data ) => ({
          url: `${DOCTOR_URL}/${data.doctorId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Doctors'],
      }),
  
      deleteDoctor: builder.mutation({
        query: (doctorId) => ({
          url: `${DOCTOR_URL}/${doctorId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Doctors'],
      }),
    }),
  });
  
  export const {
    useCreateDoctorMutation,
    useGetDoctorsQuery,
    useGetDoctorByIdQuery,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
  } = doctorsApiSlice;