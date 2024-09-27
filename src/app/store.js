import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import authReducer from '../features/auth/authSlice'
import filterReducer from '../features/filters/filterSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    filters: filterReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})