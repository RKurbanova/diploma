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

export const dealApi = createApi({
  reducerPath: 'dealApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL, credentials: "include" }),
  tagTypes: ['GetDeal'],
  endpoints: (builder) => ({
    getAllDeals: builder.query({
      query: () => `deals`,
      providesTags: ['GetUsGetDealer'],
      transformResponse
    }),
    getDealById: builder.query({
      query: ({ID}) => `deal/${ID}`,
      providesTags: ['GetDeal'],
      transformResponse
    }),
    postCreateDeal: builder.mutation({
      query: (body) => ({
        url: `deal/new`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetDeal'],
    }),
    postUpdateDeal: builder.mutation({
      query: (body) => ({
        url: `user/${body.ID}`,
        method: 'POST',
        body: {
          ...body,
          fieldsToUpdate: Object.keys(body)
        },
      }),
      invalidatesTags: (result, error, arg) => error ? [] : ['GetDeal'],
    }),
  }),
})

export const {
  useGetAllDealsQuery,
  useGetDealByIdQuery,
  usePostCreateDealMutation,
  usePostUpdateDealMutation
} = dealApi
