import { apiSlice } from "../api/apiSlice";

export const costsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCostCategories: builder.query({
      query: ({email, page=1, limit=20}) => `/costs/user-all-cost-category/lists?user=${email}&page=${page}&limit=${limit}`
    })
  })
})

export const { useGetUserCostCategoriesQuery } = costsApi;