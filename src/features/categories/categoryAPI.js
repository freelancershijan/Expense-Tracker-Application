import { apiSlice } from "../api/apiSlice";

export const categoryAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserFundCategories: builder.query({
      query: ({user, page = 1, limit = 12, search = ""}) => {
        return `/categories/user-fund-categories?user=${user}&page=${page}&limit=${limit}&search=${search}`;
      },
      providesTags: ['Categories'],
    }), 
    getUserCostCategories: builder.query({
      query: ({user, page = 1, limit = 12, search = ""}) => {
        return `/categories/user-cost-categories?user=${user}&page=${page}&limit=${limit}&search=${search}`;
      },
      providesTags: ['Categories'],
    }),
    createUserFundCategory: builder.mutation({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Funds', 'Categories'],
    }),
  })
});

export const { useGetUserFundCategoriesQuery, useGetUserCostCategoriesQuery, useCreateUserFundCategoryMutation } = categoryAPI;