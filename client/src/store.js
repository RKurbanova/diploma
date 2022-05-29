import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { dealApi } from './queries/deal'
import { userApi } from './queries/user'

export const store = configureStore({
  reducer: {
    [dealApi.reducerPath]: dealApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dealApi.middleware).concat(userApi.middleware),
})

setupListeners(store.dispatch)
