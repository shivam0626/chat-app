import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// define a service qusing base url

const appApi = createApi({
    reducerPath:'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8000'
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
    })
})