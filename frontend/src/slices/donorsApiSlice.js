import { DONOR_URL,UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";
// here info are stored in local storage
export const donorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => (
                {
                    url: `${DONOR_URL}/auth`,
                    method: 'POST',
                    body: data,
                }
            ),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${DONOR_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

      

        logout: builder.mutation({
            query: () =>({
                url: `${DONOR_URL}/logout`,
                method: 'POST'
            })
        }),


        profile: builder.mutation({
            query: (data) => (
                {
                    url: `${DONOR_URL}/profile`,
                    method: 'PUT',
                    body: data,
                }
            ),
        }),


        getDonors:builder.query({
            query: () => ({
                url: DONOR_URL,
            }),
            providesTags: ['Donors'],
            keepUnusedDataFor: 5
        }),

     


        
        deleteDonors:builder.mutation({
            query: (donorId) => ({
                url: `${DONOR_URL}/${donorId}`,
                method:'DELETE'
            })
        }),

        getDonorDetails:builder.query({
            query: (donorId) => ({
                url: `${DONOR_URL}/${donorId}`,

            }),
            keepUnusedDataFor: 5,
        }),

        updateDonor: builder.mutation({
            query: ( data ) => ({
                url: `${DONOR_URL}/${data.donorId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Donors']
        }),

        uploadCommitteeMemberImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),


        forgotPassword: builder.mutation({
            query: (email) => ({
              url: `${DONOR_URL}/forgot-password`,
              method: 'POST',
              body: { email },
            }),
          }),

          verifyOTP: builder.mutation({
            query: ({ email, otp }) => ({
              url: `${DONOR_URL}/verify-otp`,
              method: 'POST',
              body: { email, otp },
            }),
          }),


           resetPassword : builder.mutation({
            query: ({ email, password }) => ({
              url: `${DONOR_URL}/reset-password`,
              method: 'POST',
              body: { email, password },
            }),
          }),

   
            
    })
});





export const { useLoginMutation ,useLogoutMutation, useRegisterMutation, useProfileMutation
    ,useGetDonorsQuery,
    useDeleteDonorsMutation,useGetDonorDetailsQuery,useUpdateDonorMutation,useUploadCommitteeMemberImageMutation,useForgotPasswordMutation,
    useVerifyOTPMutation,useResetPasswordMutation
} = donorsApiSlice;