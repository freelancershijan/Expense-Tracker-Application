import { apiSlice } from "../api/apiSlice";

export const fundsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserFundCategories: builder.query({
      query: ({email, page=1, limit=20}) => `/funds/user-all-fund-category/lists?user=${email}&page=${page}&limit=${limit}`
    }),
    getUserRecentFundsTransactions: builder.query({
      query: ({ email, page = 1, limit = 10, sort_by = '_id', sort_order = 'desc', search = "" }) => {
        return `/funds/user-funds?user=${ email }&page=${ page }&limit=${ limit }&sort_by=${ sort_by }&sort_order=${ sort_order }&search=${search}`;
      }
    })
  })
})

export const { useGetUserFundCategoriesQuery, useGetUserRecentFundsTransactionsQuery } = fundsApi;