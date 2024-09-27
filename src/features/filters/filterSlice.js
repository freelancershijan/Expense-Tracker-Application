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

  }
})

export default filterSlice.reducer;
export const {} = filterSlice.actions;