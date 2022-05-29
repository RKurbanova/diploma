import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../const'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL, credentials: "include" }),
  tagTypes: ['GetUser'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `user`,
      providesTags: ['GetUser'],
    }),

    postLogin: builder.mutation({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetUser'],
    }),
    postLogout: builder.mutation({
      query: (body) => ({
        url: `logout`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetUser'],
    }),
    postRegister: builder.mutation({
      query: (body) => ({
        url: `register`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetUser'],
    }),
  }),
})

export const { useGetUserQuery, usePostLoginMutation, usePostRegisterMutation, usePostLogoutMutation } = userApi
