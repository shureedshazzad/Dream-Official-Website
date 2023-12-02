import { PRIVATE_BLOOD_REQ_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";


export const privateBloodRequestApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createBloodRequest: builder.mutation({
        query: (data) => ({
          url: `${PRIVATE_BLOOD_REQ_URL}/create`,
          method: 'POST',
          body: data,
        }),
      }),
  
      getAllBloodRequests: builder.query({
        query: () => ({
          url: `${PRIVATE_BLOOD_REQ_URL}/all`,
        }),
        providesTags: ['BloodRequests'],
        keepUnusedDataFor: 5,
      }),
  
      getBloodRequestById: builder.query({
        query: (bloodRequestId) => ({
          url: `${PRIVATE_BLOOD_REQ_URL}/${bloodRequestId}`,
        }),
        keepUnusedDataFor: 5,
      }),
  
      deleteBloodRequest: builder.mutation({
        query: (bloodRequestId) => ({
          url: `${PRIVATE_BLOOD_REQ_URL}/${bloodRequestId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['BloodRequests'],
      }),

      
      acceptBloodRequest: builder.mutation({
        query: (bloodRequestId) => ({
          url: `${PRIVATE_BLOOD_REQ_URL}/accept/${bloodRequestId}`,
          method: 'POST',
        }),
        invalidatesTags: ['BloodRequests'],
      }),

      sendDonorsRequest:builder.mutation({
        query: ({ donorId, data }) => ({
            url: `${PRIVATE_BLOOD_REQ_URL}/${donorId}/notify_donor`,
            method: 'POST',
            body: data,
        })
    })
    

      
    }),
  });

  export const {useCreateBloodRequestMutation,useGetAllBloodRequestsQuery,useGetBloodRequestByIdQuery,useDeleteBloodRequestMutation,
    useAcceptBloodRequestMutation,useSendDonorsRequestMutation
} = privateBloodRequestApiSlice