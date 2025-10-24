import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Property'],
  endpoints: (builder) => ({
    getProperties: builder.query<any, void>({
      query: () => 'properties.json',
      providesTags: ['Property'],
    }),
    rentProperty: builder.mutation<{ success: boolean; id: string }, any>({
      async queryFn(property) {
        await new Promise((r) => setTimeout(r, 1200));
        return { data: { success: true, id: property.id } } as any;
      },
      invalidatesTags: ['Property'],
    }),
  }),
});
export const { useGetPropertiesQuery, useRentPropertyMutation } = propertyApi;
