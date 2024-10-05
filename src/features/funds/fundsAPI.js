import { apiSlice } from "../api/apiSlice";

export const fundsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserFundCategories: builder.query({
      query: ({ email, page = 1, limit = 20, search = "" }) => `/funds/user-all-fund-category/lists?user=${ email }&page=${ page }&limit=${ limit }&search=${search}`
    }),
    getUserRecentFundsTransactions: builder.query({
      query: ({ email, page = 1, limit = 10, sort_by = '_id', sort_order = 'desc', search = "" }) => {
        return `/funds/user-funds?user=${ email }&page=${ page }&limit=${ limit }&sort_by=${ sort_by }&sort_order=${ sort_order }&search=${ search }`;
      }
    }),
    getUserCategoryFundLists: builder.query({
      query: ({ email, category, page = 1, limit = 10, sort_by = '_id', sort_order = 'desc', search = "", start_date, end_date }) => {
        return `/funds?category_name=${category}&user=${email}&page=${page}&limit=${limit}&sort_by=${sort_by}&sort_order=${sort_order}&search=${search}&start_date=${start_date}&end_date=${end_date}`;
      }
    }),
  })
})

export const { useGetUserFundCategoriesQuery, useGetUserRecentFundsTransactionsQuery, useGetUserCategoryFundListsQuery } = fundsApi;