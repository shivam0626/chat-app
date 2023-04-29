import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// define a service using base url
// const BASE_URL = 'https://whistler.onrender.com';
const BASE_URL  = 'http://localhost:8000'

const appApi = createApi({
    reducerPath:'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),

    endpoints: (builder) =>({

        // creating a user
        signupUser: builder.mutation({
            query:(user)=>({
                url:'/users',
                method: 'POST',
                body:user
            }),
        }),

        //  login user
        loginUser: builder.mutation({
            query:(user)=>({
                url:'/users/login',
                method: 'POST',
                body:user
            }),
        }),

        // logout user
        logoutUser: builder.mutation({
            query:(payload)=>({
                url:"/logout",
                method:'DELETE',
                body: payload
            }),
        }),

    }),
});

export const {useSignupUserMutation,useLoginUserMutation,useLogoutUserMutation } = appApi;
export default appApi;