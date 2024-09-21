import { apiSlice } from "../api/apiSlice";

export const fundsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (email) => `/user-details?user=${email}`
    }),
    getUserFundCategories: builder.query({
      query: ({email, page=1, limit=20}) => `funds/user-all-fund-category/lists?user=${email}&page=${page}&limit=${limit}`
    })
  })
})

export const { useGetUserDetailsQuery, useGetUserFundCategoriesQuery } = fundsApi;