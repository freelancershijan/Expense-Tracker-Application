import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (email) => `/user-details?user=${email}`
    }),
    getUserYearDetails: builder.query({
      query: ({email, year = 2024}) => `/user-details-year?user=${email}&year=${year}`
    }),
  })
})

export const { useGetUserDetailsQuery, useGetUserYearDetailsQuery } = userApi;