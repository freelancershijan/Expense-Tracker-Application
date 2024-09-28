import { apiSlice } from "../api/apiSlice";

export const costsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCostCategories: builder.query({
      query: ({ email, page = 1, limit = 20 }) => `/costs/user-all-cost-category/lists?user=${ email }&page=${ page }&limit=${ limit }`
    }),
    getUserRecentCostsTransactions: builder.query({
      query: ({ email, page = 1, limit = 10, sort_by = '_id', sort_order = 'desc', search = "" }) => {
        return `/costs/user-costs?user=${ email }&page=${ page }&limit=${ limit }&sort_by=${ sort_by }&sort_order=${ sort_order }&search=${search}`;
      }
    })
  })
})

export const { useGetUserCostCategoriesQuery, useGetUserRecentCostsTransactionsQuery } = costsApi;