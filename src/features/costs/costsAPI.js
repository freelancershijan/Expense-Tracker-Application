import { apiSlice } from "../api/apiSlice";

export const costsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCostCategories: builder.query({
      query: ({ email, page = 1, limit = 20, search = ""  }) => `/costs/user-all-cost-category/lists?user=${ email }&page=${ page }&limit=${ limit }&search=${search}`
    }),
    getUserRecentCostsTransactions: builder.query({
      query: ({ email, page = 1, limit = 10, sort_by = '_id', sort_order = 'desc', search = "" }) => {
        return `/costs/user-costs?user=${ email }&page=${ page }&limit=${ limit }&sort_by=${ sort_by }&sort_order=${ sort_order }&search=${ search }`;
      },
      providesTags: ['Costs'],
    }),
    getUserCategoryCostLists: builder.query({
      query: ({ email, category, page = 1, limit = 10, sort_by = '_id', sort_order = 'desc', search = "", start_date, end_date }) => {
        return `/costs?category_name=${category}&user=${email}&page=${page}&limit=${limit}&sort_by=${sort_by}&sort_order=${sort_order}&search=${search}&start_date=${start_date}&end_date=${end_date}`;
      },
      providesTags: ['Costs'],
    }),
    deleteCost: builder.mutation({
      query: (id) => ({
        url: `/costs/delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Costs'],
    }),
  })
})

export const { useGetUserCostCategoriesQuery, useGetUserRecentCostsTransactionsQuery, useGetUserCategoryCostListsQuery, useDeleteCostMutation } = costsApi;