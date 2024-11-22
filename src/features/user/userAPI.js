import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (email) => `/user-details?user=${ email }`,
      providesTags: ['UserDetails'],
    }),
    getUserYearDetails: builder.query({
      query: ({ email, year = new Date().getFullYear() }) => {
        const yearNum = parseInt(year);
        if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
          throw new Error('Invalid year');
        }
        return `/user-details-year?user=${ email }&year=${ yearNum }`;
      },
      providesTags: ['UserDetails'],
    }),
  })
})

export const { useGetUserDetailsQuery, useGetUserYearDetailsQuery } = userApi;