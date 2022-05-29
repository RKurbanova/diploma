import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../const'

export const dealApi = createApi({
  reducerPath: 'dealApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL, credentials: "include" }),
  endpoints: (builder) => ({
    getAllDeals: builder.query({
      query: () => `deals`,
    }),
  }),
})

export const { useGetAllDealsQuery } = dealApi
