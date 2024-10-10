import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 20,
  search: '',
  sort_by: '_id',
  sort_order: 'desc',
  start_date: '',
  end_date: ''
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
    },
    setSearchData: (state, action) => {
      state.search = action.payload;
    },
    setDate: (state, action) => {
      state.start_date = action.payload.start_date;
      state.end_date = action.payload.end_date;
    },
    setRefresh: (state, action) => {
      state.page = '1';
      state.limit = '20';
      state.search = '';
      state.sort_by = '_id';
      state.sort_order = 'desc';
      state.start_date = '';
      state.end_date = '';
    }
  }
})

export default filterSlice.reducer;
export const { setLimit, setPage, setSortBy, setSortOrder, setSearchData, setDate, setRefresh } = filterSlice.actions;