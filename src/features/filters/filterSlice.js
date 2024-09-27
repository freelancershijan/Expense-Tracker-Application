import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 20,
  search: '',
  sort_by: '_id',
  sort_order: 'desc'
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // You can also add actions to update filter values here
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSortBy: (state, action) => {
      state.sort_by = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sort_order = action.payload;
    }
  }
})

export default filterSlice.reducer;
export const { setLimit, setPage, setSortBy, setSortOrder } = filterSlice.actions;