import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { courceApi } from './queries/cource'
import { userApi } from './queries/user'

export const store = configureStore({
  reducer: {
    [courceApi.reducerPath]: courceApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courceApi.middleware).concat(userApi.middleware),
})

setupListeners(store.dispatch)
