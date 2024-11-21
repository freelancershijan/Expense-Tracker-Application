import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (email) => `/user-details?user=${email}`,
      providesTags: ['UserDetails'],
    }),
    getUserYearDetails: builder.query({
      query: ({email, year = 2024}) => `/user-details-year?user=${email}&year=${year}`,
      providesTags: ['UserDetails'],
    }),
  })
})

export const { useGetUserDetailsQuery, useGetUserYearDetailsQuery } = userApi;