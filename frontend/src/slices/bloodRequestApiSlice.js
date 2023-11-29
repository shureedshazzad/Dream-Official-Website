import {BLOOD_REQ_URL} from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const bloodRequestApiSLice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        createPublicBloodReq: builder.mutation({
            query: (data) => ({
                url: `${BLOOD_REQ_URL}/create`,
                method: 'POST',
                body: data,
            }),
        }),

    })
})

export const {useCreatePublicBloodReqMutation} = bloodRequestApiSLice;