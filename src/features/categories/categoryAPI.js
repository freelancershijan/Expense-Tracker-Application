import { apiSlice } from "../api/apiSlice";

const createCategoryQuery = (endpoint) => ({
  query: ({ user, page = 1, limit = 12, search = "" }) => {
    const validPage = Math.max(1, parseInt(page));
    const validLimit = Math.max(1, Math.min(100, parseInt(limit)));

    const params = new URLSearchParams({
      user: user,
      page: validPage.toString(),
      limit: validLimit.toString(),
      search: search.trim()
    });

    return {
      url: `${ endpoint }?${ params.toString() }`,
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError
    };
  },
  providesTags: ['Categories'],
});

export const categoryAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({





    getUserFundCategories: builder.query(
      createCategoryQuery('/categories/user-fund-categories')
    ),
    getUserCostCategories: builder.query(
      createCategoryQuery('/categories/user-cost-categories')
    ),
    createUserCategory: builder.mutation({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
        validateStatus: (response, result) => {
          return response.status === 201 && !result.isError;
        },
        transformErrorResponse: (response) => {
          return {
            status: response.status,
            message: response.data?.message || 'Failed to create category'
          };
        }
      }),
      invalidatesTags: ['Categories'],
    }),
  })
});

export const { useGetUserFundCategoriesQuery, useGetUserCostCategoriesQuery, useCreateUserCategoryMutation } = categoryAPI;