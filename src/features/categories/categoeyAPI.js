import { apiSlice } from "../api/apiSlice";

export const categoryAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCategories: builder.query({
      query: ({user, page = 1, limit = 20, search = ""}) => {
        return `/categories/user-categories?user=${user}&page=${page}&limit=${limit}&search=${search}`;
      },
      invalidatesTags: ['Categories'],
    }), 
  })
});

export const { useGetUserCategoriesQuery } = categoryAPI;