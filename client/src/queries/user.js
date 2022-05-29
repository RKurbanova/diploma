import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../const'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL, credentials: "include" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `user`,
    }),
    postLogin: builder.mutation({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetUserQuery, usePostLoginMutation } = userApi
