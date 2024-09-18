import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (email) => `/user-details?user=${email}`
    })
  })
})

export const { useGetUserDetailsQuery } = userApi;