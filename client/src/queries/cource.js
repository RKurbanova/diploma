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

const transformResponse = (response) => response

export const courceApi = createApi({
  reducerPath: 'courceApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL, credentials: "include" }),
  tagTypes: ['GetCource'],
  endpoints: (builder) => ({
    getAllCources: builder.query({
      query: () => `cources`,
      providesTags: ['GetCource'],
      transformResponse
    }),
    getCourceById: builder.query({
      query: ({ID}) => `cource/${ID}`,
      providesTags: ['GetCource'],
      transformResponse
    }),
    postCreateCource: builder.mutation({
      query: (body) => ({
        url: `cource/new`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetCource'],
    }),
    postUpdateCource: builder.mutation({
      query: (body) => ({
        url: `cource/${body.ID}`,
        method: 'POST',
        body: {
          ...body,
          fieldsToUpdate: Object.keys(body)
        },
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetCource'],
    }),
    postUpdateLesson: builder.mutation({
      query: (body) => ({
        url: `lesson/${body.ID}`,
        method: 'POST',
        body: {
          ...body,
          fieldsToUpdate: Object.keys(body)
        },
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetCource'],
    }),
  }),
})

export const {
  useGetAllCourcesQuery,
  useGetCourceByIdQuery,
  usePostCreateCourceMutation,
  usePostUpdateCourceMutation,
  usePostUpdateStageMutation
} = courceApi
