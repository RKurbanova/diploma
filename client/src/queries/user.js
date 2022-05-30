import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../const'

let objectKeysToLowerCase = function (input) {
  if (typeof input !== 'object') return input;
  if (Array.isArray(input)) return input.map(objectKeysToLowerCase);
  return Object.keys(input).reduce(function (newObj, key) {
      let val = input[key];
      let newVal = (typeof val === 'object') && val !== null ? objectKeysToLowerCase(val) : val;
      newObj[key.toLowerCase()] = newVal;
      return newObj;
  }, {});
};

const transformResponse = (response) => objectKeysToLowerCase(response)

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL, credentials: "include" }),
  tagTypes: ['GetUser'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `user`,
      providesTags: ['GetUser'],
      transformResponse
    }),
    getUserById: builder.query({
      query: ({id}) => `user/${id}`,
      providesTags: ['GetUser'],
      transformResponse
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
    postUpdateUser: builder.mutation({
      query: (body) => ({
        url: `user/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetUser'],
    }),
  }),
})

export const { useGetUserQuery, usePostLoginMutation, usePostRegisterMutation, usePostLogoutMutation, usePostUpdateUserMutation, useGetUserByIdQuery } = userApi
